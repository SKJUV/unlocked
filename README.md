# 📱 Unlocked App - Projet d'école ANDROID (1 jour)

Déverrouiller une app Android via **biométrie** ou **accéléromètre**.

## ⚡ Quick Start ANDROID

```bash
# 1. Prérequis (voir doc/SETUP_ANDROID.md)
echo $ANDROID_HOME   # Doit avoir une valeur
adb devices          # Doit afficher votre appareil

# 2. Installer npm (15 min)
npm install
npm install react-native-sensors react-native-async-storage @react-native-async-storage/async-storage

# 3. Lancer sur Android (5 min)
npm start            # Terminal 1
npm run android      # Terminal 2
```

## 📖 LIRE EN PREMIER

**→ `doc/START_HERE.md`** - Démarrage complet

**→ `doc/QUICK_START_ANDROID.md`** - Commandes exactes

**→ `doc/SETUP_ANDROID.md`** - Configuration Android détaillée

## 👥 4 Binômes, 4 tâches

| Binôme | Rôle | Fichier | Durée |
|--------|------|---------|-------|
| **03** | Services (PRIORITAIRE!) | `src/services/auth.ts` | 20 min |
| **01** | Écran biométrie | `src/screens/LockScreen.tsx` | 15 min |
| **02** | Écran accéléromètre | `src/screens/AccelScreen.tsx` | 15 min |
| **04** | Navigation + accueil | `App.tsx` + `HomeScreen.tsx` | 15 min |

## 🎯 Objectif: App fonctionnelle

- ✅ Écran verrouillage (🔒)
- ✅ Déverrouiller via biométrie (👆)
- ✅ Déverrouiller via secousses (📱)
- ✅ Écran accueil (✅)
- ✅ Re-verrouiller (🔒)

## 🚀 Commandes ANDROID SEULEMENT

```bash
npm start            # Démarrer Metro
npm run android      # Compiler et lancer sur Android (AVD ou téléphone)
npm test             # Tester
```

**⚠️ iOS n'est PAS supporté dans ce projet. ANDROID SEULEMENT.**

## 📋 Documentation

| Fichier | Contenu | Durée |
|---------|---------|-------|
| **START_HERE.md** | Point d'entrée | 5 min |
| **QUICK_START_ANDROID.md** | Commandes exactes | 3 min |
| **SETUP_ANDROID.md** | Configuration détaillée | 20 min |
| **GUIDE_COMPLET.md** | Tous les codes | 10 min |
| **EXPLICATIONS_BINOMES.md** | Votre rôle précis | 15 min |
| **FAQ.md** | Questions/réponses | À l'usage |



## 📚 Documentation

- **START_HERE.md** ← Commencez ici! (code + timeline)
- **INDEX.md** ← Liens importants
- Autres fichiers = optionnels

---

**GO GO GO! 1 jour, vous êtes capables! 💪**

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
