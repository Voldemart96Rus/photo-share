const router = require('express').Router();
const {unsplash} = require('../../unsplash');

// @route   GET api/photos
// @desc    Get photos
// @access  Public
router.get('/', async (req, res) => {
    try {
        const {page, limit, orderBy} = req.query;
        const response = await unsplash.photos.listPhotos(page, limit, orderBy);
        const data = await response.json();
        if (response.status !== 200) {
            return res.status(404).json(data.errors); // [string]
        }
        res.json(data); // [photo object]
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/photos/:id
// @desc    Get a photo by id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const response = await unsplash.photos.getPhoto(req.params.id);
        const data = await response.json();
        if (response.status !== 200) {
            return res.status(404).json(data.errors); // [string]
        }
        res.json(data); // photo object
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/photos/download/:id
// @desc    Increments the photo download counter
// @access  Public
router.put('/download/:id', (req, res) => {
    unsplash.photos
        .getPhoto(req.params.id)
        .then((res) => res.json())
        .then((photo) => unsplash.photos.downloadPhoto(photo))
        .then((res) => res.json())
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.error(error.message);
            res.status(500).send('Server Error');
        });
});

// @route   PUT api/photos/like/:id
// @desc    Like a photo
// @access  Public
router.put('/like/:id', (req, res) => {
    unsplash.photos
        .likePhoto(req.params.id)
        .then((res) => res.json())
        .then(({photo}) => res.json(photo))
        .catch((error) => {
            console.error(error.message);
            res.status(500).send('Server Error');
        });
});

// @route   PUT api/photos/unlike/:id
// @desc    Unlike a photo
// @access  Public
router.put('/unlike/:id', (req, res) => {
    unsplash.photos
        .unlikePhoto(req.params.id)
        .then((res) => res.json())
        .then(({photo}) => res.json(photo))
        .catch((error) => {
            console.error(error.message);
            res.status(500).send('Server Error');
        });
});

module.exports = router;