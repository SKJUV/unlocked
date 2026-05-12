# ⚡ QUICK START ANDROID - COMMANDES EXACTES

## 🎯 De zéro à l'app en 10 minutes

---

## PRÉREQUIS (Vérifier d'abord)

```bash
# Vérifier Android SDK
echo $ANDROID_HOME
# Doit afficher: /home/user/Android/Sdk (ou similaire)

# Vérifier ADB
adb --version
# Doit afficher: Android Debug Bridge

# Vérifier Node.js
node --version npm --version
# Doivent être v18+ et v8+

# Vérifier votre appareil
adb devices
# DOIT afficher au moins:
# emulator-5554    device   (pour AVD)
# ABC123DEF456     device   (pour téléphone physique)
```

**⚠️ Si une vérification échoue:** Voir SETUP_ANDROID.md

---

## COMMANDES EXACTES

### OPTION A: Avec AVD (Émulateur) - RECOMMANDÉ

**1. Vérifier l'AVD est lancé**
```bash
adb devices
# Doit afficher: emulator-5554 (ou similaire)
```

**Si RIEN n'affiche:**
```
Android Studio → Device Manager → Play 🟢 sur votre AVD
(Attendre 30-60 sec qu'il démarre)
```

**2. Naviguer au projet**
```bash
cd /chemin/vers/unlocked
```

**3. Installer les deps (première fois)**
```bash
npm install
npm install react-native-sensors react-native-async-storage @react-native-async-storage/async-storage
```

**4. Démarrer Metro (Terminal 1)**
```bash
npm start
# Attendre "Welcome to Metro!"
```

**5. Compiler + installer l'app (Terminal 2)**
```bash
npm run android
# Ça compile... puis l'app s'installe sur l'AVD
# Puis elle se lance automatiquement
```

**6. Vous devriez voir:**
```
🔒 Déverrouiller

[👆 Biométrie]
    ou
[📱 Secouer]
```

✅ **C'est BON!**

---

### OPTION B: Avec téléphone physique

**1. Vérifier le téléphone est connecté**
```bash
adb devices
# DOIT afficher: ABC123DEF456    device
```

**Si ERREUR "Permission denied":**
```bash
adb kill-server
adb start-server
adb devices
# Puis accepter sur le téléphone: "Autoriser le débogage USB?"
```

**2-5. Même que Option A!**
```bash
cd /chemin/vers/unlocked
npm install
npm install react-native-sensors react-native-async-storage @react-native-async-storage/async-storage
npm start          # Terminal 1
npm run android    # Terminal 2
```

**6. L'app s'installe sur le TÉLÉPHONE**
```
L'écran du téléphone doit afficher:
🔒 Déverrouiller
[👆 Biométrie]
    ou
[📱 Secouer]
```

✅ **C'est BON!**

---

## 🧪 TESTER L'APP

### LockScreen (BINÔME 01)
```
✅ Voir 2 boutons
✅ Clic "👆 Biométrie" → ⏳ → disparaît → écran change
✅ Clic "📱 Secouer" → écran change
```

### AccelScreen (BINÔME 02)
```bash
# Sur AVD:
# Côté droit → Accéléromètre controls → Secouer

# Sur téléphone:
# Secouer physiquement

# Vérifier:
✅ Compteur augmente
✅ Vibration ressentie (téléphone)
✅ Quand assez de shakes → "✅ Déverrouillé!"
```

### HomeScreen (BINÔME 04)
```
✅ Voir "✅ Déverrouillé!"
✅ Bouton "🔒 Verrouiller" → retour LockScreen
```

---

## 🔄 COMMANDES UTILES

### Redémarrer Metro
```bash
# Ctrl+C pour arrêter
npm start
```

### Nettoyer le cache
```bash
npm start -- --reset-cache
```

### Réinstaller l'app
```bash
npm run android
```

### Voir les logs
```bash
# Pendant que l'app tourne
npm start
# Affiche tous les console.log
```

### Debug avec ADB
```bash
# Voir les logs du téléphone/AVD
adb logcat
# Filtrer pour React Native
adb logcat | grep ReactNativeJS
```

---

## ⚠️ SI ÇA MARCHE PAS

### "npm start" freeze
```
Ctrl+C → relancer → npm start -- --reset-cache
```

### "gradle build failed"
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### "Device not found"
```bash
adb kill-server
adb start-server
adb devices
# Puis relancer npm run android
```

### "App crash"
```bash
# Voir les erreurs
npm start
# ET adb logcat | grep ReactNativeJS
# Chercher "ERROR" dans les logs
```

---

## 🎯 CHECKLIST

- [ ] `adb devices` affiche au moins 1 appareil ✅
- [ ] `npm install` fini ✅
- [ ] `npm start` démarre Metro ✅
- [ ] `npm run android` compile et installe ✅
- [ ] App se lance ✅
- [ ] Vous voyez "🔒 Déverrouiller" ✅

✅ Tous OK? → Allez lire GUIDE_COMPLET.md!

---

## 📞 AIDE RAPIDE

| Besoin | Commande |
|--------|----------|
| Vérifier l'appareil | `adb devices` |
| Voir les logs | `adb logcat` |
| Reset ADB | `adb kill-server && adb start-server` |
| Nettoyer cache Metro | `npm start -- --reset-cache` |
| Forcer rebuild | `cd android && ./gradlew clean && cd ..` |
| Tuer Metro | `Ctrl+C` |

