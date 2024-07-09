import db from "../database"
import { Item } from "../entities/Item"

export class ItemMapper {
    getItem(itemId:string){
        return new Promise((resolve, rejected)=>{
            db.get(`SELECT * FROM items WHERE id = ? `, [itemId], (err:any, row: any)=>{
                if(err){
                    return rejected(err)
                }

                resolve(row ? new Item({id: row.id, name: row.name}) : null)
            })
        })
    }

    async getAmount(itemId: string, table: string): Promise<number|null>{
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM ${table} WHERE itemId = ?`, [itemId], (err:any, row: any) => {
                if (err) {
                    return reject(err);
                }
                const amount = row.amount
                resolve(row ?  amount : null)
            });
        });
    }

    async updateItems(itemId:string, amount: number, table: string){
        return new Promise((resolve, reject)=>{
            db.run(`UPDATE ${table} SET amount = ? WHERE itemId = ?`, [amount, itemId], (err:any, row: any)=>{
                if(err){
                    return reject(err)
                }
            })
        })
    }

    async deleteItems(userId: string){
        return new Promise((resolve, reject)=>{
            db.run(`DELETE FROM userCart WHERE userId = ? `, [userId],
                (err)=>{
                    if(err){
                        return reject(err)
                    }
                }
            )
        })
    }

    async inserItem(userId:string, itemId: string,amount: number ){
        return new Promise((resolve, reject)=>{
            db.run(`INSERT INTO userCart (userId, itemId, amount) VALUES (?, ?, ?)`, [userId, itemId, amount], 
                (err)=>{
                    if(err){
                        return reject(err)
                    }
                }
            )
        })
    }
}