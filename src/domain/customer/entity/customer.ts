import Address from "../value-object/address";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address?: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    get name(): string {
        return this._name;
    }

    changeAddress(value: Address): void {
        this._address = value;
    }

    get address(): Address {
        return this._address;
    }

    get isActive(): boolean {
        return this._active;
    }

    validate(): void {
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
    }

    get id(): string {
        return this._id;
    }

    changeName(name: string): void {
        this._name = name;
        this.validate();
    }

    activate(): void {
        if (this._address === undefined || this._address === null) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }

    deactivate(): void {
        this._active = false;
    }

    addRewardPoints(points: number): void {
        this._rewardPoints += points;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }
}