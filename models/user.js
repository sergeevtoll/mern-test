const {Schema, model,Types} =require('mongoose');

const schema = new Schema({
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true},
  images:[{type:Types.ObjectId, ref:'File'}]
});

module.exports = model('User',schema);
