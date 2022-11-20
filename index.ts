import * as express from "express";
import {todoRouter} from "./routers/todo";
import {homeRouter} from "./routers/homepage";
import {handleError} from "./error/handleError";
import {json} from "express";

const app = express();
app.use(json());
app.use('/todo', todoRouter);
app.use('/', homeRouter);

app.use(handleError);

app.listen(3000,'localhost')