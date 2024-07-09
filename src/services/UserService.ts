import { Item } from "../entities/Item"
import { User } from "../entities/User"
import { ItemRepository } from "../repository/ItemRepository"
import { UserRepository } from "../repository/UserRepository"

class UserService {
    private _userRepo: UserRepository
    private _itemRepo: ItemRepository
    
    constructor(itemRepo: ItemRepository, userRepo: UserRepository){
        this._itemRepo = itemRepo
        this._userRepo = userRepo
    }
    async addToCart(userId: string, itemId: string, amount: number) {
        try {
            const user = await this._userRepo.findById(userId) as User
            const warehouseAmount = await this._itemRepo.getWarehouseAmount(itemId) as number
            const resevedAmount = await this._itemRepo.getReservedAmount(itemId) as number
    
            const totalAmount = warehouseAmount - resevedAmount
            
            if(totalAmount > amount) {
                const item = await this._itemRepo.getItemById(itemId) as Item
                item.setItemsAmount(amount)
                user.addToCart(item)
                await this._itemRepo.updateReservedItems(itemId, resevedAmount + amount)
                this._userRepo.save(user)
            }
    
        }catch(err){
            throw new Error('An error occurred')
        }
    }

    async buyCart(userId: string){
        try {
            const user = await this._userRepo.findById(userId) as User;
            const cart = user.getCart();
    
            for (const item of cart) {
                const reservedItems = await this._itemRepo.getReservedAmount(item.id) as number;
                
                await this._itemRepo.updateReservedItems(item.id, reservedItems - item.amount);
                
                const warehouseItems = await this._itemRepo.getWarehouseAmount(item.id) as number;
                await this._itemRepo.updateWarehouseItems(item.id, warehouseItems - item.amount);
            }
    
            user.clearCart();
            await this._userRepo.save(user);
        } catch (err) {
            console.error(err);
            throw new Error('An error occurred');
        }
    }
}