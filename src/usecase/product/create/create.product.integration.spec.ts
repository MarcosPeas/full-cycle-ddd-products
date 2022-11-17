import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

describe("Integration test create a produtc use case", () => {

    let sequelize: Sequelize;
    let input: InputCreateProductDto;

    beforeEach(async () => {

        input = {
            name: "Product 1",
            price: 50,
        };

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

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const output = await usecase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });


    it("should throw an error when name is missing", async () => {
        const productRepository =  new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        input.name = "";

        await expect(usecase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should throw an error when price is zero", async () => {
        const productRepository =  new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        input.price = 0;
        await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than zero");
    });
});