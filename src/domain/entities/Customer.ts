import { Column } from "typeorm"
export class Customer {
    @Column()
    firstname: string
    @Column()
    lastname: string
    @Column()
    email: string

    constructor(firstname: string, lastname: string, email: string) {
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
    }
}