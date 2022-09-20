import {NextFunction, Request, Response} from "express";
import JsonService from "../services/json-service";

export default new class JsonController {

    async generatejson(req: Request, res: Response, next: NextFunction) {
        try {
            let numDir: Number = + req.body.numDir;
            let numEmp: Number = + req.body.numEmp;
            const fill = await JsonService.generate(numDir, numEmp);
            res.json(fill);
        } catch (err) {
            next(err);
        }
    }
    async getjson(req: Request, res: Response, next: NextFunction) {
        try {
            let fill: Array<Object>;
            req.body?.director ? fill = await JsonService.getJson(req.body.director) : fill = await JsonService.getJson(["Undefined"]);
            console.log(fill);
            res.json(fill);
        } catch (err) {
            next(err);
        }
    }
}