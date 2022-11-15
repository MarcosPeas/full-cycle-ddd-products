import Customer from "../entity/customer";
import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
    it("should create a customer", () => {
        const customer: Customer = CustomerFactory.create("John");
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBeUndefined();
    });
    
    it("should create a customer with an address", () => {
        const address = new Address("Rua 06", 17, "6560000", "Caxias");
        const customer: Customer = CustomerFactory.createWithAddress("John", address);
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBeDefined();
        expect(customer.address).toBe(address);
    });
});