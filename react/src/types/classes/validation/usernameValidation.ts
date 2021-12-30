import ErrorState from "@/types/interfaces/validation/errorState";
import ErrorSetter from "./valid";
import errors from "../../constants/errors/errors";

export default class UsernameValidation {
  validate = (username: string): ErrorState | null => {
    let error: ErrorState | null = null;
    const setter = new ErrorSetter();
    const english = /^[A-Za-z0-9]*$/;

    if (!username) {
      error = setter.setError(errors.emptyField);
    }

    if (!english.test(username)) error = setter.setError(errors.englishSymbolsOnly);

    if (error) {
      return error;
    }
    return null;
  };
}
