import { UserDTO } from "../dto/UserDTO";
import { Item } from "./Item";

export class User {
  public id: string;
  public name: string;
  public login: string;
  private _cart: Item[];
  
  constructor(userDTO: UserDTO) {
    const {id, name, login} =  userDTO;
    this.id = id;
    this.name = name;
    this.login = login;
    this._cart = []
  }

  getCart() {
    return this._cart;
  }

  setCart(cart: Item[]) {
    this._cart = cart;
  }

  addToCart(item: Item) {
    this._cart.push(item);
  }

  clearCart() {
    this._cart = [];
  }
}
