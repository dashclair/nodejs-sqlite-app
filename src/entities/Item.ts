import { ItemDTO } from "../dto/ItemDTO";

export class Item {
    public id: string;
    public name: string;
    public amount: number;
    
    constructor(itemDTO: ItemDTO){
        const {id, name} = itemDTO
        this.id = id;
        this.name = name;
        this.amount = 0
    }

    setItemsAmount(amount: number){
        return this.amount = amount
    }
}