import { customApiErrors } from "./custom-api-errors.js";
export class badAuth extends customApiErrors {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
