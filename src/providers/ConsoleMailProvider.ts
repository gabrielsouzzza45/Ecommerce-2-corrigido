import { injectable } from 'inversify';
import { IMailProvider, Mail } from './IMailProvider';
import logger from '../lib/logger';

@injectable()
export class ConsoleMailProvider implements IMailProvider {
  async sendMail(mail: Mail): Promise<string | null> {
    logger.info(`[TEST MODE] E-mail simulado para: ${mail.to} | Assunto: ${mail.subject}`);
    return null;
  }
}