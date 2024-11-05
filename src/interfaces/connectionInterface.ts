import {Connection} from "mysql";

export interface ConnectionInterface {
    dataBaseName: string;
    useDataBase(): void;
    createDataBase(): void;
    connect(): void;
    getConnection(): Connection;
}

export interface TableInterface {
    tableName: string;
    createTable(connection: Connection): void;
}