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
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.products);
            }, 5000);
        });;
    };

    async findOne (id) {
        return this.products.find(product => product.id === id);
    };

    async create (data) {
        const newProduct = {
            id: faker.datatype.uuid(),
            ...data,
        }
        this.products.push(newProduct);
        return newProduct;
    }

    async update (id, data) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) throw new Error('product not found');
        const product = this.products[index];
        this.products[index] = {
            ...product,
            ...data,
        }
        return this.products[index];
    };

    async delete (id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) throw new Error('product not found');
        this.products.splice(index, 1);
        return { id };
    };
};

module.exports = ProductService;
