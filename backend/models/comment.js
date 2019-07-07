const mongoose=require('mongoose');

var commentSchema=mongoose.Schema(
    {
        questionId:{type:String},
        commentData:{type:String},
        verified:{type:String},
        creator:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
        
    }
);

module.exports=mongoose.model('Comment',commentSchema);