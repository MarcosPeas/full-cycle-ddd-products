import Notification from "../notification/notification";

export default  abstract class Entity {
    protected _id: string;
    public notification: Notification;

    constructor(id: string) {
        this._id = id;
        this.notification = new Notification();
    }
}