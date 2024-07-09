import { DatabaseGateway } from "../DatabaseGateway";
import { Item } from "../entities/Item";

export class ItemRepository {
    private _db: DatabaseGateway
    constructor(db: DatabaseGateway){
        this._db = db
    }
    async getItemById(itemId:string):Promise<Item|null>{
        try {
            const item = await this._db.findById<Item>('items', itemId)
            return item
        }catch(err) {
            throw new Error('Error')
        }
    }

    async getCart(userId: string){
        try {
            await this._db.findById<number>('userCart', userId)
        }catch(err){
            throw new Error('Error')
        }
    }
    
    async getWarehouseAmount(itemId: string): Promise<number|null>{
        try {
            const item = await this._db.findById<number>('warehouse', itemId)
            return item
        }catch(err){
            throw new Error('Error')
        }
    }

    async updateWarehouseItems(itemId:string, amount: number){
        try {
            await this._db.update('warehouse', itemId, amount)
        }catch(err){
            throw new Error('Error in set warehouse items method')
        }
    }

    async getReservedAmount(itemId: string): Promise<number|null>{
        try {
            const item = await this._db.findById<number>('reservedItems', itemId)
            return item
        }catch(err){
            throw new Error('Error')
        }
    }

    async updateReservedItems(itemId: string, amount: number){
        this._db.beginWork()
        try {
            await this._db.update('reservedItems', itemId, amount, )
        }catch(err){
            throw new Error('Error in set warehouse items method')
        }

        this._db.commitTransaction()
    }
}