import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });


    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Ball",
                price: 10,
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Ball");
        expect(response.body.price).toBe(10);
    });

    it("should not create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Ball",
            });
        expect(response.status).toBe(500);
    });

    it("should list all products", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Ball",
                price: 10,
            });
        expect(response.status).toBe(200);
        const response2 = await request(app)
            .post("/product")
            .send({
                name: "Lego",
                price: 15,
            });

        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/product").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        const product = listResponse.body.products[0];
        expect(product.name).toBe("Ball");
        expect(product.price).toBe(10);
        const customer2 = listResponse.body.products[1];
        expect(customer2.name).toBe("Lego");
        expect(customer2.price).toBe(15);
    });
});