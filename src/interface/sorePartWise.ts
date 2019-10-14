import { Node } from "../node";

export interface SorePartWise {
    getIdentification(): Object;
    getDefaults(): Object;
    getPartList(): Node[];
}