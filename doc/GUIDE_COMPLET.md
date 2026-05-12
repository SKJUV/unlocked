# 💻 TOUS LES CODES

Copier-coller direct. Tout est commenté.

---

## BINÔME 03 - Services

**Fichier:** `src/services/auth.ts`

```typescript
// Variable globale
let isLocked = true;

// 1. Biométrie (simule empreinte digitale)
export async function authenticateBiometric(): Promise<boolean> {
  console.log('✅ Biométrie OK');
  return true;
}

// 2. Formule du jour: (jour)² mod 5
export function calculateShakesNeeded(date = new Date()): number {
  let day = date.getDay();
  if (day === 0) day = 7; // Dimanche = 7
  return (day * day) % 5; // Résultat: 0-4
}

// 3. Gestion lock/unlock
export function isAppLocked(): boolean { return isLocked; }
export function unlockApp(): void { isLocked = false; }
export function lockApp(): void { isLocked = true; }
```

---

## BINÔME 01 - LockScreen

**Fichier:** `src/screens/LockScreen.tsx`

```typescript
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LockScreen({ onBio, onAccel }: any) {
  const [loading, setLoading] = useState(false);

  const handleBio = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onBio?.();
    }, 500); // Simule le délai d'authentification
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔒 Déverrouiller</Text>
      <TouchableOpacity style={styles.button} onPress={handleBio} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? '⏳' : '👆'} Biométrie</Text>
      </TouchableOpacity>
      <Text style={styles.or}>ou</Text>
      <TouchableOpacity style={styles.button} onPress={onAccel}>
        <Text style={styles.buttonText}>📱 Secouer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, width: 220, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  or: { color: '#999' }
});
```

---

## BINÔME 02 - AccelScreen

**Fichier:** `src/screens/AccelScreen.tsx`

```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Vibration } from 'react-native';
import { accelerometer } from 'react-native-sensors';

export default function AccelScreen({ onSuccess, onBack }: any) {
  const [shakeCount, setShakeCount] = useState(0);
  const [required, setRequired] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const day = new Date().getDay() || 7;
    const req = (day * day) % 5;
    setRequired(req);
  }, []);

  useEffect(() => {
    let lastTime = 0;
    const subscription = accelerometer.subscribe(({ x, y, z }: any) => {
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      if (magnitude > 3.0 && Date.now() - lastTime > 300) {
        Vibration.vibrate(100);
        setShakeCount(prev => {
          const newCount = prev + 1;
          if (newCount >= required) {
            setSuccess(true);
            setTimeout(onSuccess, 500);
          }
          return newCount;
        });
        lastTime = Date.now();
      }
    });
    return () => subscription.unsubscribe();
  }, [required, onSuccess]);

  // Vendredi: 0 secousses (cas spécial)
  if (required === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>📱 Vendredi!</Text>
        <Text style={styles.info}>0 secousses requises 😎</Text>
        <TouchableOpacity style={styles.button} onPress={onSuccess}>
          <Text style={styles.buttonText}>✅ Déverrouiller</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📱 Secouez!</Text>
      <Text style={styles.count}>{shakeCount}/{required}</Text>
      {success && <Text style={styles.success}>✅ Déverrouillé!</Text>}
      <TouchableOpacity style={styles.button} onPress={() => { setShakeCount(0); setSuccess(false); }}>
        <Text style={styles.buttonText}>🔄 Réinitialiser</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.back]} onPress={onBack}>
        <Text style={styles.buttonText}>← Retour</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold' },
  count: { fontSize: 40, fontWeight: 'bold', color: '#007AFF' },
  info: { fontSize: 16 },
  success: { fontSize: 20, fontWeight: 'bold', color: 'green' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, width: 220, alignItems: 'center' },
  back: { backgroundColor: '#666' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
```

---

## BINÔME 04a - HomeScreen

**Fichier:** `src/screens/HomeScreen.tsx`

```typescript
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ onLock }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Déverrouillé!</Text>
      <Text style={styles.subtitle}>Bienvenue 🎉</Text>
      <TouchableOpacity style={styles.button} onPress={onLock}>
        <Text style={styles.buttonText}>🔒 Verrouiller</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: '#666' },
  button: { backgroundColor: '#FF3B30', padding: 15, borderRadius: 8, width: 220, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
```

---

## BINÔME 04b - App.tsx (Navigation)

**Fichier:** `App.tsx`

```typescript
import React, { useState } from 'react';
import { View } from 'react-native';
import LockScreen from './src/screens/LockScreen';
import AccelScreen from './src/screens/AccelScreen';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  const [screen, setScreen] = useState<'lock' | 'home' | 'accel'>('lock');

  return (
    <View style={{ flex: 1 }}>
      {screen === 'lock' && <LockScreen onBio={() => setScreen('home')} onAccel={() => setScreen('accel')} />}
      {screen === 'accel' && <AccelScreen onSuccess={() => setScreen('home')} onBack={() => setScreen('lock')} />}
      {screen === 'home' && <HomeScreen onLock={() => setScreen('lock')} />}
    </View>
  );
}
```

---

**C'est tout! Copier-coller, compiler, et ça marche!** ✅
