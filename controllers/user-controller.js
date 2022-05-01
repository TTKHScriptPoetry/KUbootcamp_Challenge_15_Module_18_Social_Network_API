const { User } = require('../models');

const userController = {
   // these methods will be used as the callback functions for the Express.js routes,
   // each will take two parameters: req and res.
   getAllUser(req, res) {
      User.find({})
         // .populate({ 
         //    path: 'thoughts', // passing in an object with the key path 
         //    select: '-__v' // minus sign (don't return) - tell Mongoose that we don't care about the __v field on thoughts  
         // })
         .select('-__v') // minus sign - tell Mongoose that we don't care about the __v field on the user 
         .sort({ _id: -1 }) // sort in DESC order by the _id value
         .then(dbUserData => res.json(dbUserData))
         .catch(err => {
            console.log(err);
            res.status(400).json(err);
      });
   },
   
   // get one user by id
   getUserById({ params }, res) {
      User.findOne({ _id: params.userId })
      .populate({
         path: 'thoughts',
         select: '-__v'
      })
      .populate({
         path: 'friends',
         select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => {
         // If no user is found, send 404
         if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
         }
         res.json(dbUserData);
      })
      .catch(err => {
         console.log(err);
         res.status(400).json(err);
      });
   },
  
   // handling POST /api/users 
   // createUser
   createUser({ body }, res) {
      User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
   },

   // make a request to PUT /api/users/:id.
   // update user by id
   updateUser({ params, body }, res) {
      User.findOneAndUpdate({ _id: params.userId }, body, { new: true }) //we're instructing Mongoose to return the new version of the document.
      .then(dbUserData => {
         if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id to update!' });
            return;
         }
         res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
   },

   // make a request to DELETE /api/users/:id.
   // delete user
   deleteUser({ params }, res) {
      User.findOneAndDelete({ _id: params.userId })
      .then(dbUserData => {
         if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id to delete!' });
            return;
         }
         res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
   },

    // Add a friend V1
   addFriend({ params, body }, res) {
      return User.findOneAndUpdate(
         { _id: params.userId }, 
         { $push: { friends: params.friendId } },                
         { new: true }
      )  
      .then(dbUserData => {
         if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id to add friends!' });
            return;
         }
         res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
   },

   // //really add a friend V2
   // addFriendV2({ params, body }, res) {
   // console.log(body);
   // User.create(body)
   //   .then(({ _id }) => {
   //     return User.findOneAndUpdate(
   //       { _id: params.userId }, //{ _id: params.userId }, //
   //       { $push: { friends: _id } },                
   //       { new: true }
   //     );
   //   })
   //   .then(dbUserData => {
   //     if (!dbUserData) {
   //       res.status(404).json({ message: 'No user found with this id to add friends!' });
   //       return;
   //     }
   //     res.json(dbUserData);
   //   })
   //   .catch(err => res.json(err));
   // },

};

module.exports = userController;