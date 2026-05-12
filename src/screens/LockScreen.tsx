import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { authenticateBiometric } from '../services/auth';

// ============================================
// 🔒 ÉCRAN DE VERROUILLAGE (BINÔME 01)
// ============================================
// Cet écran s'affiche quand l'app est verrouillée
// L'utilisateur a 2 choix:
//   1. Utiliser la biométrie (empreinte digitale)
//   2. Secouer le téléphone selon la formule du jour
// 
// Props reçues:
//   - onBio: fonction appelée quand biométrie réussit
//   - onAccel: fonction appelée quand l'utilisateur clique "Secouer"

export default function LockScreen({ onBio, onAccel }: any) {
  // État: dit si on est en train de charger (utile pour le spinner ⏳)
  const [loading, setLoading] = useState(false);

  // ============================================
  // Fonction: Quand l'utilisateur clique "Biométrie"
  // ============================================
  const handleBio = async () => {
    // 1. On affiche un spinner ⏳
    setLoading(true);
    
    // 2. On appelle le service de biométrie
    const success = await authenticateBiometric();
    
    if (success) {
      // 3. On simule un petit délai pour le "scan"
      setTimeout(() => {
        setLoading(false);
        onBio?.();
      }, 500);
    } else {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* ============================================ */}
      {/* TITRE */}
      {/* ============================================ */}
      <Text style={styles.title}>🔒 Déverrouiller</Text>

      {/* ============================================ */}
      {/* BOUTON BIOMÉTRIE */}
      {/* ============================================ */}
      <TouchableOpacity 
        style={styles.button}
        onPress={handleBio}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {/* Si on charge, montrer ⏳, sinon montrer 👆 */}
          {loading ? '⏳' : '👆'} Biométrie
        </Text>
      </TouchableOpacity>

      {/* ============================================ */}
      {/* SÉPARATEUR: "ou" */}
      {/* ============================================ */}
      <Text style={styles.or}>ou</Text>

      {/* ============================================ */}
      {/* BOUTON ACCÉLÉROMÈTRE (SECOUER) */}
      {/* ============================================ */}
      <TouchableOpacity style={styles.button} onPress={onAccel}>
        <Text style={styles.buttonText}>📱 Secouer</Text>
      </TouchableOpacity>
    </View>
  );
}

// ============================================
// STYLES (Design de l'écran)
// ============================================
const styles = StyleSheet.create({
  // Container: le fond blanc qui remplit tout l'écran
  container: { 
    flex: 1, // Remplit tout l'espace disponible
    justifyContent: 'center', // Centre verticalement
    alignItems: 'center', // Centre horizontalement
    gap: 20, // Espacement entre les éléments
    backgroundColor: '#fff' // Fond blanc
  },
  
  // Titre: "🔒 Déverrouiller"
  title: { 
    fontSize: 28, // Grosse taille
    fontWeight: 'bold' // Texte épais
  },
  
  // Boutons: Biométrie et Secouer
  button: { 
    backgroundColor: '#007AFF', // Bleu iOS
    padding: 15, // Rembourrage interne
    borderRadius: 8, // Coins arrondis
    width: 220, // Largeur fixe
    alignItems: 'center' // Centrer le texte
  },
  
  // Texte des boutons
  buttonText: { 
    color: '#fff', // Blanc
    fontWeight: 'bold', // Gras
    fontSize: 16 // Taille moyenne
  },
  
  // "ou" entre les deux boutons
  or: { 
    color: '#999', // Gris clair
    fontSize: 14 // Petit texte
  }
});
