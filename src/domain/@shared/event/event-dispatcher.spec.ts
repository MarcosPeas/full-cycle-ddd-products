import Customer from "../../customer/entity/customer";
import CustomerChangedEvent from "../../customer/event/customer-changed.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import SendConsoleLogWhenEmailIsChangedHandler from "../../customer/event/handler/send-console-log-when-email-is-changed.handler";
import SendConsoleLog1WhenProductIsCreatedHandler from "../../customer/event/handler/send-console-log1-when-customer-is-created.handler";
import SendConsoleLog2WhenProductIsCreatedHandler from "../../customer/event/handler/send-console-log2-when-customer-is-created.handler";
import Address from "../../customer/value-object/address";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";


describe("Domain events tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unresgiter("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, 'handle');

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({name: "Product 1", description: "", price: 10.0});
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

    it("should notify the SendConsoleLog1WhenCustomerIsCreatedHandler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog1WhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, 'handle');

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        const customer = new Customer("123", "Marcos");
        const address = new Address("Rua 01", 2, "65600-000", "Caxias");
        customer.changeAddress(address);
        customer.activate();

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new CustomerCreatedEvent(customer);
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

    it("should notify the SendConsoleLog2WhenCustomerIsCreatedHandler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog2WhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, 'handle');

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        const customer = new Customer("123", "Marcos");
        const address = new Address("Rua 01", 2, "65600-000", "Caxias");
        customer.changeAddress(address);
        customer.activate();

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new CustomerCreatedEvent(customer);
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

   it("should notify the SendConsoleLogWhenEmailIsChangedHandler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogWhenEmailIsChangedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, 'handle');

        eventDispatcher.register("CustomerChangedEvent", eventHandler);

        const customer = new Customer("123", "Marcos");
        const address = new Address("Rua 01", 2, "65600-000", "Caxias");
        customer.changeAddress(address);
        customer.activate();

        expect(eventDispatcher.getEventHandlers["CustomerChangedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerChangedEvent"][0]).toMatchObject(eventHandler);

        const customerChangedEvent = new CustomerChangedEvent(customer);
        eventDispatcher.notify(customerChangedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });
});