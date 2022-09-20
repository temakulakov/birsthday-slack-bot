import express from "express";
import config from "config";
import router from "./router/index";
import cors from 'cors';
// @ts-ignore
import cookieParser from 'cookie-parser';
// @ts-ignore
import { createClient } from "redis";

const PORT = config.get("port") as number;
const HOST = config.get("host") as string;

const app = express();

// Parses incoming requests with JSON payloads
app.use(express.json());
app.use(cors({
        credentials: true,
        origin: process.env.CLIENT_URL
}))
app.use(cookieParser())
app.use('/api', router);
app.use(express.urlencoded({ extended: false }  ));

const start = async () => {
        try {
                const client = createClient();
                client.on('error', (err: string) => console.log('Redis Client Error', err));
                await client.connect();
                app.listen(PORT, ()=> {
                        console.log(`Server has been started on PORT = ${PORT}`)
                })
        } catch (err) {
                console.log(err)
        }
}
start()

