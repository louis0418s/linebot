const express = require('express');
const botsdk = require('@line/bot-sdk')

const app = express();

const port = 3000;

const  config = {
    channelAccessToken: "seROqxfdhppPZklTC12Io8DXqqFrGMjnlElBBqMLXhZ+1VE92nYT2fByAW8wMbq9jhlbeqW1F/FeH5qGsVazilsx9MGmurjJCenvWcCjSp8Rzb73zdEN3mLXaoZrVbMfVzLJu/8irWkhu9pjP593IQdB04t89/1O/w1cDnyilFU=",
    channelSecret: "038d059f80b6d5ce38086e431c9e2dcd"
}
const  client = new botsdk.Client(config)

app.get('/', (req, res) => {
    res.send('哈囉')
})


app.post('/webhook', botsdk.middleware(config), (req, res) => {
    req.body.events.map((event) => {
        console.log(JSON.stringify(event, null, 2))
        if (event.message.type == 'text') {
            client.replyMessage(event.replyToken, { type: 'text', text: event.message.text })
        }
    })
    res.end()
})

app.listen(port, () => {
    console.log('server start')
});