import { Request, Response } from "express";
import { ServerError } from "../helpers/api-error";
import { userRoleRepository } from "../repositories/userRolesRepository";

export class UserRoleController {
  async store(req: Request, res: Response): Promise<Response | void> {
    try {
      const { user_id, role_id } = req.body;
      const newUserRole = userRoleRepository.create({ user_id, role_id });
      await userRoleRepository.save(newUserRole);
      return res.status(201).json(newUserRole);
    } catch (error) {
      console.error("Error in UserRoleController.store:", error);

      throw new ServerError("Internal Server Error");
    }
  }
}

