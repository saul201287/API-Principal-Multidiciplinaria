import { ICreateId } from "../../app/services/ICreateId";
import { v4 as uuidv4 } from "uuid";

export class IdServices implements ICreateId {
  asignarId(): string {
    const id = uuidv4();
    return id;
  }
}
