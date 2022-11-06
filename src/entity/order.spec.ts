import Customer from "./customer";
import Order from "./order";
import OrderItem from "./order_item";
import Product from "./product";

describe("Order unit tests", () => {
    it("Should throw error when id is empty", () => {
        expect(() => {
            new Order("", "1", []);
        }).toThrowError("Id is required");
    });
    it("Should throw error when customerId is empty", () => {
        expect(() => {
            new Order("1", "", []);
        }).toThrowError("CustomerId is required");
    });
    it("Should throw error when customerId is empty", () => {
        expect(() => {
            new Order("1", "1", []);
        }).toThrowError("Items are required");
    });
    it("Should calculate total", () => {
        const item1 = new OrderItem("1", "item1", 10, "p1", 2);
        const item2 = new OrderItem("2", "item2", 12, 'p1', 2);
        const order1 = new Order("1", "1", [item1]);

        const total1 = order1.total();
        expect(total1).toBe(20);

        const order2 = new Order("2", "1", [item1, item2]);
        const total2 = order2.total();
        expect(total2).toBe(44);
    });
    it("Should throw error if item quantity is less or equals zero", () => {
        expect(() => {
            const item1 = new OrderItem("1", "item1", 10, "p1", 10);
            const item2 = new OrderItem("2", "item2", 10, "p1", 0);
            new Order("1", "1", [item1, item2]);
        }).toThrowError("Quantity must be greater than zero");
    });
});