import ErrorState from "../../interfaces/validation/errorState";
import constants from "../../constants/errors/errors";
import ErrorSetter from "./valid";

export default class EmailValidation {
  validate = (email: string): null | ErrorState => {
    let error: ErrorState | null = null;
    const mailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const setter = new ErrorSetter();
    if (!email) {
      error = setter.setError(constants.emptyField);
    }

    if (!mailPattern.test(email)) error = setter.setError(constants.pattern);

    if (error) {
      return error;
    }
    return null;
  };
}
