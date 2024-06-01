const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginController = async(req,resp)=>{
    try{
    const {email,password} = req.body;
    if(!email || email === "" || !password || password === "")
        return resp.json({
            status:401,
            success:false,
            msg:"Please fill all the fields Properly"
        })
    
        //check wheter user exist or not
        const user = await User.findOne({email});
        if(!user){
            return resp.json({
                status:402,
                success:false,
                msg:"User Does Not exists please Register First"
            })
        }
        console.log(user)
        //check password
        try{
            const passwordverified = await bcrypt.compare(password,user.password);
            if(!passwordverified){
                if(!passwordverified){
                    return resp.json({
                        status:401,
                        success:false,
                        msg:"Password do Not match"
                    })
                }
            }
        }catch(err){
            console.log(err.message)
            return resp.json({
                status:401,
                success:false,
                msg:"Error while checking password"
            })
        }
        const payload = {
            id:user._id,
            username:user.username,
            email:user.email
        }
        const token = await jwt.sign(payload,process.env.TOKEN_SECRET,{expiresIn:"2hr"});

        resp.cookie("web_token",token,{expires:new Date(Date.now()+2*60*60*1000),httpOnly:true})
        
        const userdata = user._doc
        return resp.json({
            success:true,
            msg:"User Successfully login",
            userdata,
            token,
            status:200
        })}catch(err){
            console.log(err.message)
            return resp.json({
                status:401,
                success:false,
                msg:"Error while login user",
                error:err
            })
        }
}


const registerController = async(req,resp)=>{
    try{
            const {email,username,password} = req.body;
            console.log(email + " <--> "+username+"<-->"+password);
            if(!email || email==="" || !username || username===""||!password || password === "")
                return resp.json({
                    status:401,
                    success:false,
                    msg:"Please fill all the fields Properly"
                })


                //if user already exists return -->user already exists
            const user = await User.findOne({email})
            if(user){
                return resp.json({
                    status:406,
                    success:false,
                    msg:"User already exists"
                })
            }

           
            //hasing the password
            let hashedPassword = ""
            try{
            hashedPassword = await bcrypt.hash(password,10);
            }catch(err){
                console.log(err);
                return resp.json({
                    status:401,
                    success:false,
                    msg:"Error while hashing the password"
                })
            }
            //creating the user and saving its entry in data base
            const newUser = await User.create({
                email,
                username,
                password:hashedPassword  
            })

            console.log(newUser);
            return resp.json({
                status:200,
                success:true,
                msg:"User created successfully",
                data:newUser
            })

    }catch(err){
        console.log(err)
        return resp.json({
            msg:"Error while registering user",
            success:false,
            status:500,
            error:err.message
        })
    }
}


const logoutController = async(req,resp)=>{
    try{
        resp.clearCookie("web_token").json({
            status:200,
            success:true,
            msg:"User logout Successfully"
        })

    }catch(err){
        console.log(err.message)
        return resp.json({
            status:500,
            success:false,
            msg:"error while logoutg user",
            error:err.message
        })
    }
}


module.exports = {loginController,registerController,logoutController}