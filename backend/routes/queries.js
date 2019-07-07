const express = require("express");
const Query = require("../models/query");
const Comment = require("../models/comment");

const router = express.Router();

router.post("", (req, res, next) => {
  console.log(req.body.question);
  const query = new Query({
    title: req.body.title,
    question: req.body.question,
  });
  query.save().then(createdQuery => {
    console.log(createdQuery);
    res.status(201).json({
      message: "Question added successfully",
      query: createdQuery
    });
  });
}
);


router.get("", (req, res, next) => {
  let fetchedQueries;
  Query.find()
    .then(documents => {
      fetchedQueries = documents;
      res.status(200).json({
        message: "Posts fetched successfully!",
        questions: fetchedQueries
      });
    });    
});


router.get("/getdata", (req, res, next) => {
  Comment.find()
    .then(documents => {
      console.log("all fetched comments server:"+documents)
      //fetchedComments = documents;
      res.status(200).json({
        message: "Comments fetched successfully!",
        comments:documents
      });
    });    
});

module.exports = router;