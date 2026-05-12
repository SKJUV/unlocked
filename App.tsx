import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LockScreen from './src/screens/LockScreen';
import AccelScreen from './src/screens/AccelScreen';
import HomeScreen from './src/screens/HomeScreen';
import { checkIfUnlockedToday } from './src/services/auth';

// ... (comments kept)

export default function App() {
  const [screen, setScreen] = useState<'lock' | 'home' | 'accel'>('lock');

  useEffect(() => {
    checkIfUnlockedToday().then(unlocked => {
      if (unlocked) {
        setScreen('home');
      }
    });
  }, []);

  const handleUnlock = () => {
    setScreen('home');
  };

  const handleAccel = () => {
    setScreen('accel');
  };

  const handleLock = () => {
    setScreen('lock');
  };

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        {screen === 'lock' && (
          <LockScreen 
            onBio={handleUnlock}
            onAccel={handleAccel}
          />
        )}

        {screen === 'accel' && (
          <AccelScreen 
            onSuccess={handleUnlock}
            onBack={handleLock}
          />
        )}

        {screen === 'home' && (
          <HomeScreen 
            onLock={handleLock}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}
