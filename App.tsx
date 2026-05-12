import React, { useState } from 'react';
import { View } from 'react-native';
import LockScreen from './src/screens/LockScreen';
import AccelScreen from './src/screens/AccelScreen';
import HomeScreen from './src/screens/HomeScreen';

// ============================================
// 🎬 COMPOSANT PRINCIPAL (BINÔME 04)
// ============================================
// App est le point d'entrée principal de l'application
// C'est ici qu'on gère la NAVIGATION entre les écrans
// En fonction de l'état 'screen', on affiche un écran différent
//
// Les états possibles:
//   - 'lock'  = Écran de verrouillage (LockScreen)
//   - 'home'  = Écran d'accueil (HomeScreen)
//   - 'accel' = Écran accéléromètre (AccelScreen)

export default function App() {
  // ============================================
  // ÉTAT: Quel écran afficher?
  // ============================================
  // Au démarrage, on affiche 'lock' (l'app est verrouillée par défaut)
  const [screen, setScreen] = useState<'lock' | 'home' | 'accel'>('lock');

  // ============================================
  // FONCTION 1: Déverrouiller et aller à l'accueil
  // ============================================
  // Appelée quand:
  //   - Biométrie réussit (BINÔME 01)
  //   - Accéléromètre atteint le nombre de secousses (BINÔME 02)
  const handleUnlock = () => {
    // Changer l'écran pour 'home'
    setScreen('home');
    console.log('✅ Navigation vers HomeScreen');
  };

  // ============================================
  // FONCTION 2: Aller à l'écran accéléromètre
  // ============================================
  // Appelée quand l'utilisateur clique "Secouer" sur LockScreen
  const handleAccel = () => {
    // Changer l'écran pour 'accel'
    setScreen('accel');
    console.log('📱 Navigation vers AccelScreen');
  };

  // ============================================
  // FONCTION 3: Reverrouiller et revenir à LockScreen
  // ============================================
  // Appelée quand:
  //   - L'utilisateur clique "Verrouiller" (HomeScreen)
  //   - L'utilisateur clique "Retour" (AccelScreen)
  const handleLock = () => {
    // Changer l'écran pour 'lock'
    setScreen('lock');
    console.log('🔒 Navigation vers LockScreen');
  };

  // ============================================
  // RENDU: Afficher l'écran approprié
  // ============================================
  return (
    <View style={{ flex: 1 }}>
      {/* SI screen === 'lock', afficher LockScreen */}
      {screen === 'lock' && (
        <LockScreen 
          onBio={handleUnlock}
          onAccel={handleAccel}
        />
      )}

      {/* SI screen === 'accel', afficher AccelScreen */}
      {screen === 'accel' && (
        <AccelScreen 
          onSuccess={handleUnlock}
          onBack={handleLock}
        />
      )}

      {/* SI screen === 'home', afficher HomeScreen */}
      {screen === 'home' && (
        <HomeScreen 
          onLock={handleLock}
        />
      )}
    </View>
  );
}
