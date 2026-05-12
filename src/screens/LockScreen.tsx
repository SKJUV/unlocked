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
import Svg, { Path, Rect, Circle as SvgCircle } from 'react-native-svg';
import { authenticateBiometric } from '../services/auth';

const { width } = Dimensions.get('window');

// --- ICONS ---
const FingerprintIcon = ({ color }: { color: string }) => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.02-.3 3" />
    <Path d="M7 10.73c0-2.6 2.24-4.73 5-4.73s5 2.13 5 4.73c0 1.02-.1 2.02-.3 3" />
    <Path d="M12 2c-5.52 0-10 4.48-10 10 0 1.02.1 2.02.3 3" />
    <Path d="M12 14c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5c0 1.02.1 2.02.3 3" />
    <Path d="M17 10.73c0-2.6 2.24-4.73 5-4.73" />
    <Path d="M12 18c-2.76 0-5-2.24-5-5" />
  </Svg>
);

const ShakeIcon = ({ color }: { color: string }) => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <Path d="M12 18h.01" />
    <Path d="M2 8l2 2-2 2" />
    <Path d="M22 8l-2 2 2 2" />
  </Svg>
);

const LockIconSvg = ({ color }: { color: string }) => (
  <Svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </Svg>
);

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
          <LockIconSvg color={theme.primary} />
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
          <View style={styles.buttonContent}>
            {loading ? (
              <Text style={styles.buttonText}>Vérification...</Text>
            ) : (
              <>
                <FingerprintIcon color="#fff" />
                <Text style={styles.buttonText}>Biométrie</Text>
              </>
            )}
          </View>
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
          <View style={styles.buttonContent}>
            <ShakeIcon color={theme.text} />
            <Text style={[styles.buttonText, { color: theme.text }]}>Secouer</Text>
          </View>
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
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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

