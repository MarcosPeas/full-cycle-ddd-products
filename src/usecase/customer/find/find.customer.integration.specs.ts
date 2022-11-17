import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test find customer use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a customer", async () => {
        const customer = new Customer("123", "Anielly");
        const address = new Address("Rua Bela Vista", 123, "65600-000", "Princesinha Rebelde");
        customer.changeAddress(address);

        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository);
        await customerRepository.create(customer);

        const input = { id: "123" };
        const output = {
            id: "123",
            name: "Anielly",
            address: {
                street: "Rua Bela Vista",
                city: "Princesinha Rebelde",
                number: 123,
                zip: "65600-000",
            }
        };
        const result = usecase.execute(input);

        expect(result).toEqual(output);

    });
});