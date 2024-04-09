import express from "express";
import { router } from "./routes";
import path from "node:path";
import bodyParser from 'body-parser';


const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "..", "public")));

app.use("/api",router);

export { app };