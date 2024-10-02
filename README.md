# Contact Form Service

Provides a contact form backend with support for sending message to Slack and more to be added.

[![Badge OSC](https://img.shields.io/badge/Evaluate-24243B?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8yODIxXzMxNjcyKSIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI3IiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjIiLz4KPGRlZnM%2BCjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl8yODIxXzMxNjcyIiB4MT0iMTIiIHkxPSIwIiB4Mj0iMTIiIHkyPSIyNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjQzE4M0ZGIi8%2BCjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzREQzlGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM%2BCjwvc3ZnPgo%3D)](https://app.osaas.io/browse/birme-contact-form-svc)

## Install

```
npm install
```

## Transports

### Slack

```
TRANSPORT=slack SLACK_BOT_TOKEN=<secret> SLACK_CHANNEL_ID=<channelId> npm start
```

## Docker

```
docker build -t contact-form:dev .
docker run --rm -d \
  -e TRANSPORT=slack \
  -e SLACK_BOT_TOKEN=<secret> \
  -e SLACK_CHANNEL_ID=<secret> \
  -p 8000:8000 contact-form:dev
```

## Example form

```html
<form action="http://localhost:8000/contact" method="POST">
  <label for="fname">First Name</label>
  <input type="text" id="fname" name="firstname" placeholder="Your name.." />

  <label for="lname">Last Name</label>
  <input
    type="text"
    id="lname"
    name="lastname"
    placeholder="Your last name.."
  />

  <label for="email">Email</label>
  <input type="email" id="email" name="email" placeholder="Your email.." />

  <label for="message">Message</label>
  <input type="text" id="message" name="message" />

  <input type="submit" value="Submit" />
</form>
```

### NextUI / React

```javascript
'use client';
import { Input, Textarea } from '@nextui-org/react';

export default function Page() {
  const handleSubmit = (formData: any) => {
    fetch(new URL('http://localhost:8000/contact'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(formData).toString()
    });
  };

  return (
    <form action={handleSubmit}>
      <Input name="firstname" placeholder="First name" />
      <Input name="lastname" placeholder="Last name" />
      <Input name="email" placeholder="Your email" />
      <Textarea
        name="message"
        minRows={8}
        placeholder="Tell us a bit about what you want our help with"
      />
      <Input type="submit" value="Send" />
    </form>
  )
}

```