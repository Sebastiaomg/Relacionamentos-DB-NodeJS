import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const order_id = { id: request.params.id };
    const findOrderService = container.resolve(FindOrderService);
    const order = await findOrderService.execute(order_id);
    return response.json(classToClass(order));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const orderProducts = request.body;
    const createOderService = container.resolve(CreateOrderService);
    const order = await createOderService.execute(orderProducts);
    return response.json(classToClass(order));
  }
}
