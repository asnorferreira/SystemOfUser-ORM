"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdressController = void 0;
const adressRepository_1 = require("../repositories/adressRepository");
const api_error_1 = require("../helpers/api-error");
const userRepository_1 = require("../repositories/userRepository");
class AdressController {
    async store(req, res) {
        try {
            const { user_id, zipcode, street, number, complement, city, state } = req.body;
            const user = await userRepository_1.userRepository.findById(Number(user_id));
            if (!user) {
                throw new api_error_1.NotFoundError("User not found");
            }
            const zipCode = await adressRepository_1.adressRepository.findByZipcode(zipcode);
            if (zipCode) {
                throw new api_error_1.ServerError("Zipcode already exists");
            }
            const newAddress = adressRepository_1.adressRepository.create({
                zipcode,
                street,
                number,
                complement,
                city,
                state,
                user,
            });
            await adressRepository_1.adressRepository.save(newAddress);
            return res.status(201).json(newAddress);
        }
        catch (error) {
            throw new api_error_1.ServerError("Internal Server Error");
        }
    }
}
exports.AdressController = AdressController;
