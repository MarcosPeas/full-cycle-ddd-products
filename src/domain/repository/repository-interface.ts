export default interface RepositoryInterface<T> {
    create(entit: T): Promise<void>;
    update(entity: T): Promise<void>;
    find(id: string): Promise<T>;
    findAll(): Promise<T[]>;
}