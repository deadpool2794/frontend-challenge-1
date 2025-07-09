const getEnumValue = <T extends string>(value: string | undefined, enumValues: T[], dummyValue: T): T => {
  if (value && enumValues.includes(value.toLowerCase() as T)) {
    return value.toLowerCase() as T;
  }
  return dummyValue;
};

export default getEnumValue;
