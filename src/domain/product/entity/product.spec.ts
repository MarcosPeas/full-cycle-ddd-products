import Product from "./product";

describe("Product unit tests", () => {
    it("Should throw error when id is empty", () => {
        expect(() => {
            new Product("", "Product 1", 20);
        }).toThrowError("Id is required");
    });
    it("Should throw error when name is empty", () => {
        expect(() => {
            new Product("1", "", 20);
        }).toThrowError("Name is required");
    });
    it("Should throw error when price is less then zero", () => {
        expect(() => {
            new Product("1", "1", -1);
        }).toThrowError("Price must be greater than zero");
    });
});