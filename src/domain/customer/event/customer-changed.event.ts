import EventInterface from "../../@shared/event/event.interface";

export default class CustomerChangedEvent implements EventInterface {
    dataTimeOccured: Date;
    eventData: any;

    constructor(eventData: any) {
        this.eventData = eventData;
        this.dataTimeOccured = new Date();
    }
}