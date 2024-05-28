import { AppDataSource } from "../data-source";
import { Address } from "../entities/Address";

export const adressRepository = AppDataSource.getRepository(Address).extend({
  async findById(id: number) {
    return this.findOne({ where: { id: Number(id) } });
  },
  async findByZipcode(zipcode: string) {
    return this.findOne({ where: { zipcode: String(zipcode) } });
  },
});
