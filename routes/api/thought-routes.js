const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,
  addThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/').post(addThought);

// /api/thoughts/
router.route('/').get(getAllThought);

// /api/thoughts/thoughtId
router.route('/:thoughtId').get(getThoughtById);

router
  .route('/:userId/:thoughtId/')
  .delete(removeThought);

// /api/thoughts/:thoughtId/reactions  per specs
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);  

module.exports = router;
