const StringIsNumber = (value: number | string): boolean => Number.isNaN(Number(value)) === false;

export default StringIsNumber;
