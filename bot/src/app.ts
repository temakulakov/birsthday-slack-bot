//@ts-ignore
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import GetJsonService from "./get-json-service";
//@ts-ignore
import {App}  from "@slack/bolt";

dotenv.config();

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});
//@ts-ignore
app.command('/start', async ({command, ack, say}) => {
    await ack();
    
    await say("Hello world!");
})

(async () => {
    await GetJsonService.start();
    await app.start(process.env.PORT || 3000);
    console.log('Bot currently started');
})();