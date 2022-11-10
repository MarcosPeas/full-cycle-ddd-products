import { Sequelize } from "sequelize";
import Order from "../../domain/entity/order";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            },
            {
                include: [{ model: OrderItemModel }],
            }
        );
    }

    async update(entity: Order): Promise<void> {
        entity.items.map(async item => {
            const [updatedRows] = await OrderItemModel.update(
                {
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                }, {
                where: {
                    "id": item.id,
                }
            });
            if(updatedRows === 0) {
                await OrderItemModel.create(
                    {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        product_id: item.productId,
                        quantity: item.quantity,
                        order_id: entity.id,
                    }
                );
            }
        });
        await OrderModel.update(
            {
                customer_id: entity.customerId,
                total: entity.total(),
            },
            {
                where: {
                    id: entity.id,
                },
            },
        );
    }

    find(id: string): Promise<Order> {
        throw new Error("Method not implemented.");
    }

    findAll(): Promise<Order[]> {
        throw new Error("Method not implemented.");
    }

}