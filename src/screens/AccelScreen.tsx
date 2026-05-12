import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  NativeModules, 
  DeviceEventEmitter, 
  Dimensions, 
  Animated, 
  useColorScheme,
  StatusBar
} from 'react-native';
import { calculateShakesNeeded, unlockApp } from '../services/auth';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Svg, { Circle, Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

const CheckIconSvg = ({ color }: { color: string }) => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20 6L9 17l-5-5" />
  </Svg>
);
const CIRCLE_SIZE = width * 0.8;
const STROKE_WIDTH = 10;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = RADIUS * 2 * Math.PI;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

// ============================================
// 📱 ÉCRAN ACCÉLÉROMÈTRE (BINÔME 02) - VERSION V3 (FIX)
// ============================================

export default function AccelScreen({ onSuccess, onBack }: any) {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? DarkTheme : LightTheme;

  const [shakeCount, setShakeCount] = useState(0);
  const [required, setRequired] = useState(0);
  const [success, setSuccess] = useState(false);
  
  const lastAccel = useRef({ x: 0, y: 0, z: 0 });
  const lastShakeTime = useRef(0);

  // Animations
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const req = calculateShakesNeeded();
    setRequired(req);
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    if (req === 0) {
      handleSuccess();
    }
  }, []);

  useEffect(() => {
    if (success || required === 0) return;

    const accelModule = NativeModules.RNSensorsAccelerometer;

    if (!accelModule) return;

    accelModule.setUpdateInterval(50);
    accelModule.startUpdates();

    const subAccel = DeviceEventEmitter.addListener('RNSensorsAccelerometer', (data) => {
      lastAccel.current = data;
      checkShakeStatus();
    });

    return () => {
      accelModule.stopUpdates();
      subAccel.remove();
    };
  }, [required, success]);

  const checkShakeStatus = () => {
    const { x, y, z } = lastAccel.current;
    
    // Magnitude Accéléromètre uniquement (version stable)
    const magnitude = Math.sqrt(x * x + y * y + z * z);
    const now = Date.now();

    // Seuil de détection (15.0)
    if (magnitude > 15 && (now - lastShakeTime.current > 250)) {
      lastShakeTime.current = now;
      handleShake();
    }
  };

  const handleShake = () => {
    ReactNativeHapticFeedback.trigger('impactHeavy');

    Animated.parallel([
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: -15, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 15, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]),
      Animated.sequence([
        Animated.spring(scaleAnim, { toValue: 1.1, friction: 3, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }),
      ])
    ]).start();

    setShakeCount(prev => {
      const newCount = prev + 1;
      Animated.spring(progressAnim, { toValue: newCount / required, friction: 6, useNativeDriver: false }).start();
      if (newCount >= required) handleSuccess();
      return newCount;
    });
  };

  const handleSuccess = () => {
    setSuccess(true);
    unlockApp();
    ReactNativeHapticFeedback.trigger('notificationSuccess');
    setTimeout(() => onSuccess?.(), 1000);
  };

  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCUMFERENCE, 0],
  });

  const currentDayName = DAYS[new Date().getDay()];

  return (
    <Animated.View style={[styles.container, { backgroundColor: theme.bg, opacity: fadeAnim }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={[styles.backText, { color: theme.textMuted }]}>Annuler</Text>
        </TouchableOpacity>
        <Text style={[styles.dayText, { color: theme.primary }]}>{currentDayName}</Text>
      </View>

      <View style={styles.topSection}>
        <Text style={[styles.title, { color: theme.text }]}>Sécurité</Text>
        <Text style={[styles.subtitle, { color: theme.textMuted }]}>
          Mouvement requis pour déverrouiller
        </Text>
      </View>

      <View style={styles.centerSection}>
        <View style={styles.visualizerContainer}>
          <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
            <Circle 
              cx={CIRCLE_SIZE / 2} 
              cy={CIRCLE_SIZE / 2} 
              r={RADIUS} 
              stroke={theme.card} 
              strokeWidth={STROKE_WIDTH} 
              fill="transparent" 
            />
            <AnimatedCircle
              cx={CIRCLE_SIZE / 2}
              cy={CIRCLE_SIZE / 2}
              r={RADIUS}
              stroke={theme.primary}
              strokeWidth={STROKE_WIDTH}
              fill="transparent"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              rotation="-90"
              origin={`${CIRCLE_SIZE / 2}, ${CIRCLE_SIZE / 2}`}
            />
          </Svg>

          <Animated.View style={[styles.iconWrapper, { transform: [{ translateX: shakeAnim }, { scale: scaleAnim }] }]}>
            <View style={[styles.deviceFrame, { borderColor: theme.border, backgroundColor: theme.card }]}>
              <View style={[styles.deviceSpeaker, { backgroundColor: theme.border }]} />
              <Text style={[styles.countValue, { color: theme.primary }]}>{shakeCount}</Text>
              <Text style={[styles.countLabel, { color: theme.textMuted }]}>sur {required}</Text>
              <View style={[styles.deviceButton, { borderColor: theme.border }]} />
            </View>
          </Animated.View>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <View style={[styles.statusPill, { backgroundColor: success ? theme.success : theme.card, borderColor: theme.border, borderWidth: 1 }]}>
          <View style={styles.pillContent}>
            {success && <CheckIconSvg color="#fff" />}
            <Text style={[styles.statusText, { color: success ? '#fff' : theme.text }]}>
              {success ? 'TERMINÉ' : `${required - shakeCount} secousses`}
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const LightTheme = { 
  bg: '#F8FAFC', 
  card: '#FFFFFF', 
  text: '#0F172A', 
  textMuted: '#64748B', 
  primary: '#3B82F6', 
  border: '#E2E8F0', 
  success: '#10B981' 
};

const DarkTheme = { 
  bg: '#020617', // Plus sombre (Deep Navy)
  card: '#0F172A', // Plus sombre
  text: '#F8FAFC', 
  textMuted: '#94A3B8', 
  primary: '#60A5FA', // Bleu plus clair pour contraste
  border: '#1E293B', 
  success: '#22C55E' 
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: width * 0.06 },
  header: { marginTop: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backButton: { padding: 8, marginLeft: -8 },
  backText: { fontSize: 16, fontWeight: '600' },
  dayText: { fontSize: 14, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  topSection: { marginTop: 30, alignItems: 'center' },
  title: { fontSize: 36, fontWeight: '900', letterSpacing: -0.5 },
  subtitle: { fontSize: 16, textAlign: 'center', marginTop: 10, maxWidth: '80%', lineHeight: 22 },
  centerSection: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  visualizerContainer: { width: CIRCLE_SIZE, height: CIRCLE_SIZE, justifyContent: 'center', alignItems: 'center' },
  iconWrapper: { position: 'absolute' },
  deviceFrame: { width: width * 0.28, height: width * 0.48, borderRadius: 24, borderWidth: 3, alignItems: 'center', justifyContent: 'center', elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20 },
  deviceSpeaker: { width: 40, height: 4, borderRadius: 2, position: 'absolute', top: 12 },
  deviceButton: { width: 30, height: 30, borderRadius: 15, borderWidth: 1.5, position: 'absolute', bottom: 12 },
  countValue: { fontSize: 48, fontWeight: '900' },
  countLabel: { fontSize: 13, fontWeight: '700', marginTop: -2 },
  bottomSection: { marginBottom: 60, alignItems: 'center' },
  statusPill: { paddingVertical: 14, paddingHorizontal: 32, borderRadius: 30 },
  pillContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: { fontSize: 15, fontWeight: '800', letterSpacing: 0.5 },
});

