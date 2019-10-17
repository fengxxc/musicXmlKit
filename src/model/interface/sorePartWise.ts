import { Node } from "../node";

export interface SorePartWise {
    Identification(): Node;
    Defaults(): Node;
    PartList(): Node[];
    Part(): Node[];
}