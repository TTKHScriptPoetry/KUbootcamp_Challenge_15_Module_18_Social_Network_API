const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser, 
  addFriend,
  removeFriend
} = require('../../controllers/user-controller');

const router = require('express').Router();
 
// /api/users
router.route('/')
     .get(getAllUser)
     .post(createUser);      

// /api/users/:id
router.route('/:userId')
     .get(getUserById)
     .put(updateUser)
     .delete(deleteUser);  

router.route('/:userId/friends/:friendId')
      .post(addFriend)
      .delete(removeFriend);

module.exports = router;      
