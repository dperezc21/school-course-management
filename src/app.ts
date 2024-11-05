import { Request, Response } from "express";
import { ConnectionInterface, TableInterface } from "./interfaces/connectionInterface";

const express = require('express');
const studentRouters = require('./routers/student.router');

const conection: ConnectionInterface = require('./data-base/connection.mysql');
const createTableStudent: TableInterface = require('./data-base/table.student');

conection.connect();
//createTableStudent.createTable(conection.getConection());

const app = express();
app.use(express.json());
app.use("/students", studentRouters);

app.get("/", function (req, res) {
    res.send("Hello World!");
});

app.use((req: Request, res: Response) => {
    res.status(404).send("no encontrado");
})

app.listen(3000, () => {
    console.log("http://localhost:3000");
});

