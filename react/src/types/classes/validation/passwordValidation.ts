import ErrorState from "@/types/interfaces/validation/errorState";
import errors from "../../constants/errors/errors";
import ErrorSetter from "./valid";

export default class PasswordValidation {
  validate = (password: string): ErrorState | null => {
    let error: ErrorState | null = null;
    const english = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const setter = new ErrorSetter();
    if (!password) {
      error = setter.setError(errors.emptyField);
    }

    if (!english.test(password)) error = setter.setError(errors.pattern);

    if (error) {
      return error;
    }
    return null;
  };
}
