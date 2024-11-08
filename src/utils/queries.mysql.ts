

export class QueriesMysql {
    static getAll(tableName: string): string {
        return `SELECT * FROM ${tableName}`;
    }
}