import { Transporter } from './factory';

export class DummyTransporter implements Transporter {
  async send(body) {
    console.log(body);
  }
}
