import { language } from '../constants/language.js';

export default class DTO {
  private constructor() { }

  public static register(data: any) {
    const { name, code, description, category } = data;
    if (!name || !description)
      return {
        error: {
          message: language().productRegisterFieldsRequired
        }
      }

    return {
      error: null, value: {
        name,
        code,
        description,
        category,
        active: true
      }
    }
  }


  public static update(data: any) {
    const { id, name, code, description, category, active } = data;
    if (!id)
      return {
        error: {
          message: language().productUpdateIdRequired
        }
      }
    if (!name && !code && !description && !category && !active)
      return {
        error: {
          message: language().productUpdateFieldsRequired
        }
      }

    const response: any = { id };
    if (name) response.name = name;
    if (code) response.code = code;
    if (description) response.description = description;
    if (category) response.category = category;
    if (active !== undefined) response.active = active;

    return {
      error: null,
      value: response,
    };

  }

}