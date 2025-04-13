export class ValidationError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ValidationError.prototype);

    this.code = code;
  }

  getCode() {
    return this.code;
  }
}
