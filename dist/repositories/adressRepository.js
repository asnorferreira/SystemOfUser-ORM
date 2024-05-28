"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adressRepository = void 0;
const data_source_1 = require("../data-source");
const Address_1 = require("../entities/Address");
exports.adressRepository = data_source_1.AppDataSource.getRepository(Address_1.Address).extend({
    async findById(id) {
        return this.findOne({ where: { id: Number(id) } });
    },
    async findByZipcode(zipcode) {
        return this.findOne({ where: { zipcode: String(zipcode) } });
    },
});
