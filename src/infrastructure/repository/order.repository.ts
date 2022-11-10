import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
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
            if (updatedRows === 0) {
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

    async find(id: string): Promise<Order> {
        let orderModel: OrderModel;
        try {
            orderModel = await OrderModel.findOne({
                where: { "id": id, },
                rejectOnEmpty: true,
                include: [{ model: OrderItemModel }]
            });
        } catch (error) {
            throw new Error("Order not found");
        }
        const orderItems = orderModel.items.map(item => {
            console.log(`price: ${item.price} -> quantity: ${item.quantity}`);
            return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
        });
        const order = new Order(id, orderModel.customer_id, orderItems);
        console.log(`${order.total()} -> ${orderModel.total}`);
        return order;
    }

    findAll(): Promise<Order[]> {
        throw new Error("Method not implemented.");
    }

}