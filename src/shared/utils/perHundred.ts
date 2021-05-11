const perHundred = (value: number, weight: number): string => {
  const result = (+value / weight) * 100;
  return Number.isNaN(result) ? '0' : result.toString();
};

export default perHundred;
