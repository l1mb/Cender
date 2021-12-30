const detectCallbackByType = (parameter: string, type: string): string | number | Date => {
  switch (type) {
    case "text":
      return parameter;
    case "number": {
      return Number(parameter);
    }
    case "datetime-local": {
      return parameter as unknown as Date;
    }

    default:
      return parameter;
  }
};

export default detectCallbackByType;
