import { injectable } from 'inversify';
import { IOrderRepository } from './IOrderRepository';

@injectable()
export class InMemoryOrderRepository implements IOrderRepository {
  private orders: any[] = [];

  public products = [
    { id: 1, name: 'Livro Físico', price: 100.0, freight: 10.0, stock: 10 },
    { id: 2, name: 'E-book Digital', price: 50.0, freight: 0.0, stock: 999 }
  ];

  async create(orderData: any): Promise<any> {
    const order = { 
      id: Date.now(), 
      items: orderData.items || [],
      ...orderData 
    };
    this.orders.push(order);
    return order;
  }

  async save(order: any): Promise<void> {
    if (order && !order.items) {
      order.items = [];
    }
    this.orders.push(order);
  }

  async findById(id: number): Promise<any | null> {
    const order = this.orders.find(o => o.id === id);
    if (order && !order.items) {
      order.items = [];
    }
    return order || null;
  }
}