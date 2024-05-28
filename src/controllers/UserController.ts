import { Request, Response } from "express";
import { NotFoundError, ServerError } from "../helpers/api-error";
import { userRepository } from "../repositories/userRepository";
import { adressRepository } from "../repositories/adressRepository";

export class UserController {
  async list(req: Request, res: Response): Promise<Response | void> {
    try {
      // const listAdress = await adressRepository.find({
      //   relations: {
      //     user: true,
      //   },
      // });
      const listUser = await userRepository.find({
        relations: {
          addresses: true,
          userRoles: true,
        },
      });

      const userListWithoutPassword = listUser.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

      return res.json(userListWithoutPassword);
    } catch (error) {
      throw new ServerError("Internal Server Error");
    }
  }

  async listID(req: Request, res: Response): Promise<Response | void> {
    try {
      const { id } = req.params;
      const listUserID = await userRepository.findById(Number(id), {
        relations: { addresses: true, userRoles: true },
      });
      if (!listUserID) {
        throw new NotFoundError("User not found");
      }

      const { password, ...userWithoutPassword } = listUserID;

      return res.json(userWithoutPassword);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      throw new ServerError("Internal Server Error");
    }
  }

  async store(req: Request, res: Response): Promise<Response | void> {
    try {
      const { name, email, password } = req.body;
      const newUser = userRepository.create({ name, email, password });
      await userRepository.beforeChange(newUser);
      await userRepository.save(newUser);

      const { password: _, ...userWithPassword } = newUser;

      return res.status(201).json(userWithPassword);
    } catch (error) {
      throw new ServerError("Internal Server Error");
    }
  }

  async update(req: Request, res: Response): Promise<Response | void> {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const upUser = await userRepository.findById(Number(id));
      if (!upUser) {
        throw new NotFoundError("User not found");
      }
      if (name) upUser.name = name;
      if (email) upUser.email = email;
      if (password) upUser.password = password;

      await userRepository.beforeChange(upUser);
      await userRepository.save(upUser);
      const { password: _, ...userWithPassword } = upUser;

      return res.status(201).json(userWithPassword);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      throw new ServerError("Internal Server Error");
    }
  }

  async delete(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    try {
      const delUser = await userRepository.findById(Number(id), {
        relations: { addresses: true, userRoles: true },
      });

      if (!delUser) {
        throw new NotFoundError("User not found");
      }

      if (delUser.addresses) {
        await adressRepository.remove(delUser.addresses);
      }
      if (delUser.userRoles) {
        await userRepository.remove(delUser.userRoles.map((role) => role.user));
      }

      await userRepository.remove(delUser);
      return res.status(200).json({ message: "User deleted" });
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      throw new ServerError("Internal Server Error");
    }
  }
}
