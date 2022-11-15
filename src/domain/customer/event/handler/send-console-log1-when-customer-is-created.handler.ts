import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../../../customer/event/customer-created.event";

export default class SendConsoleLog1WhenProductIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        console.log('Esse é o primeiro console.log do evento: CustumerCreated');
    }
}