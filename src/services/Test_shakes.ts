/**
 * Calcule le nombre de secousses requis selon la formule : (d * d) mod 5
 * @param dayIndex - L'index du jour (0 pour Dimanche, 6 pour Samedi)
 */
const calculateRequiredShakes = (dayIndex: number): number => {
  return (dayIndex * dayIndex) % 5;
};

const daysOfWeek: string[] = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi"
];

console.log("--- Test de la logique de déverrouillage ---");
console.log("Formule : (jour * jour) mod 5\n");

daysOfWeek.forEach((dayName, index) => {
  const result = calculateRequiredShakes(index);
  
  // Formatage pour l'affichage
  const formulaStr = `(${index} * ${index}) % 5`.padEnd(15);
  console.log(`${dayName.padEnd(10)} : ${formulaStr} => ${result} secousse(s)`);
});
