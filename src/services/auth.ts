// ============================================
// 🔐 LES 3 FONCTIONS ESSENTIELLES DE L'APP
// ============================================
// Ce fichier contient tout ce qui est nécessaire pour verrouiller/déverrouiller l'app
// Les autres binômes vont utiliser ces fonctions!

// Variable globale: dit si l'app est verrouillée ou pas
let isLocked = true;

// ============================================
// 1️⃣ LA BIOMÉTRIE (Empreinte digitale)
// ============================================
// Cette fonction simule l'authentification par empreinte digitale
// En production, ça se connecterait à la vraie biométrie du téléphone
// Pour l'école, on simule juste que ça fonctionne toujours ✅
export async function authenticateBiometric(): Promise<boolean> {
  console.log('✅ Biométrie OK - L\'utilisateur a scanné son doigt');
  return true; // true = succès, false = échoué
}

// ============================================
// 2️⃣ LA FORMULE DU JOUR: (jour)² mod 5
// ============================================
// Cette fonction calcule combien de secousses sont nécessaires selon le jour
// Exemple:
//   Lundi (1)    → (1*1) % 5 = 1 secousse
//   Mardi (2)    → (2*2) % 5 = 4 secousses
//   Mercredi (3) → (3*3) % 5 = 4 secousses
//   Jeudi (4)    → (4*4) % 5 = 1 secousse
//   Vendredi (5) → (5*5) % 5 = 0 secousses (spécial! pas besoin de secouer)
//   Samedi (6)   → (6*6) % 5 = 1 secousse
//   Dimanche (7) → (7*7) % 5 = 4 secousses
export function calculateShakesNeeded(date = new Date()): number {
  // getDay() retourne: 0=dimanche, 1=lundi, 2=mardi... 6=samedi
  let day = date.getDay();
  
  // On fait que dimanche = 7 pour que la formule fonctionne bien
  if (day === 0) day = 7;
  
  // La formule magique: (jour*jour) mod 5
  const shakes = (day * day) % 5;
  
  console.log(`📱 Jour ${day} → ${shakes} secousses requises`);
  return shakes; // Retourne le nombre de secousses
}

// ============================================
// 3️⃣ L'ÉTAT DE L'APP: Verrouillée ou Déverrouillée?
// ============================================
// Ces 3 fonctions gèrent l'état général de verrouillage

// Vérifie si l'app est verrouillée
export function isAppLocked(): boolean {
  return isLocked;
}

// Déverrouille l'app (après succès de biométrie ou secousses)
export function unlockApp(): void {
  isLocked = false;
  console.log('🔓 L\'app est maintenant DÉVERROUILLÉE');
}

// Reverrouille l'app (quand l'utilisateur clique "verrouiller")
export function lockApp(): void {
  isLocked = true;
  console.log('🔒 L\'app est maintenant VERROUILLÉE');
}
