import ErrorState from "@/types/interfaces/validation/errorState";
import errors from "../../constants/errors/errors";
import ErrorSetter from "./valid";

export default class PhoneValidation {
  validate = (phone: string): ErrorState | null => {
    let error: ErrorState | null = null;
    const phoneRegex = /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im;
    const setter = new ErrorSetter();
    if (!phone) {
      error = setter.setError(errors.emptyField);
    }

    if (!phoneRegex.test(phone)) error = setter.setError(errors.pattern);

    if (error) {
      return error;
    }
    return null;
  };
}
