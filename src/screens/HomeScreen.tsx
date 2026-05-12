import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  useColorScheme, 
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { lockApp } from '../services/auth';

export default function HomeScreen({ onLock }: any) {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? DarkTheme : LightTheme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      <View style={styles.content}>
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={styles.icon}>🔓</Text>
          <Text style={[styles.title, { color: theme.text }]}>Déverrouillé</Text>
          <Text style={[styles.subtitle, { color: theme.textMuted }]}>
            Vous avez accès à toutes les fonctionnalités de l'application.
          </Text>
        </View>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.danger }]} 
          onPress={() => {
            lockApp();
            onLock?.();
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>🔒 Verrouiller maintenant</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.textMuted }]}>
          Session active • Unlocked V3
        </Text>
      </View>
    </SafeAreaView>
  );
}

const LightTheme = {
  bg: '#F8FAFC',
  card: '#FFFFFF',
  text: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',
  danger: '#EF4444',
};

const DarkTheme = {
  bg: '#020617',
  card: '#0F172A',
  text: '#F8FAFC',
  textMuted: '#94A3B8',
  border: '#1E293B',
  danger: '#DC2626',
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  content: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 32,
    gap: 32,
  },
  card: {
    width: '100%',
    padding: 32,
    borderRadius: 32,
    borderWidth: 1,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  icon: {
    fontSize: 48,
    marginBottom: 20,
  },
  title: { 
    fontSize: 28, 
    fontWeight: '900',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: { 
    fontSize: 16, 
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },
  button: { 
    paddingVertical: 18, 
    paddingHorizontal: 32,
    borderRadius: 16, 
    width: '100%', 
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 16,
    letterSpacing: 0.5,
  },
  footer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  }
});

