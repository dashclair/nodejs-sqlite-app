export class UserDTO {
    public id: string
    public login: string
    public name: string

    constructor(data: any){
        const { id, name, login } = data
        if(login && id && name) {
            this.login= data.login
            this.id = data.id
            this.name = data.name
        } else {
            throw new Error()
        }
    }
}