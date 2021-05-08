const {Schema, model,Types} =require('mongoose');

const schema = new Schema({
  image:{type:String},
  description:{type:String},
  date:{type:Date,default:new Date},
  owner:{type:Types.ObjectId, ref:'User'}
});

module.exports = model('File',schema);
