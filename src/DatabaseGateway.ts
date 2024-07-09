import db from "./database";

interface IDatabase {
  beginWork(): any;
  findById(table: string, id: string): any;
  insert(table: string, userId: string, itemId: string, amount: number): any;
  delete(table: string, item: any): any;
  commitTransaction(): any;
}

export class DatabaseGateway implements IDatabase {
  private _db: typeof db;

  constructor(db:typeof db ) {
    this._db = db;
  }

  beginWork() {
    db.run(`BEGIN TRANSACTION`);
  }

  findById<T>(table: string, id: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this._db.run(
        `SELECT * FROM ${table} WHERE id = ? `,
        [id],
        (err: any, row: any) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(row);
          }
        }
      );
    });
  }

  insert(table: string, userId: string, itemId: string, amount: number) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `INSERT INTO ${table} (userId, itemId, amount) VALUES (?, ?, ?)`,
        [userId, itemId, amount],
        (err: any) => {
          if (err) {
            return reject(err);
          }
        }
      );
    });
  }

  update(table: string, itemId: string, amount: number) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE ${table} SET amount = ? WHERE itemId = ?`,
        [amount, itemId],
        (err: any) => {
          if (err) {
            return reject(err);
          }
        }
      );
    });
  }

  delete(table: string, id: string) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `DELETE FROM ${table} WHERE userId = ? `,
        [id],
        (err: any) => {
          if (err) {
            return reject(err);
          }
        }
      );
    });
  }

  commitTransaction() {
    this._db.run(`COMMIT`);
  }
}
