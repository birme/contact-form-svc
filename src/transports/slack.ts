import { WebClient } from '@slack/web-api';
import { FormBody, Transporter } from './factory';

function formatMessage(message: string) {
  return `[contact-form @ ${new Date().toLocaleString('sv-SE')}] ${message}`;
}

export class SlackTransporter implements Transporter {
  private client: WebClient;

  constructor() {
    this.client = new WebClient(process.env.SLACK_BOT_TOKEN);
  }

  async send(body: FormBody) {
    if (!this.client) {
      return;
    }
    if (!process.env.SLACK_CHANNEL_ID) {
      console.log('No Slack channel ID provided');
      return;
    }
    await this.client.chat.postMessage({
      text: formatMessage(
        `${body.firstname} ${body.lastname} <${body.email}>: ${body.message}`
      ),
      channel: process.env.SLACK_CHANNEL_ID
    });
  }
}
