import Product from "./product";

describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            new Product("", "Product 1", 20);
        }).toThrowError("product: Id is required");
    });
    it("should throw error when name is empty", () => {
        expect(() => {
            new Product("1", "", 20);
        }).toThrowError("product: Name is required");
    });
    it("should throw error when price is less then zero", () => {
        expect(() => {
            new Product("1", "1", -1);
        }).toThrowError("product: Price must be greater than zero");
    });

    it("should throw error when name and id are empty", () => {
        expect(() => {
            let customer = new Product("", "", 20);
        }).toThrowError("product: Id is required, product: Name is required");
    });
});