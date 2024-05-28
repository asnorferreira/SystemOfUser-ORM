import { Request, Response } from "express";
import { ServerError } from "../helpers/api-error";
import { roleRepository } from "../repositories/rolesRepository";

export class RolesController{
    async list(req: Request, res: Response): Promise<Response | void> {
        try {
            const listRoles = await roleRepository.find();
            return res.status(200).json(listRoles);
        } catch (error) {
            throw new ServerError('Internal Server Error');
        }
    }
    
    async store(req: Request, res: Response): Promise<Response | void> {
        try {
            const { role } = req.body;
            const newRole = roleRepository.create({role});
            
            await roleRepository.save(newRole);
            return res.status(201).json(newRole);
        } catch (error) {
            throw new ServerError('Internal Server Error');
        }
    }
}