import * as express from "express";
import JSONController from '../controller/json-controller';
// @ts-ignore
import { body } from 'express-validator';

let router = express.Router();

router.post('/generatejson', JSONController.generatejson);
router.post('/getjson', JSONController.getjson);

export default router;