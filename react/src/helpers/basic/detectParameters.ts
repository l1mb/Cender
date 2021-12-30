const detectParameterType = (param: string): string => {
  switch (param.toLowerCase()) {
    case "count":
      return "number";
    case "price":
      return "number";
    case "totalrating":
      return "number";

    case "publicationdate": {
      return "datetime-local";
    }
    default:
      return "text";
  }
};

export default detectParameterType;
