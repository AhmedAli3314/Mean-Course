const express = require ("express");
const Post = require("../models/post");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");


router.post("", checkAuth, (req, res, next) => {

  const post = new Post ({

    title: req.body.title,
    content: req.body.content
  });

  post.save();


  res.status(201).json({
    message: 'Post added successfully!'
  });



});


router.get("" , (req,res,next) => {

  Post.find()
  .then( documents => {

    res.status(200).json({
      message: 'Posts fetched successfully',
      Myposts: documents

    });

  });


});




router.delete("/:id", checkAuth, (req, res, next) => {



  Post.deleteOne({_id: req.params.id }).then(result =>
    {
      console.log(result);
      res.status(200).json ({

        message: 'Post Deleted'
      });
    });




});

router.get('/:id',(req,res,next) => {

  Post.findById(req.params.id).then( post =>{
    if(post){
      res.status(200).json(post);
    } else{
      res.status(404).json({
        message: 'Post not found'
      });
    }
  });
});

router.put('/:id', checkAuth, (req,res,next) =>{


  const post =new Post ({
    _id: req.body.id,
    tite: req.body.title,
    content: req.body.content
  });


  Post.updateOne({ _id: req.params.id}, post ).then( result =>{
    console.log(result);
    res.status(200).json({
      message: 'Update Successfull!'
    })
  })
});

module.exports = router;

