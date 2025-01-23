import yarnModel from "../models/YarnModel.js";

import fs from 'fs'


// add yarn item
 const addYarn = async (req, res) => {
    try {
        // Ensure a file was uploaded
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const image_filename = req.file.filename; // Access the uploaded file's name

        // Create a new yarn item
        const yarn = new yarnModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename,
        });

        // Save to the database
        await yarn.save();
        res.status(201).json({ success: true, message: "Yarn Piece Added" });
    } catch (error) {
        console.error("Error in addYarn:", error);
        res.status(500).json({ success: false, message: "Error occurred", error: error.message });
    }
};
// all yarn_list
const listYarn = async (req,res) => {
    try {
        const yarn = await yarnModel.find({});
        res.json({success:true,data:yarn})
    } catch (error) {
        console.log((error));
        res.json({success:false,message:"error"})
    }
}

// remove yarn item
const removeYarn = async (req,res) =>{
    try {
        const yarn = await yarnModel.findById(req.body.id)
        fs.unlink(`uploads/${yarn.image}`,()=>{})

        await yarnModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Yarn Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

 export {addYarn,listYarn,removeYarn}
