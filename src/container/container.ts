import { Container } from 'inversify';
import { TYPES } from './types';

import { IOrderRepository } from '../repositories/IOrderRepository';
import { PrismaOrderRepository } from '../repositories/PrismaOrderRepository';
import { InMemoryOrderRepository } from '../repositories/InMemoryOrderRepository';

import { IProductRepository } from '../repositories/IProductRepository';
import { PrismaProductRepository } from '../repositories/PrismaProductRepository';

import { IMailProvider } from '../providers/IMailProvider';
import { EtherealMailProvider } from '../providers/EtherealMailProvider';
import { ConsoleMailProvider } from '../providers/ConsoleMailProvider';

import { PaymentMethodRegistry } from '../payments/PaymentMethodRegistry';
import { IPaymentMethod } from '../payments/IPaymentMethod';
import { CreditCardPayment } from '../payments/CreditCardPayment';
import { DebitCardPayment } from '../payments/DebitCardPayment';
import { PixPayment } from '../payments/PixPayment';

import { OrderService } from '../services/OrderService';
import { OrderController } from '../controllers/OrderController';
import { NotificationService } from '../services/NotificationService';
import { PrismaClient } from '@prisma/client';

export const container = new Container();

const environment = process.env.APP_ENV || 'dev';

container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(new PrismaClient());

if (environment === 'test') {
  container.bind<IOrderRepository>(TYPES.OrderRepository).to(InMemoryOrderRepository).inSingletonScope();
  container.bind<IMailProvider>(TYPES.MailProvider).to(ConsoleMailProvider).inSingletonScope();
} else {
  container.bind<IOrderRepository>(TYPES.OrderRepository).to(PrismaOrderRepository).inSingletonScope();
  container.bind<IMailProvider>(TYPES.MailProvider).to(EtherealMailProvider).inSingletonScope();
}

container.bind<IProductRepository>(TYPES.ProductRepository).to(PrismaProductRepository).inSingletonScope();

container.bind<IPaymentMethod>(TYPES.PaymentMethod).to(CreditCardPayment);
container.bind<IPaymentMethod>(TYPES.PaymentMethod).to(DebitCardPayment);
container.bind<IPaymentMethod>(TYPES.PaymentMethod).to(PixPayment);
container.bind(TYPES.PaymentMethodRegistry).to(PaymentMethodRegistry).inSingletonScope();

container.bind<NotificationService>(TYPES.NotificationService).to(NotificationService);
container.bind<OrderService>(TYPES.OrderService).to(OrderService);
container.bind<OrderController>(TYPES.OrderController).to(OrderController);