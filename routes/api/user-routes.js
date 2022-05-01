const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/user-controller');

const router = require('express').Router();
 
// /api/users
router.route('/')
     .get(getAllUser)
     .post(createUser);      

// /api/users/:id
router.route('/:id')
     .get(getUserById)
     .put(updateUser)
     .delete(deleteUser);  

module.exports = router;      
