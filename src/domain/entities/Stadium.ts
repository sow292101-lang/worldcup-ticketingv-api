import { City } from "./City"
export class Stadium {
    id:number
    name:string
    capacity:number
    city:City
    constructor(i: number, n: string, c: number, ci : City){
   this.capacity = c
   this.city = ci 
   this.id = i 
   this.name = n 
    if (this.capacity<= 0){
        throw new Error("la capacite dois etre superieur a 0 ")
    }
    }
    

}