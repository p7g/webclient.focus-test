const bodyparser = require("body-parser");
const express = require("express");
const webpush = require("web-push");

const keys = webpush.generateVAPIDKeys();
webpush.setVapidDetails("mailto:", keys.publicKey, keys.privateKey);

express()
  .use(express.static("static"), bodyparser.json())
  .get("/key", (_req, res) => res.send(keys.publicKey))
  .post("/sendNotification", (req, res) =>
    setTimeout(
      () =>
        webpush
          .sendNotification(req.body.subscription, null)
          .then(() => res.sendStatus(201))
          .catch((error) => {
            res.sendStatus(500);
            console.error(error);
          }),
      req.body.delay
    )
  )
  .listen(8080);
