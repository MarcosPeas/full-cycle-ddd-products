import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import Customer from "../../entity/customer";
import CustomerChangedEvent from "../customer-changed.event";

export default class SendConsoleLogWhenEmailIsChangedHandler implements EventHandlerInterface<CustomerChangedEvent> {
    handle(event: CustomerChangedEvent): void {
        /*const customer = event.eventData as Customer;
        const address = customer.address;
        const formattedAddress = `${address.street}, ${address.number}, ${address.city}, CEP: ${address.zip}`;
        console.log(`Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${formattedAddress}`);*/
    }
}