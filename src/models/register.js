
const moongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const employeeSchema = new moongoose.Schema({
      firstname: {
        type: String,
        required: true
      },
      lastname: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      phone: {
        type: Number,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      confirm_password: {
        type: String,
        required:true
      },
      gender: {
        type: String,
        required: true,
      },
      tokens: [
        {
            token: {
              type: String,
              required: true,
            }
          }
      ],
      age: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now
      }
})


// middle ware function fot jsonwebtoken
employeeSchema.methods.generateToken = async function(){
  try {
    console.log(this._id);
    const usertoken = jwt.sign({_id: this._id}, process.env.JWT_MSG);
    this.tokens = this.tokens.concat({token: usertoken})
    await this.save();
    return usertoken
  } catch (error) {
    
  }
}

// middleware funcition info read in md file
employeeSchema.pre("save",  async function(next){
  if(this.isModified('password')){
    console.log(`This is my password ${this.password}`)
    this.password =  await bcrypt.hash(this.password, 10)
    this.confirm_password = await bcrypt.hash(this.password, 10)
  }
  next();
})

module.exports = new moongoose.model('Register', employeeSchema)