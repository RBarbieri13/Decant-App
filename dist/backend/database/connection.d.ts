import Database from 'better-sqlite3';
export declare function getDatabasePath(): string;
export declare function getDatabase(): Database.Database;
export declare function closeDatabase(): void;
export declare function isDatabaseInitialized(): boolean;
