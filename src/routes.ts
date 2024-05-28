import { Request, Response, Router } from "express";
import { User } from "./entities/User";
import { UserController } from "./controllers/UserController";
import { userRepository } from "./repositories/userRepository";
import { AdressController } from "./controllers/AdressController";
import { RolesController } from "./controllers/RolesController";
import { UserRoleController } from "./controllers/UserRoleController";

const routes = Router();


routes.get("/", new UserController().list);
routes.get("/rol", new RolesController().list);

routes.get("/:id", new UserController().listID);

routes.post("/", new UserController().store);
routes.post("/adress", new AdressController().store);
routes.post("/rol", new RolesController().store);
routes.post("/user-rol", new UserRoleController().store);

routes.put("/:id", new UserController().update);

routes.delete("/:id", new UserController().delete);

export default routes;
