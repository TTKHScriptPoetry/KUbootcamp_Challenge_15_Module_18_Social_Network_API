const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,
  addThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts/
router.route('/').get(getAllThought);

// /api/thoughts/thoughtId
router.route('/:thoughtId').get(getThoughtById);

// /api/thoughts
// router.route('/:userId').post(addThought);
router.route('/').post(addThought);

// /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction);
  // .delete(removeThought);

// // /api/thoughts/<userId>/<thoughtId>
// router
//   .route('/:userId/:thoughtId')
//   .put(addReaction)
//   .delete(removeThought);
// 
// // /api/thoughts/<userId>/<thoughtId>/<reactionId>
// // /api/thoughts/:thoughtId/reactions
// router.route('/:thoughtId/reactions/reactionId').delete(removeReaction);

module.exports = router;
