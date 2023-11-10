import { Snippet } from "./snippet";

export interface Cours {
    id : string;
    title : string ;
    description : string;
    snippets : Snippet[]
}

