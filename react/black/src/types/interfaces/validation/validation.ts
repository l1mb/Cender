import ErrorState from "./errorState";

export interface Validation {
  validate(email: string): boolean | ErrorState;
}
