import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, NativeModules, DeviceEventEmitter, Dimensions, Animated, Easing } from 'react-native';
import { calculateShakesNeeded, unlockApp } from '../services/auth';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.7;
const STROKE_WIDTH = 12;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = RADIUS * 2 * Math.PI;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// ============================================
// 📱 ÉCRAN ACCÉLÉROMÈTRE (BINÔME 02) - VERSION LÉGÈRE (CORE ANIMATED)
// ============================================

export default function AccelScreen({ onSuccess, onBack }: any) {
  const [shakeCount, setShakeCount] = useState(0);
  const [required, setRequired] = useState(0);
  const [success, setSuccess] = useState(false);

  // Animations (Standard API)
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // ÉTAPE 1: Initialisation
  useEffect(() => {
    const req = calculateShakesNeeded();
    setRequired(req);
    progressAnim.setValue(0);
  }, []);

  // ÉTAPE 2: ÉCOUTER LE CAPTEUR
  useEffect(() => {
    if (success) return;

    const sensorModule = NativeModules.RNSensorsAccelerometer;
    if (!sensorModule) return;

    sensorModule.setUpdateInterval(50);
    sensorModule.startUpdates();

    const subscription = DeviceEventEmitter.addListener('RNSensorsAccelerometer', (data: any) => {
      const { x, y, z } = data;
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      
      if (magnitude > 15) {
        handleShake();
      }
    });

    return () => {
      sensorModule.stopUpdates();
      subscription.remove();
    };
  }, [required, success]);

  const handleShake = () => {
    // 📳 Haptic Feedback (Impact Medium)
    ReactNativeHapticFeedback.trigger('impactMedium');

    // 🎬 Animation de secousse (Standard API)
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: -15, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 15, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();

    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1.2, friction: 3, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();

    setShakeCount(prev => {
      const newCount = prev + 1;
      
      // Mettre à jour la jauge
      Animated.timing(progressAnim, {
        toValue: newCount / required,
        duration: 200,
        useNativeDriver: false, // strokeDashoffset n'est pas supporté par native driver
      }).start();

      if (newCount >= required) {
        handleSuccess();
      }
      return newCount;
    });
  };

  const handleSuccess = () => {
    setSuccess(true);
    unlockApp();
    ReactNativeHapticFeedback.trigger('notificationSuccess');
    setTimeout(() => onSuccess?.(), 1500);
  };

  // Interpolations
  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCUMFERENCE, 0],
  });

  if (required === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>📱 Vendredi!</Text>
        <TouchableOpacity style={styles.button} onPress={handleSuccess}>
          <Text style={styles.buttonText}>✅ Déverrouiller</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← Annuler</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Défi Secousse</Text>
      <Text style={styles.subtitle}>Secouez énergiquement votre téléphone</Text>

      <View style={styles.progressContainer}>
        <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE} style={styles.svg}>
          <Circle
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={RADIUS}
            stroke="#1e293b"
            strokeWidth={STROKE_WIDTH}
            fill="transparent"
          />
          <AnimatedCircle
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={RADIUS}
            stroke="#3b82f6"
            strokeWidth={STROKE_WIDTH}
            fill="transparent"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${CIRCLE_SIZE / 2}, ${CIRCLE_SIZE / 2}`}
          />
        </Svg>
        
        <Animated.View style={[
          styles.phoneWrapper, 
          { transform: [{ translateX: shakeAnim }, { scale: scaleAnim }] }
        ]}>
          <View style={styles.phoneIcon}>
            <View style={styles.phoneSpeaker} />
            <Text style={styles.countText}>{shakeCount}</Text>
            <Text style={styles.totalText}>sur {required}</Text>
            <View style={styles.phoneButton} />
          </View>
        </Animated.View>
      </View>

      <View style={styles.statusBox}>
        <Text style={styles.statusText}>
          {success ? '✨ RÉUSSI !' : `Encore ${required - shakeCount} pour ouvrir`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10,
  },
  backText: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#f8fafc',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 50,
    textAlign: 'center',
  },
  progressContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  svg: {
    position: 'absolute',
  },
  phoneWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneIcon: {
    width: 100,
    height: 170,
    backgroundColor: '#1e293b',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  phoneSpeaker: {
    width: 40,
    height: 5,
    backgroundColor: '#334155',
    borderRadius: 2.5,
    position: 'absolute',
    top: 12,
  },
  phoneButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#334155',
    position: 'absolute',
    bottom: 12,
  },
  countText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#3b82f6',
  },
  totalText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
    marginTop: 2,
  },
  statusBox: {
    marginTop: 60,
    paddingVertical: 18,
    paddingHorizontal: 35,
    backgroundColor: '#1e293b',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statusText: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 18,
    paddingHorizontal: 45,
    borderRadius: 15,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
  },
});
