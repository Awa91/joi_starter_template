/**
 * The SchemaValidator function takes in a path string and a boolean flag as 
 * parameters and returns an Express middleware function.

The middleware function validates the request body against a predefined schema 
(the schemas in our schemas.ts file) using the Joi library. If the validation fails,
 it returns a 422 HTTP status code along with a custom error object that contains 
 either the Joi error or a generic error message, depending on the value of the 
 useJoiError flag.

If the validation succeeds, it sets the request body to the validated value and calls
 the next() function to pass control to the next middleware. Pretty simple.
 */

import { RequestHandler } from "express";
import schemas from "../schemas";







interface ValidationError {
  message: string;
  type: string;
}

interface JoiError {
  status: string;
  error: {
    original: unknown;
    details: ValidationError[];
  };
}

interface CustomError {
  status: string;
  error: string;
}

const supportedMethods = ["post", "put", "patch", "delete"];

const validationOptions = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false,
};

const schemaValidator = (path: string, useJoiError = true): RequestHandler => {
  const schema = schemas[path];

  if (!schema) {
    throw new Error(`Schema not found for path: ${path}`);
  }

  return (req, res, next) => {
    const method = req.method.toLowerCase();

    if (!supportedMethods.includes(method)) {
      return next();
    }

    const { error, value } = schema.validate(req.body, validationOptions);

    if (error) {
      const customError: CustomError = {
        status: "failed",
        error: "Invalid request. Please review request and try again.",
      };

      const joiError: JoiError = {
        status: "failed",
        error: {
          original: error._original,
          details: error.details.map(({ message, type }: ValidationError) => ({
            message: message.replace(/['"]/g, ""),
            type,
          })),
        },
      };

      return res.status(422).json(useJoiError ? joiError : customError);
    }

    // validation successful
    req.body = value;
    return next();
  };
};

export default schemaValidator;
function filterUsers() {
  throw new Error("Function not implemented.");
}
