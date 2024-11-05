import { TableInterface } from "../interfaces/connectionInterface";


export class TableStudent implements TableInterface {

    tableName: string = "student";

    createTable(conection: any) {
        let createTable = `create table ${this.tableName} (id VARCHAR(225), first_name VARCHAR(50), last_name VARCHAR(50), career VARCHAR(50), image_url blob)`;
        conection.query(createTable, (err) => {
            if(err) throw err;
            console.log(`tabla ${this.tableName} creada`);
        })
    }

}

module.exports = new TableStudent;