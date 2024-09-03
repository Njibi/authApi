import { Model, Types, FilterQuery } from 'mongoose';

export default abstract class Repository<T> {
    model: Model<T>;
    constructor(model: Model<T>) {
      this.model = model;
    }
  
    find(data?: Partial<T>) {
      const doc = data || {};
      return this.model.find(doc);
    }
  
    findOne(data?: string | Partial<T>) {
      if (typeof data === 'object') return this.model.findOne(data);
      return this.model.findById(data);
    }

    create(data: T) {
      return this.model.create(data);
    }

  }