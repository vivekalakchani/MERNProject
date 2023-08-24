const express =require("express");
const router =new express.Router();
const multer=require("multer");
const users = require("../model/usersSchema");


const imgconfig=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads");
    },
        filename:(req,file,callback)=>{
            callback(null,`imgae-${Date.now()}.${file.originalname}`);
        }
    
});

// img filter

const isImage=(req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(new Error("only image is allowd"));
    }



}
const upload =multer({
    storage:imgconfig,
    fileFilter:isImage
});

// user register
router.post("/register",upload.single("photo"),async(req,res)=>{
    const {fname}=req.body;
    const {amount}=req.body;
    const {filename}=req.file;
    
    if(!fname||!filename||!amount){
        res.status(401).json({status:401,message:"file all the data"});
    }

    try{
        const userdata = new users({
            fname:fname, 
            amount:amount,
            imgpath:filename 
        });
       const finaldata = await userdata.save();
       res.status(201).json({status:201,finaldata});

    }catch(error){
        res.status(401).json({status:401,error});

    }
 
});

// user data get
router.get("/getdata",async(req,res)=>{
    try {
        const getUser = await users.find();

        res.status(201).json({status:201,getUser})
    } catch (error) {
        res.status(401).json({status:401,error})
    }
});




module.exports= router;