import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  useColorScheme, 
  StatusBar,
  Dimensions
} from 'react-native';
import { authenticateBiometric } from '../services/auth';

const { width } = Dimensions.get('window');

export default function LockScreen({ onBio, onAccel }: any) {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? DarkTheme : LightTheme;
  const [loading, setLoading] = useState(false);

  const handleBio = async () => {
    setLoading(true);
    const success = await authenticateBiometric();
    
    if (success) {
      setTimeout(() => {
        setLoading(false);
        onBio?.();
      }, 500);
    } else {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      <View style={styles.topSection}>
        <View style={[styles.lockIcon, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={styles.lockEmoji}>🔒</Text>
        </View>
        <Text style={[styles.title, { color: theme.text }]}>Déverrouiller</Text>
        <Text style={[styles.subtitle, { color: theme.textMuted }]}>
          Choisissez une méthode pour accéder à vos données sécurisées
        </Text>
      </View>

      <View style={styles.buttonSection}>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={handleBio}
          disabled={loading}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            {loading ? '⏳ Vérification...' : '👆 Biométrie'}
          </Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={[styles.line, { backgroundColor: theme.border }]} />
          <Text style={[styles.or, { color: theme.textMuted }]}>ou</Text>
          <View style={[styles.line, { backgroundColor: theme.border }]} />
        </View>

        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton, { borderColor: theme.border, backgroundColor: theme.card }]} 
          onPress={onAccel}
          activeOpacity={0.7}
        >
          <Text style={[styles.buttonText, { color: theme.text }]}>📱 Secouer</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.textMuted }]}>
          Sécurisé par Unlocked V3
        </Text>
      </View>
    </View>
  );
}

const LightTheme = {
  bg: '#F8FAFC',
  card: '#FFFFFF',
  text: '#0F172A',
  textMuted: '#64748B',
  primary: '#3B82F6',
  border: '#E2E8F0',
};

const DarkTheme = {
  bg: '#020617',
  card: '#0F172A',
  text: '#F8FAFC',
  textMuted: '#94A3B8',
  primary: '#3B82F6',
  border: '#1E293B',
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingHorizontal: 32,
    justifyContent: 'space-between',
    paddingVertical: 80,
  },
  topSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  lockIcon: {
    width: 80,
    height: 80,
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  lockEmoji: {
    fontSize: 32,
  },
  title: { 
    fontSize: 32, 
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
    maxWidth: '90%',
  },
  buttonSection: {
    width: '100%',
    gap: 16,
  },
  button: { 
    height: 60,
    borderRadius: 16, 
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  secondaryButton: {
    borderWidth: 1,
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 17,
    letterSpacing: 0.5,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  line: {
    flex: 1,
    height: 1,
  },
  or: { 
    marginHorizontal: 16,
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  }
});

