import EventInterface from "../@shared/event.interface";

export default class ProductCreatedEvent implements EventInterface {
    dataTimeOccured: Date;
    eventData: any;

    constructor(eventData: any) {
        this.eventData = eventData;
        this.dataTimeOccured = new Date();
    }
}