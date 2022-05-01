const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(  
  {
    // set custom id to avoid confusion with parent thought _id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId() // reason to import Type
    },
    reactionBody: {
      type: String,
      required: 'Reaction Field is Required',
      validate: [({ length }) => length <= 280, 'Cannot exceed 280 characters.']
    },
    username:{
      type: String,
      required: 'Username is Required'
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtDateVal => dateFormat(createdAtDateVal)
    }
  },
  {
    toJSON: {
      getters: true
    },
  }
);

const ThoughtSchema = new Schema(
   {  
      thoughtText: {
         type: String,
         required: 'Content of Thought is Required',
         validate: [({ length }) => length <= 280, 'Must be between 1 and 280 characters.']
      },
      createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtValAlias) => dateFormat(createdAtValAlias)
      },
      username:{
        type: String,
        required: 'Username is Required'
      },
      reactions: [reactionSchema]  
   },
   {
      // -- Tell the schema that it can use virtuals
      toJSON: { 
         virtuals: true,
         getters: true
      },
      id: false // False because it is a virtual that Mongoose returns, and we don’t need it.
   }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;