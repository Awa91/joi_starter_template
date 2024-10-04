/**
 * Now that we have set up our approach, we can use the SchemaValidator middleware in
 *  our route definitions. For example, here's how we can use it to validate the auth 
 * routes.

First, create a new folder called auth inside the routes folder. Inside the auth 
folder, create an index.ts file where we will define the two authentication routes: 
the signup and signin routes.
 */

import { Router, Request, Response } from "express";
import schemaValidator from "../../middlewares/schemaValidator";

const router = Router();

// router.post("/signin", (req: Request, res: Response) => {});

// router.post("/signup", (req: Request, res: Response) => {});

// export default router;
router.post("/signin",schemaValidator("/auth/signin"), (req: Request, res: Response) => { return res.send("You've successfully logged in ✔");});

router.post("/signup",schemaValidator("/auth/signup"), (req: Request, res: Response) => {return res.send("Sign up complete ✔");});

export default router;

