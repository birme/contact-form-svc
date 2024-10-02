# Contact Form Service

Provides a contact form backend with support for the following transports:

- Slack

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
  <input type="text" id="fname" name="firstname" placeholder="Your name..">

  <label for="lname">Last Name</label>
  <input type="text" id="lname" name="lastname" placeholder="Your last name..">

  <label for="email">Email</label>
  <input type="email" id="email" name="email" placeholder="Your email..">

  <label for="message">Message</label>
  <input type="text" id="message" name="message">

  <input type="submit" value="Submit">
</form>
```