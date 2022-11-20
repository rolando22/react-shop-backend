const faker = require('faker');

class ProductService {

    constructor() {
        this.products = [];
        this.generate();
    };

    generate () {
        for (let index = 0; index < 50; index++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.imageUrl(),
            });
        };
    };

    find () {
        return this.products;
    };

    findOne (id) {
        return this.products.find(product => product.id === id);
    };
};

module.exports = ProductService;
