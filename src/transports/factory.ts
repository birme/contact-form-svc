import { DummyTransporter } from './dummy';
import { SlackTransporter } from './slack';

export type Transport = 'dummy' | 'slack';

export interface FormBody {
  firstname: string;
  lastname: string;
  email: string;
  message: string;
}

export interface Transporter {
  send(body: FormBody): Promise<void>;
}

export function create(transport: Transport) {
  switch (transport) {
    case 'dummy':
      return new DummyTransporter();
    case 'slack':
      return new SlackTransporter();
    default:
      throw new Error(`Unknown transport: ${transport}`);
  }
}
