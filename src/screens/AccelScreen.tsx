import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Vibration } from 'react-native';
import { accelerometer } from 'react-native-sensors';
import { calculateShakesNeeded } from '../services/auth';

// ============================================
// 📱 ÉCRAN ACCÉLÉROMÈTRE (BINÔME 02)
// ============================================
// Cet écran s'affiche quand l'utilisateur clique "Secouer"
// On écoute le capteur d'accélération du téléphone
// Chaque secousse = 1 vibration + compteur +1
// Quand le compteur atteint le nombre requis du jour → DÉVERROUILLÉ!
//
// Props reçues:
//   - onSuccess: fonction appelée quand assez de secousses sont détectées
//   - onBack: fonction appelée pour retourner à l'écran de verrouillage

export default function AccelScreen({ onSuccess, onBack }: any) {
  // ============================================
  // ÉTATS
  // ============================================
  // Nombre de secousses détectées jusqu'à présent
  const [shakeCount, setShakeCount] = useState(0);
  
  // Nombre de secousses REQUISES (selon la formule du jour)
  const [required, setRequired] = useState(0);
  
  // true si on a atteint le nombre de secousses requis
  const [success, setSuccess] = useState(false);

  // ============================================
  // ÉTAPE 1: Calculer combien de secousses sont nécessaires
  // ============================================
  useEffect(() => {
    // Récupérer le jour d'aujourd'hui (0=dimanche, 1=lundi...)
    const day = new Date().getDay() || 7;
    
    // Appliquer la formule: (jour)² mod 5
    const req = (day * day) % 5;
    
    // Sauvegarder le nombre requis
    setRequired(req);
  }, []); // [] = s'exécute UNE FOIS au montage

  // ============================================
  // ÉTAPE 2: ÉCOUTER LE CAPTEUR D'ACCÉLÉRATION
  // ============================================
  useEffect(() => {
    // Timestamp de la dernière secousse détectée
    let lastTime = 0;
    
    // S'abonner aux données de l'accéléromètre
    const subscription = accelerometer.subscribe(({ x, y, z }: any) => {
      // Calculer la magnitude (force) de la secousse
      // C'est la racine carrée de (x² + y² + z²)
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      
      // ============================================
      // DÉTECTION: Est-ce vraiment une secousse?
      // ============================================
      // Si magnitude > 3, c'est une secousse assez forte
      if (magnitude > 3) {
        // Récupérer l'heure actuelle
        const now = Date.now();
        
        // Ignorer les secousses trop rapprochées (moins de 300ms)
        // Sinon on compterait plusieurs fois la même secousse
        if (now - lastTime > 300) {
          // ✅ C'est une vraie secousse!
          
          // 1. Faire vibrer le téléphone (retour haptique)
          Vibration.vibrate(100);
          
          // 2. Incrémenter le compteur
          setShakeCount(prev => {
            const newCount = prev + 1;
            
            // 3. Vérifier si on a atteint le nombre requis
            if (newCount >= required) {
              setSuccess(true);
              onSuccess?.(); // Déverrouiller l'app
            }
            
            return newCount;
          });
          
          // 4. Mettre à jour le timestamp
          lastTime = now;
        }
      }
    });

    // Fonction de nettoyage: arrêter d'écouter quand le composant disparaît
    return () => subscription.unsubscribe();
  }, [required, onSuccess]);

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
        <TouchableOpacity style={styles.button} onPress={() => onSuccess?.()}>
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
