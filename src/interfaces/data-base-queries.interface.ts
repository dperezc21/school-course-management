
export interface DataBaseQueriesInterface {
    getAll(tableName: string): string;
    getById(tableName: string, columns: string): string;
}