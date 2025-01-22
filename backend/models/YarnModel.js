import mongoose from "mongoose";

const yarnSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description: {type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true}
})

const yarnModel = mongoose.models.yarn || mongoose.model("yarn", yarnSchema)

export default yarnModel;