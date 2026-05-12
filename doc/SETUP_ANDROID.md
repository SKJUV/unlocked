# ⚙️ SETUP ANDROID - CONFIGURATION DÉTAILLÉE

## 🎯 Objectif

Avoir Android SDK + ADB prêts pour lancer l'app sur AVD ou téléphone.

---

## 1️⃣ VÉRIFIER LES PRÉREQUIS

### Check 1: Java/JDK
```bash
java -version
# Doit afficher: java 11, 17, OU 21+
```

**Si ERREUR:** Installer Java
```bash
# Ubuntu/Debian
sudo apt install openjdk-21-jdk

# macOS
brew install java
```

### Check 2: Node.js
```bash
node --version   # Doit être v18+
npm --version    # v8+
```

**Si ERREUR:** Installer depuis https://nodejs.org/

### Check 3: Android SDK/Studio
```bash
echo $ANDROID_HOME
# Doit afficher un chemin, ex: /home/user/Android/Sdk
```

**Si vide:** Voir section "Installer Android Studio" ci-dessous

---

## 2️⃣ INSTALLER ANDROID STUDIO (première fois)

### Sur Linux
```bash
# Télécharger depuis https://developer.android.com/studio
# Ou via apt (Ubuntu 20.04+)
sudo apt install android-studio

# Puis lancer
android-studio
```

### Sur macOS
```bash
# Via Homebrew
brew install android-studio

# Ou télécharger depuis https://developer.android.com/studio
```

### Sur Windows
- Télécharger: https://developer.android.com/studio
- Installer
- Lancer `Android Studio`

---

## 3️⃣ CONFIGURER ANDROID SDK (première fois)

### Étape 1: Ouvrir SDK Manager
```
Android Studio → Settings → Languages & Frameworks → Android SDK
```

### Étape 2: Installer SDK Platform
```
SDK Platforms tab
  ✅ Android 14 (ou 15)
  ✅ Google Play system image
Cliquer: Apply → OK
```

### Étape 3: Installer SDK Tools
```
SDK Tools tab
  ✅ Android SDK Build-Tools
  ✅ Android Emulator
  ✅ Android SDK Platform-Tools
  ✅ Google Play services
Cliquer: Apply → OK
```

### Étape 4: Configurer ANDROID_HOME

**Linux/macOS:**
```bash
# Ajouter à ~/.bashrc ou ~/.zshrc
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Puis charger
source ~/.bashrc  # ou ~/.zshrc
```

**Windows (PowerShell Admin):**
```powershell
[Environment]::SetEnvironmentVariable("ANDROID_HOME", "C:\Users\YourName\AppData\Local\Android\Sdk", "User")
```

### Étape 5: Vérifier ADB
```bash
adb --version
# Doit afficher: Android Debug Bridge version 1.0.XX
```

---

## 4️⃣ CRÉER UN AVD (Android Virtual Device)

### Option A: Via Android Studio (Facile)

**Étape 1: Ouvrir Device Manager**
```
Android Studio → Tools → Device Manager
```

**Étape 2: Créer un nouvel AVD**
```
Cliquer: Create Device
Choisir: Pixel 6a (OU autre Pixel récent)
Cliquer: Next
```

**Étape 3: Choisir Android version**
```
Choisir: Android 14 OU 15
Cliquer: Next → Finish
```

**Étape 4: Démarrer l'AVD**
```
Device Manager → Play button 🟢 sur votre AVD
(Ça prend 30-60 sec la première fois)
```

**Étape 5: Vérifier dans ADB**
```bash
adb devices
# Doit afficher:
# emulator-5554    device
```

✅ AVD prêt!

### Option B: Via Command Line

```bash
# Lister les devices disponibles
sdkmanager --list

# Créer un AVD
avdmanager create avd -n my_pixel -k "system-images;android;15;google_apis"

# Lancer l'AVD
emulator -avd my_pixel
```

---

## 5️⃣ CONFIGURER UN TÉLÉPHONE PHYSIQUE

### Étape 1: Activer USB Debug

**Sur le téléphone:**
```
Paramètres → À propos
  → Appuyer 7 fois sur "Numéro de build"
Paramètres → Options développeur
  → "Débogage USB" → ON
  → "Installation via USB" → ON (optionnel mais recommandé)
```

### Étape 2: Brancher le téléphone

```
Connecter avec câble USB
Une popup va demander "Autoriser le débogage?"
→ Cliquer: OK/Autoriser
```

### Étape 3: Vérifier ADB

```bash
adb devices
# Doit afficher:
# ABC123DEF456    device
```

✅ Téléphone prêt!

---

## 6️⃣ TESTER LA CONFIGURATION

### Vérifier AVD/Téléphone détecté

```bash
adb devices
# DOIT afficher au moins 1 device

# Pour plus de détails
adb shell getprop ro.build.version.release
# Affiche: Android version
```

### Tester avec React Native

```bash
# Dans le dossier du projet
npm start
# Metro démarre

# Dans autre terminal
npm run android
# App devrait installer + lancer automatiquement
```

---

## ⚠️ PROBLÈMES COURANTS

### "adb: command not found"
```bash
# Solution: ANDROID_HOME pas configuré
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### "No devices found"
```bash
# AVD: Vérifier qu'il est lancé
adb devices  # Doit afficher emulator-XXXX

# Téléphone: Vérifier câble USB et permissions
adb kill-server
adb start-server
adb devices
```

### "Permission denied" avec AéléphonePhysique
```bash
# Linux: Donner les permissions
sudo usermod -a -G plugdev $USER
# Puis redémarrer l'ordi OU
newgrp plugdev
```

### "gradle build failed"
```bash
# Solution: Nettoyer et rebuild
cd android
./gradlew clean
cd ..
npm run android
```

---

## 🎯 CHECKLIST FINALE

- [ ] Java/JDK installé et détecté
- [ ] Node.js v18+ installé
- [ ] Android Studio installé
- [ ] Android SDK 14+ configuré
- [ ] ANDROID_HOME défini
- [ ] ADB fonctionne (`adb devices`)
- [ ] AVD créé OU téléphone connecté
- [ ] Appareil détecté par ADB

✅ Tous OK? → Allez à START_HERE.md étape 3

---

## 📞 AIDE RAPIDE

| Problème | Commande |
|----------|----------|
| "Ça marche pas" | `adb devices` |
| "Reset ADB" | `adb kill-server && adb start-server` |
| "Voir logs" | `npm start` puis `npm run android` |
| "Vérifier Java" | `java -version` |
| "Vérifier SDK" | `echo $ANDROID_HOME` |
| "Lancer AVD" | Android Studio → Device Manager → Play 🟢 |
