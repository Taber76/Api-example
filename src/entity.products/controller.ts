import { type Request, type Response, type NextFunction } from 'express';

import ControllerHandler from '../handlers/controllers.handler';
import { language } from '../constants/language';

import DTO from './dto';
import {
  register,
  update,
  get,
} from './service';

export default class Controller {
  private constructor() { }

  // -- Register new product --
  public static async register(req: Request, res: Response, next: NextFunction) {
    const { error, value } = DTO.register(req.body);
    if (error) return ControllerHandler.badRequest(error.message, res)
    try {
      const result = await register(value);
      return ControllerHandler.created(language().productCreated, result, res)
    } catch (err) {
      next(err);
    }
  }

  // -- Update product --
  public static async update(req: Request, res: Response, next: NextFunction) {
    const { error, value } = DTO.update(req.body);
    if (error) return ControllerHandler.badRequest(error.message, res)
    try {
      const result = await update(value);
      if (result) return ControllerHandler.ok(language().productUpdated, res)
      return ControllerHandler.notFound(language().productNotFound, res)
    } catch (err) {
      next(err);
    }
  }

  // -- Delete product --
  public static async delete(req: Request, res: Response, next: NextFunction) {
    const product_id = req.params.id as string
    if (!product_id) return ControllerHandler.badRequest(language().productNotFound, res)
    try {
      const result = await update({ id: product_id, active: false });
      if (result) return ControllerHandler.ok(language().productUpdated, res)
      return ControllerHandler.notFound(language().productNotFound, res)
    } catch (err) {
      next(err);
    }
  }

  // -- Get product/s --
  public static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const product_id = req.params.id ? req.params.id as string : null;
      const results = await get(product_id);
      if (results) return ControllerHandler.ok(language().productFound, res, results)
      return ControllerHandler.notFound(language().productNotFound, res)
    } catch (err) {
      next(err);
    }
  }



}


