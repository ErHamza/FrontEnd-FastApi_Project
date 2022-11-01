export class User{
    constructor( public email: string, public name:string, 
        private _token : string , private _experation_date:Date ){}
        now= new Date();

        get token(){
            if (!this._experation_date || this.now > this._experation_date){
                return null
            }
            return this._token
        }
}