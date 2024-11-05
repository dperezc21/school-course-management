export interface ConectionInterface {
    dataBaseName: string;
    useDataBase(): void;
    createDataBase(): void;
    conect(): void;
    getConection(): any;
}

export interface TableInterface {
    tableName: string;
    createTable(conection: any): void;
}