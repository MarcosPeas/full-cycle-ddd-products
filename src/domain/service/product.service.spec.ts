import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit test", () => {
    it("should change the prices of all products", () => {
        const p1 = new Product("1", "p1", 100);
        const p2 = new Product("2", "p2", 200);
        const products = [p1, p2];

        ProductService.increasePrice(products, 20);

        expect(p1.price).toBe(120);
        expect(p2.price).toBe(240);
    });
});