const express = require('express');
const { getAllLists, createList, getList, updateAddList, updateRemoveList, deleteList, updateVisibility } = require('../controllers/list.Controller');
const isAuth = require('../middleware/isAuth');
const router = express.Router();


router.get("/",isAuth,getAllLists)
router.post("/create",isAuth,createList)
router.get('/:listId',isAuth,getList)

router.put('/add/:listId',isAuth,updateAddList)
router.put('/remove/:listId',isAuth,updateRemoveList)
router.delete('/:listId',isAuth,deleteList)
router.put('/visibility/:listId',isAuth,updateVisibility)

module.exports = router;