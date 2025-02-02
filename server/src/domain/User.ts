export class User {
    constructor(
        public id: string | null,
        public name:string,
        public email:string,
        public password:string,
    ){}
    isValidEmail():boolean{
        return /\S+@\S+\.\S+/.test(this.email)
    }
}