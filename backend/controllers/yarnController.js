import yarnModel from "../models/YarnModel.js";

import fs from 'fs'


// add yarn item
 const addYarn = async (req,res) => {

    let image_filename = `${req.file.filename()}`;

    const yarn = new yarnModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category: req.body.category,
        image:image_filename
    })
     try {
         await yarn.save();
         res.json({success:true,message:"Yarn Piece Added"})
     } catch (error) {
        console.log(error)
         res.json({success:false,message:"Error"})
     }

 }

 export {addYarn}
