import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "Jane");
        }).toThrowError("customer: Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("1", "");
        }).toThrowError("customer: Name is required");
    });

    it("should throw error when name and id are empty", () => {
        expect(() => {
            let customer = new Customer("", "");
        }).toThrowError("customer: Id is required, customer: Name is required");
    });

    it("should change name", () => {
        //Arrange
        let customer = new Customer("1", "Janny");

        //Act
        customer.changeName("Jane");

        //Assert
        expect(customer.name).toBe("Jane");
    });

    it("should activate customer", () => {
        let customer = new Customer("1", "Customer 1");
        let address = new Address("Rua 1", 1, "65600000", "Quantas");
        customer.changeAddress(address);
        customer.activate();
        expect(customer.isActive).toBe(true);
    });

    it("should throw error when address is undefined when you activate a costumer", () => {
        expect(() => {
            let customer = new Customer("1", "Customer 1");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
    });

    it("should deactivate customer", () => {
        let customer = new Customer("1", "Customer 1");
        customer.deactivate();
        expect(customer.isActive).toBe(false);
    });

    it("should add reward points", () => {
        const customer = new Customer("1", "Marcos");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(5);
        expect(customer.rewardPoints).toBe(5);

        customer.addRewardPoints(25);
        expect(customer.rewardPoints).toBe(30);
    });
});