export const calculateWaterGoal = (birthDate: Date, weight: number): number => {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const weightInKg = parseFloat(weight.toString());

  let waterPerKg = 0;

  if (age <= 17) {
    waterPerKg = 40;
  } else if (age >= 18 && age <= 55) {
    waterPerKg = 35;
  } else if (age > 55 && age <= 65) {
    waterPerKg = 30;
  } else if (age > 65) {
    waterPerKg = 25;
  }

  return weightInKg * waterPerKg; // Resultado em ml
};
