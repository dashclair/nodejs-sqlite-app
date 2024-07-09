import db from "../database";
import { User } from "../entities/User";

export class UserMapper {
    async getUser(id:string){
        return new Promise((resolve, reject) => {
            db.run(`SELECT * FROM users WHERE id = ?`, [id], (err:any, row: any) => {
                if (err) {
                    return reject(err);
                }
                resolve(row ? new User({id: row.id, login: row.login, name: row.name}) : null)
            });
        });
    }
}