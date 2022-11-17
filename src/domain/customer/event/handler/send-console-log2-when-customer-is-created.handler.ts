import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../../../customer/event/customer-created.event";

export default class SendConsoleLog2WhenProductIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        //console.log('Esse é o segundo console.log do evento: CustumerCreated');
    }
}