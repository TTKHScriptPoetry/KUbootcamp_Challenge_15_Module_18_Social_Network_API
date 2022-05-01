const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: 'UserName is Required'
    },

    email: {
      type: String,
      unique: true,
      required: 'Email is Required',
      match: [/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, 'Please enter a valid e-mail address']
    },

    thoughts: 
      [
        { 
          type: Schema.Types.ObjectId, // IMPORTANT type to be an ObjectId >> so that Mongoose knows to expect a thought
          ref: 'Thought' // Tells the User model which documents to search to find the right thought.
        }
      ]  
    ,  
    friends: 
      [
        { 
          type: Schema.Types.ObjectId,  
          ref: 'User'  
        }
      ] 
  }, 
);

const User = model('User', UserSchema);

module.exports = User;
