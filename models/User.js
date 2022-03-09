const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');
const reactionSchema = require('./Reaction');

const userSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      thoughts: [{type: Schema.Types.ObjectId, ref: 'thought'}],
      friends: [{type: Schema.Types.ObjectId, ref: 'friend'}],
    },
    {
      toJSON: {
        getters: true,
        virtuals: true,
      },
      id: false,
    }
  );
  
  userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

  const User = model('user', userSchema)
  
  module.exports = User;
  