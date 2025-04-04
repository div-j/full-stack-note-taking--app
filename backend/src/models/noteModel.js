import mongoose from "mongoose";


let noteSchema =  mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    note:{
        type:String,
        required:true
    }
},{timestamps:true});


export const Note = mongoose.model("Note", noteSchema); 