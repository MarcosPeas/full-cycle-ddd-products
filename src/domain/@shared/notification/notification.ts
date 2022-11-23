export type NotificationErrorProps = {
    message: string;
    context: string;
}

export default class Notification {
    private _errors: NotificationErrorProps[] = [];

    addError(error: NotificationErrorProps): void {
        this._errors.push(error);
    }

    messages(context?: string): string {
        return this._errors
            .filter((error) => {
                if (context === null || context === undefined) {
                    return true;
                }
                return error.context == context;
            })
            .map((error) => `${error.context}: ${error.message}`).join(", ");
    }

    hasErrors(): boolean {
        return this.errors.length > 0;
    }

    get errors () : NotificationErrorProps[]{
        return this._errors;
    }
}