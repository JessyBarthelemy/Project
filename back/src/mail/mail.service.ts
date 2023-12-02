import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email: string, url: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Demande de changement de mot de passe',
      template: './reset_password',
      context: {
        url,
      },
    });
  }
}
