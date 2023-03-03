export class SchemaException extends Error {
  errors: Record<keyof App.Setting, string>;
  constructor(errors: SchemaException['errors']) {
    super();
    this.errors = errors;
    this.name = 'SchemaException';
  }
}
