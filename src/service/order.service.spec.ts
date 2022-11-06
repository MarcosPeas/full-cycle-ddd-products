import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit test", () => {

    it("should place an order", () => {
        const customer = new Customer("1", "Peas");
        const item1 = new OrderItem("i1", "Item 1", 100, "p1", 1);
        const order1 = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(50);
        expect(order1.total()).toBe(100);
    });
    it("should get total of all orders", () => {
        const item1 = new OrderItem("item1", "Item 1", 100, "1", 1);
        const item2 = new OrderItem("item2", "Item 2", 100, "2", 4);
        const order1 = new Order("o1", "1", [item1]);
        const order2 = new Order("o2", "1", [item2]);

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(500);
    });
});