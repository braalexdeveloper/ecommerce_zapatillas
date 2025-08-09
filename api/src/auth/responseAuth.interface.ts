export interface ResponseAuthInterface{
    id:number;
    email:string;
    role:string;
    name:string;
    client_id:number | string;
    token?:string;
}