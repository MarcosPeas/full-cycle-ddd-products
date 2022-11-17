import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "Anielly");
const address = new Address("Rua Bela Vista", 123, "65600-000", "Princesinha Rebelde");
customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Test find customer use case", () => {
    
    it("should find a customer", async () => {

        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

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
        const result = await usecase.execute(input);

        expect(result).toEqual(output);

    });

    it("should not find a customer", async () => {

        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
             throw new Error("Customer not found");
        });
        const usecase = new FindCustomerUseCase(customerRepository);

        const input = { id: "123" };

       expect(() => {
        return usecase.execute(input);
       }).rejects.toThrow("Customer not found");
    });
});