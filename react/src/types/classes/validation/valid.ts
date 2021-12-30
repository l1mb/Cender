import ErrorState from "../../interfaces/validation/errorState";

export default class ErrorSetter {
  setError = (error: string): ErrorState => ({
    errorMessage: error,
  });
}
