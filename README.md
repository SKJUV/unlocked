This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# 📱 Unlocked App - Projet d'école (1 jour)

Déverrouiller une app via **biométrie** ou **accéléromètre**.

## ⚡ Quick Start

```bash
# 1. Installer (15 min)
npm install
npm install react-native-sensors react-native-async-storage @react-native-async-storage/async-storage

# 2. iOS (optionnel)
cd ios && pod install && cd ..

# 3. Lancer
npm start
```

## 📖 LIRE D'ABORD

**👉 Ouvrez** : `doc/START_HERE.md` ← **C'EST VOTRE PLAN DU JOUR**

## 👥 4 Binômes, 4 tâches

| Binôme | Rôle | Fichier |
|--------|------|---------|
| **01** | Biométrie UI | `src/screens/LockScreen.tsx` |
| **02** | Accéléromètre UI | `src/screens/AccelScreen.tsx` |
| **03** | Services | `src/services/auth.ts` |
| **04** | Navigation + Home | `App.tsx` + `src/screens/HomeScreen.tsx` |

## 🎯 Objectif = 17h00

App fonctionnelle:
- ✅ Écran de verrouillage
- ✅ Déverrouiller via biométrie (1 clic)
- ✅ Déverrouiller via secousses (formule du jour)
- ✅ Écran accueil
- ✅ Re-verrouiller

## 🚀 Commandes utiles

```bash
npm start          # Démarrer Metro
npm run android    # Compiler Android
npm run ios        # Compiler iOS
npm test           # Tester
```

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
