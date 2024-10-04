//Joi implementation approach:
//1.Create a file called schemas.ts to store all the validation schemas that our entire app will use.
//2.Export an object where each key/value pair will be the route/path and corresponding Joi schema to be validated.
//3.Create a middleware called SchemaValidator to validate our request bodies.
//The SchemaValidator middleware will accept two arguments. The first argument will be 
//the path (route), and the second argument will be an option to use a custom error 
//message. With the path, we can get the corresponding schema and validate the request
// body against it. 

import Joi , {ObjectSchema} from 'joi';


const PASSWORD_REGEX = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})"
); 


const authSignup = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(PASSWORD_REGEX).min(8).required(),
  });
  
  const authSignin = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  
  export default {
    "/auth/signin": authSignin,
    "/auth/signup": authSignup,
  } as { [key: string]: ObjectSchema };


  /**
   * Here, we define two validation schemas, authSignup and authSignin. 
   * These schemas ensure that the input data conforms to specific rules, such as 
   * requiring certain fields, ensuring they are of a certain type, and/or conform to 
   * specific patterns. The exported object containing the schemas will be used in our
   *  SchemaValidator middleware.
   */