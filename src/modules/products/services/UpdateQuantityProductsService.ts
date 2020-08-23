import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Product from '@modules/products/infra/typeorm/entities/Product';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

interface IRequest {
  name: string;
  quantity: number;
}

interface IProductQuantity {
  id: string;
  quantity: number;
}

@injectable()
class UpdateQuantityProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(productForUpdate: IRequest[]): Promise<Product[]> {
    const dbProducts = await this.productsRepository.findAll();
    const productsFound: IProductQuantity[] = [];
    await Promise.all(
      productForUpdate.map(productFUpdate => {
        const productExistent = dbProducts.find(product => {
          return productFUpdate.name === product.name;
        });
        if (productExistent) {
          productExistent.quantity =
            Number(productExistent.quantity) + Number(productFUpdate.quantity);
          productsFound.push({
            id: productExistent.id,
            quantity: productExistent.quantity,
          });
          return productExistent;
        }
        return productFUpdate;
      }),
    );
    if (productsFound.length < 1) {
      throw new AppError('Products not found.');
    }
    return this.productsRepository.updateQuantity(productsFound);
  }
}
export default UpdateQuantityProductService;
