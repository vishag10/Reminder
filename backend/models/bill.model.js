import mongoose from "mongoose";

const billSchema=new mongoose.Schema({
    title:{type:String, required:true},
    amount:{type:String, required:true},
    type:{type:String, required:true},
    file:{type:String, required:true},
    

})
export default mongoose.model.BILL||mongoose.model("BILL",billSchema)
