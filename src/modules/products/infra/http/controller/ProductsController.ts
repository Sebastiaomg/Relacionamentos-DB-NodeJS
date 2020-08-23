import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateProductService from '@modules/products/services/CreateProductService';
import UpdateQuantityProductsService from '@modules/products/services/UpdateQuantityProductsService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const createProductServer = container.resolve(CreateProductService);
    const product = await createProductServer.execute({
      name,
      price,
      quantity,
    });
    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProducts = request.body;
    const updateQuantityProductsServer = container.resolve(
      UpdateQuantityProductsService,
    );
    const product = await updateQuantityProductsServer.execute(updateProducts);
    return response.json(product);
  }
}
