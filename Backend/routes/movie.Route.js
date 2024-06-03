const express = require('express');
const { searchByQuery, searchById, sharableLink } = require('../controllers/movie.Controller');
const router = express.Router();

router.get('/search',searchByQuery);
router.get('/search/:imdbId',searchById)
router.get('/shared/:sharableLink',sharableLink)

module.exports = router;