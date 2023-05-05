
# bcryptjs password hashing And Pasword compare

const securePassword = async (password) => { 

    <!-- this is for password hashing -->
    const passwordHahing =  await bcrypt.hash(password, 10)  
    console.log(passwordHahing)

    <!-- this is password compare with user password -->
    const comparePassword = await bcrypt.compare(password, passwordHahing)  
    console.log(comparePassword)  
}

securePassword("nik123");

# middleware function

employeeSchema.pre("save",  async function(next){  

  if(this.isModified('password')){

    console.log(`This is my password ${this.password}`)  
    this.password =  await bcrypt.hash(this.password, 10)  
    this.confirm_password = undefined;

  } 
   
  next();

})

**in this function employeeSchema.pre means('save', function) means this function will be run before data save in database**  
**in funtion this indicates the database object**    
**next() funtion means after that middleware function its run save function**
  

# Json Web Token
**jsonwebtoken pacekage use for to know server login user is that user or not** 

const securePassword = async (password) => { 

    const jwtToken =  async () => {  
    const token = jwt.sign({_id:"644bb3c9581b9886aab7c70f"}, "secretMsge")
    console.log(token)

    const verifyToken = jwt.verify(token, "secretMsge")
    console.log(verifyToken)
}
}  

**jwt sign require 3 parameters 1.user-id, 2.secret massage 3 is optional : we can define when that token expires {exprires: "2 minutes"}**  

**After expire token user has to login again**

**jwt verfy require 2 parameters 1.jwt token, 2.secret massage**  