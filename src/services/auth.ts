// ============================================
// 🔐 LES 3 FONCTIONS ESSENTIELLES DE L'APP
// ============================================
// Ce fichier contient tout ce qui est nécessaire pour verrouiller/déverrouiller l'app
// Les autres binômes vont utiliser ces fonctions!

// Variable globale: dit si l'app est verrouillée ou pas
let isLocked = true;

import { Alert } from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

// ============================================
// 1️⃣ LA BIOMÉTRIE (Empreinte digitale)
// ============================================
// Cette fonction utilise le capteur réel du téléphone!
export async function authenticateBiometric(): Promise<boolean> {
  try {
    console.log('⏳ Vérification de la disponibilité de la biométrie...');
    
    // 1. Vérifier si la biométrie est disponible sur ce téléphone
    const { available, biometryType } = await rnBiometrics.isSensorAvailable();
    
    if (available && (biometryType === BiometryTypes.Biometrics || biometryType === BiometryTypes.TouchID)) {
      console.log('✅ Capteur d\'empreinte disponible');
    } else if (available && biometryType === BiometryTypes.FaceID) {
      console.log('✅ FaceID disponible');
    } else if (available) {
      console.log(`✅ Biométrie disponible (${biometryType})`);
    } else {
      console.log('❌ Biométrie non disponible sur cet appareil');
      Alert.alert('Erreur', 'La biométrie n\'est pas disponible sur ce téléphone.');
      return false;
    }

    // 2. Demander l'authentification
    const result = await rnBiometrics.simplePrompt({
      promptMessage: 'Scanner votre empreinte pour déverrouiller',
      cancelButtonText: 'Annuler',
    });

    if (result.success) {
      console.log('🔓 Authentification réussie!');
      return true;
    } else {
      console.log('❌ Authentification annulée ou échouée');
      return false;
    }
  } catch (error) {
    console.error('⚠️ Erreur biométrie:', error);
    Alert.alert('Erreur', 'Une erreur est survenue lors de l\'authentification.');
    return false;
  }
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
