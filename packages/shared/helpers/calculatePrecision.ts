export const calculatePrecision = (precisionBits: number): null | number => {
  // Base case at 19 bits has a precision of 45 meters
  const basePrecisionBits = 19;
  const basePrecisionMeters = 45;

  if (precisionBits <= 0) {
    return null; // No precision at all
  } else if (precisionBits >= 32) {
    return 0; // Full precision
  }

  // Calculate the difference from the base and halve precision for each additional bit
  const difference = precisionBits - basePrecisionBits;
  return basePrecisionMeters / Math.pow(2, difference);
};
