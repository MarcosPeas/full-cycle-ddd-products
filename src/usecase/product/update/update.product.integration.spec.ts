import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";


describe("Integration test for product update use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const updatedProductUseCase = new UpdateProductUseCase(productRepository);

        const product = new Product("159", "Product 1", 20);
        
        await productRepository.create(product);

        const input = {
            id: product.id,
            name: "New Product",
            price: 30,
        };

        const output = await updatedProductUseCase.execute(input);
        expect(output).toEqual(input);
    });
});