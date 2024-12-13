export const calculateWaterIntake = (age: number, weight: number): number => {
    if (age <= 0 || weight <= 0) {
      throw new Error("Idade e peso devem ser maiores que zero.");
    }
  
    let mlPerKg: number;
  
    if (age <= 17) {
      mlPerKg = 40;
    } else if (age <= 55) {
      mlPerKg = 35;
    } else if (age <= 65) {
      mlPerKg = 30;
    } else {
      mlPerKg = 25;
    }
  
    return weight * mlPerKg; // Retorna o total em ml
  };
  