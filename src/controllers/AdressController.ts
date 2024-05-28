import { Request, Response } from "express";
import { adressRepository } from "../repositories/adressRepository";
import { NotFoundError, ServerError } from "../helpers/api-error";
import { userRepository } from "../repositories/userRepository";

export class AdressController {
  async store(req: Request, res: Response): Promise<Response | void> {
    try {
      const { user_id, zipcode, street, number, complement, city, state } =
        req.body;

      const user = await userRepository.findById(Number(user_id));
      if (!user) {
        throw new NotFoundError("User not found");
      }

      const zipCode = await adressRepository.findByZipcode(zipcode);
      if (zipCode) {
        throw new ServerError("Zipcode already exists");
      }
      
      const newAddress = adressRepository.create({
        zipcode,
        street,
        number,
        complement,
        city,
        state,
        user,
      });

      await adressRepository.save(newAddress);
      return res.status(201).json(newAddress);
    } catch (error) {
      throw new ServerError("Internal Server Error");
    }
  }
}
