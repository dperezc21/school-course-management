

export class QueriesMysql {
    static getAll(tableName: string): string {
        return `SELECT * FROM ${tableName}`;
    }

    static getById(tableName: string, id: string, columns: string = "*"): string {
        return `SELECT ${columns} FROM ${tableName} WHERE id='${id}'`;
    }
}