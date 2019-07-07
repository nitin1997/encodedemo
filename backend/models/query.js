const mongoose=require('mongoose');

var questionSchema=mongoose.Schema(
    {
        title:{type:String},
        question:{type:String},
        // creator:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
    }
);

module.exports=mongoose.model('Question',questionSchema);