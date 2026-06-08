import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { env } from './env';

const db = new Database(env.DATABASE_URL);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

const schema = fs.readFileSync(path.join(__dirname, '../db/schema.sql'), 'utf-8');
db.exec(schema);

export default db;
