const express = require("express");
const Comment = require("../models/comment");
const CheckAuth=require("../middleware/check-auth");

const router = express.Router();

router.post("",CheckAuth, (req, res, next) => {
   //  console.log("inside add comment");
    const comment = new Comment({
      questionId: req.body.questionId,
      commentData: req.body.commentData,
      creator:req.userData.userId,
      verified:"false"
    });
    comment.save().then(comment => {
     // console.log("comment fetched from server:"+comment);
      res.status(201).json({
        message: "Comment added successfully",
        comment: comment
        
      });
    });
  }
  );

  router.get("", (req, res, next) => {
    //let fetchedComments;
    Comment.find()
      .then(documents => {
      //  console.log("all fetched comments server:"+documents)
        //fetchedComments = documents;
        res.status(200).json({
          message: "Comments fetched successfully!",
          comments:documents
        });
      });    
  });

  module.exports = router;