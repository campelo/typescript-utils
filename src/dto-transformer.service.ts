import { JsonPatchOperation } from "./json-patch-operation";

export class DtoTransformerService {

  public transformDtoToPatchOperation (dto: any, exploreNested = false): JsonPatchOperation[]{
    const result: JsonPatchOperation[] = [];
    this.traverseObject(result, dto, "", exploreNested);
    return result;
  }

  public traverseObject(currentPatch: JsonPatchOperation[], obj: Record<string, any>, path: string, exploreNested: boolean){
    for (const key in obj){
      if (obj.hasOwnProperty(key)){
        const value = obj[key];
        const fullPath = path === "" ? `/${key}` : `${path}/${key}`;

        if (typeof value === "object" && exploreNested){
          this.traverseObject(currentPatch, value, fullPath, exploreNested);
        }else{
          currentPatch.push({
            op: "replace",
            path: fullPath,
            value: value
          });
        }
      }
    }
  }
}