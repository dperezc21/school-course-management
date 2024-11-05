import {Express, Request, Response} from "express";
import { ConnectionInterface } from "./interfaces/connectionInterface";

import {studentRouter} from './routers/student.router';

import express = require('express');
//const studentRouters = require('./routers/student.router');

import connectionMysql = require('./data-base/connection.mysql');
//import createTableStudent = require('./data-base/table.student');

const connection: ConnectionInterface = new connectionMysql.ConnectionMysql();
connection.connect();
//createTableStudent.createTable(conection.getConection());

const app: Express = express();
app.use(express.json());
app.use("/students", studentRouter);

app.get("/", function (req, res) {
    res.send("Hello World!");
});

app.use((req: Request, res: Response) => {
    res.status(404).send("no encontrado");
})

app.listen(3000, () => {
    console.log("http://localhost:3000");
});

