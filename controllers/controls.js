const Course = require("../models/commentModal");

const getPosts = async (req, res) => {
    const id = req.params.id;
  
    try {
      const posts = await Course.find({course: id});
      res.status(200).json(posts);
    } catch (err) {
      console.log(err);
      res.status(404).send("not found");
    }
};

const postComment = async (req,res) => {
    const {user, comment, course} = req.body

    const newComment = new Course({
        user: user,
        comment: comment,
        course: course,
        replies: []
    })

    newComment.save().then(savedCom => console.log(savedCom))
    return res.status(200).json({ message: 'Comment received successfully' });
}

const postReply = async (req,res) => {
    const id = req.params.id;
    const {user, comment} = req.body

    try {
        const post = await Course.findById(id);
        const replies = [{user:user, comment: comment}, ...post.replies]
        post.replies = replies
        await post.save()
        res.status(200).json({ message: 'reply received successfully' });
      } catch (err) {
        console.log(err);
        res.status(404).send("not found");
      }
}

module.exports = {getPosts, postComment,postReply}