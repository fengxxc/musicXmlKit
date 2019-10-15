import { Node } from "../node";

export interface SorePartWise {
    getIdentification(): Node;
    getDefaults(): Node;
    getPartList(): Node[];
    getPart(): Node[];
}