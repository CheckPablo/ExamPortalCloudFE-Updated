import { EntityBase } from "./entityBase";
import { Test } from "./test";

export interface UploadedSourceDocument extends EntityBase {
    id: number;
    testId: number | null;
    fileName: string | null;
    testDocument: string | null;
    dateModified: string | null;
    filePath: string | null;
    test: Test | null;
    sourceDocBase64: string | null; 
}