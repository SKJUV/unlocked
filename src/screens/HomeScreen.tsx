import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// ============================================
// ✅ ÉCRAN D'ACCUEIL (BINÔME 04)
// ============================================
// Cet écran s'affiche après un déverrouillage réussi
// C'est l'écran principal de l'app une fois déverrouillée
// L'utilisateur peut juste voir "Bienvenue" ou cliquer "Verrouiller"
//
// Props reçues:
//   - onLock: fonction appelée quand on clique le bouton "Verrouiller"

export default function HomeScreen({ onLock }: any) {
  return (
    <View style={styles.container}>
      {/* ============================================ */}
      {/* TITRE DE SUCCÈS */}
      {/* ============================================ */}
      <Text style={styles.title}>✅ Déverrouillé!</Text>
      
      {/* ============================================ */}
      {/* SOUS-TITRE */}
      {/* ============================================ */}
      <Text style={styles.subtitle}>Bienvenue dans l'app 🎉</Text>
      
      {/* ============================================ */}
      {/* BOUTON REVERROUILLER */}
      {/* ============================================ */}
      <TouchableOpacity style={styles.button} onPress={onLock}>
        <Text style={styles.buttonText}>🔒 Verrouiller</Text>
      </TouchableOpacity>
    </View>
  );
}

// ============================================
// STYLES
// ============================================
const styles = StyleSheet.create({
  // Container: fond blanc qui remplit tout
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 20, 
    backgroundColor: '#fff' 
  },
  
  // Titre: "✅ Déverrouillé!"
  title: { 
    fontSize: 28, 
    fontWeight: 'bold' 
  },
  
  // Sous-titre: "Bienvenue dans l'app 🎉"
  subtitle: { 
    fontSize: 16, 
    color: '#666' // Gris
  },
  
  // Bouton: "🔒 Verrouiller"
  button: { 
    backgroundColor: '#FF3B30', // Rouge pour indiquer "danger/verrouiller"
    padding: 15, 
    borderRadius: 8, 
    width: 220, 
    alignItems: 'center' 
  },
  
  // Texte du bouton
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  }
});
