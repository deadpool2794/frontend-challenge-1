const parseNumber = (value: string | undefined): number | undefined => {
  if (value === undefined || value.trim() === "") return undefined;
  const num = parseFloat(value);
  return isNaN(num) ? undefined : num;
};

export default parseNumber;
