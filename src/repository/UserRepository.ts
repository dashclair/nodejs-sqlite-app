import { DatabaseGateway } from "../DatabaseGateway";
import { UserDTO } from "../dto/UserDTO";
import { User } from "../entities/User";
import { ItemRepository } from "./ItemRepository";

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  save(user: User): Promise<void>;
}

export class UserRepository {
  private _db: DatabaseGateway;
  private _itemRepo: ItemRepository

  constructor(db: DatabaseGateway,itemRepo: ItemRepository ) {
    this._db = db;
    this._itemRepo = itemRepo
  }
  async findById(id: string): Promise<User | void> {
    const data = this._db.findById("users", id);
    const userDTO = new UserDTO(data)
    const userCart = this._itemRepo.getCart(id)
    return data.then((row) =>{
        if(row){
            return new User({ id: row.id, login: row.login, name: row.login })
        }

        return 
    });
  }

  async save(user: User): Promise<void> {
    const userCart = user.getCart();

    this._db.beginWork();

    try {
        await this._db.delete("userCart", user.id);
      } catch (error) {
        console.error(error);
      }

    for (const cartItem of userCart) {
      try {
        await this._db.insert(
          "userCart",
          user.id,
          cartItem.id,
          cartItem.amount
        );
      } catch (err) {
        throw new Error("Error");
      }
    }

    this._db.commitTransaction()
  }
}
