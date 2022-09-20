// @ts-ignore
import {createClient} from "redis";
import Chance from 'chance';
import DirectorModel from "../models/director-model";
import EmployeeModel from "../models/employee-model";
import {forEach} from "lodash";

export default new class JsonService {
    async generate(countDir: Number = 3, countEmp: Number = 4) {
        const client =  createClient();
        client.on('error', (err: String) => console.log('Redis Client Error', err));
        await client.connect();

        const chance = Chance();
        for (let i = 0; i < countDir; i++) {
            const director = new DirectorModel(`${chance.first({ nationality: 'it' })}@foxford.ru`, {})
            for (let j = 0; j < countEmp; j++) {
                const name: string = chance.name();
                // @ts-ignore
                director.sotrudniki[`sotrudnik${j + 1}`] = new EmployeeModel(name,
                    `${name.split(" ")[1].toLowerCase()}.${name.split(" ")[0][0].toLowerCase()}@foxford.ru`,
                    chance.birthday({string: true, american: false}).toString().replace(/\//g, "."));
            }
            await client.set(`${director.rukovoditel}`, `${JSON.stringify(director)}`);
        }
        return {message: "Successful"}
    }
    async getJson(director: Array<String>) {

        const client = createClient();
        client.on('error', (err: String) => console.log('Redis Client Error', err));
        await client.connect();
        let answer: Array<Object> = [];
        let value: string | null;

        for (let i = 0; i < director.length; i++) {
            director[i].endsWith('@foxford.ru') ? value = await client.get(`${director[i]}`) : value = await client.get(`${director[i]}@foxford.ru`);
            value ? value = JSON.parse(value) : value = `Didn't find director ${director[i]}`;
            //@ts-ignore
            answer.push(value);
        }

        return answer;
    }
}

