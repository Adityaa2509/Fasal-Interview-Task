const express = require('express');
const { searchByQuery, searchById } = require('../controllers/movie.Controller');
const router = express.Router();

router.get('/search',searchByQuery);
router.get('/search/:imdbId',searchById)


module.exports = router;