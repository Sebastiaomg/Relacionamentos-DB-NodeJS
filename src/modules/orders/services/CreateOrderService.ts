import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customer = await this.customersRepository.findById(customer_id);
    if (!customer) {
      throw new AppError('Customer not found');
    }
    const products_ids = products.map(product => {
      return { id: product.id };
    });
    const productsFinded = await this.productsRepository.findAllById(
      products_ids,
    );
    if (productsFinded.length < 1) {
      throw new AppError('Product not found');
    }
    const productsFindedUpdateQuantities: IProduct[] = [];
    const productsPriceQuantity = productsFinded.map(product => {
      const [productQuantity] = products.filter(prod => prod.id === product.id);
      if (product.quantity < productQuantity.quantity) {
        throw new AppError('Product insufficiet quantitie.');
      }

      const quantity =
        Number(product.quantity) - Number(productQuantity.quantity);
      const productUpdateQuantity = {
        id: product.id,
        quantity,
      };
      productsFindedUpdateQuantities.push(productUpdateQuantity);

      return {
        product_id: product.id,
        price: product.price,
        quantity: productQuantity.quantity,
      };
    });
    const orderParsed = {
      customer,
      products: productsPriceQuantity,
    };
    await this.productsRepository.updateQuantity(
      productsFindedUpdateQuantities,
    );
    return this.ordersRepository.create(orderParsed);
  }
}

export default CreateOrderService;
