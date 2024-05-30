const express = require('express');
const { loginController, registerController, logoutController } = require('../controllers/auth.Controller');
const isAuth = require('../middleware/isAuth');
const router = express.Router()

router.post('/login',loginController)
router.post('/register',registerController)
router.post('/logout',logoutController)
router.post('/check',isAuth,async (req,resp)=>{
    console.log(req.user);
    return resp.json({
        msg:"mazze lene bhai"
    })
})

module.exports = router;