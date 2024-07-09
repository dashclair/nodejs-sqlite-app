export class ItemDTO {
    public id: string
    public name: string

    constructor(data: any){
        const { id, name } = data
        if(id && name) {
            this.id = data.id
            this.name = data.name
        } else {
            throw new Error()
        }
    }
}