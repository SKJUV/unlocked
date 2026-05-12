import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Vibration, NativeModules, DeviceEventEmitter } from 'react-native';
import { calculateShakesNeeded, unlockApp } from '../services/auth';

// ============================================
// 📱 ÉCRAN ACCÉLÉROMÈTRE (BINÔME 02)
// ============================================
// ... (rest of comments unchanged)

export default function AccelScreen({ onSuccess, onBack }: any) {
  // ============================================
  // ÉTATS
  // ============================================
  const [shakeCount, setShakeCount] = useState(0);
  const [required, setRequired] = useState(0);
  const [success, setSuccess] = useState(false);

  // ÉTAPE 1: Calculer combien de secousses sont nécessaires
  useEffect(() => {
    const req = calculateShakesNeeded();
    setRequired(req);
  }, []);

  // ÉTAPE 2: ÉCOUTER LE CAPTEUR D'ACCÉLÉRATION
  useEffect(() => {
    if (success) return;

    const sensorModule = NativeModules.RNSensorsAccelerometer;
    if (!sensorModule) {
      console.error('❌ Module RNSensorsAccelerometer non trouvé');
      return;
    }

    // Configurer et démarrer le capteur manuellement
    console.log('⏳ Démarrage manuel du capteur...');
    sensorModule.setUpdateInterval(50);
    sensorModule.startUpdates();

    // Écouter via DeviceEventEmitter (plus robuste que NativeEventEmitter sur New Arch)
    const subscription = DeviceEventEmitter.addListener('RNSensorsAccelerometer', (data: any) => {
      const { x, y, z } = data;
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      

      // Seuil de détection (15 = mouvement volontaire)
      if (magnitude > 15) {
        Vibration.vibrate(100);
        setShakeCount(prev => {
          const newCount = prev + 1;
          if (newCount >= required) {
            setSuccess(true);
            unlockApp();
            setTimeout(() => onSuccess?.(), 800);
          }
          return newCount;
        });
      }
    });

    return () => {
      console.log('⏹️ Arrêt du capteur');
      sensorModule.stopUpdates();
      subscription.remove();
    };
  }, [required, onSuccess, success]);

  // ============================================
  // CAS SPÉCIAL: VENDREDI (0 secousses)
  // ============================================
  // Si le jour de la semaine donne 0 secousses (vendredi),
  // il n'y a pas besoin de secouer. L'utilisateur clique juste un bouton.
  if (required === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>📱 Vendredi!</Text>
        <Text style={styles.info}>0 secousses requises 😎</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => {
            unlockApp();
            onSuccess?.();
          }}
        >
          <Text style={styles.buttonText}>✅ Déverrouiller</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ============================================
  // AFFICHAGE NORMAL: Compter les secousses
  // ============================================
  return (
    <View style={styles.container}>
      {/* TITRE */}
      <Text style={styles.title}>📱 Secouez!</Text>
      
      {/* COMPTEUR: "2/4" par exemple */}
      <Text style={styles.count}>{shakeCount}/{required}</Text>
      
      {/* MESSAGE DE SUCCÈS si atteint */}
      {success && <Text style={styles.success}>✅ Déverrouillé!</Text>}
      
      {/* BOUTON RÉINITIALISER: recommencer à zéro */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => { 
          setShakeCount(0); 
          setSuccess(false); 
        }}
      >
        <Text style={styles.buttonText}>🔄 Réinitialiser</Text>
      </TouchableOpacity>
      
      {/* BOUTON RETOUR: annuler et revenir à l'écran de verrouillage */}
      <TouchableOpacity style={[styles.button, styles.back]} onPress={onBack}>
        <Text style={styles.buttonText}>← Retour</Text>
      </TouchableOpacity>
    </View>
  );
}

// ============================================
// STYLES
// ============================================
const styles = StyleSheet.create({
  // Container: le fond blanc qui remplit tout
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 20, 
    backgroundColor: '#fff' 
  },
  
  // Titre "📱 Secouez!"
  title: { 
    fontSize: 28, 
    fontWeight: 'bold' 
  },
  
  // Compteur "2/4"
  count: { 
    fontSize: 40, // Grande taille pour bien voir
    fontWeight: 'bold', 
    color: '#007AFF' // Bleu
  },
  
  // Info générale
  info: { 
    fontSize: 16 
  },
  
  // Message de succès "✅ Déverrouillé!"
  success: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: 'green' // Vert pour succès
  },
  
  // Boutons
  button: { 
    backgroundColor: '#007AFF', 
    padding: 15, 
    borderRadius: 8, 
    width: 220, 
    alignItems: 'center' 
  },
  
  // Bouton "Retour" en gris au lieu de bleu
  back: { 
    backgroundColor: '#666' 
  },
  
  // Texte des boutons
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  }
});
