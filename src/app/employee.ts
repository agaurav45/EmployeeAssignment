import {Address} from "./address";
import {Company} from "./company";

export class Employee {
    id: number;
    name: string;
    username:string;
    email:string;
    address: Address = new Address();
    phone: string;
    website: string;
    company: Company = new Company();

}