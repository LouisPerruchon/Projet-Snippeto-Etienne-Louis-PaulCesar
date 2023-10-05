import { Snippets } from "./snippets";

export interface Cours {
    id : number;
    name : string ;
    Date : Date;
    Snippets : Snippets[]
}
