const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThought(req, res) {
    Thought.find({})      
      .select('-__v') // minus sign - tell Mongoose that we don't care about the __v field on the user 
      .sort({ _id: -1 }) // sort in DESC order by the _id value
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
  },
   
  // get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
    .select('-__v')
    .then(dbThoughtData => {
        // If no thought is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
  },

  // add user's thought 
  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId }, //{ _id: params.userId }, //
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id to add thoughts!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // remove thought api/thoughts/userId/thoughtId Works
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought found with this id to be removed!' });
        }
        return User.findByIdAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
        // return res.json({ message: 'Thought has been deleted!' });
        // return res.json(deletedThought);
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // add reaction to thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId }, //
      { $push: { reactions: body } }, 
      { new: true }
      )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No thought found with this id to add reactions!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // // remove reaction to thought /:thoughtId/reactions/:reactionId')
  removeReaction({ params }, res) {
    Thought.findByIdAndUpdate(
      { _id: params.thoughtId }, //
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
      )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No reaction found with this id to be removed!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // // remove reaction /:thoughtId/reactions/:reactionId')
  // removeReaction({ params }, res) {
  //   Thought.findOneAndUpdate(
  //     { _id: params.thoughtId },
  //     { $pull: { reactions: { reactionId: params.reactionId } } },
  //     { new: true }
  //   )
  //     .then(dbUserData => res.json(dbUserData))
  //     .catch(err => res.json(err));
  // }

};

module.exports = thoughtController;
