import { customApiErrors } from "./custom-api-errors.js";

export class unauthorizedAccess extends customApiErrors {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}
