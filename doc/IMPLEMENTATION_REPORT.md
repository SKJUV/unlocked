# Rapport d'Implémentation - Projet Unlocked

Ce document récapitule les modifications apportées pour rendre l'application fonctionnelle, les défis techniques rencontrés et les solutions retenues.

## 1. État des Lieux Technique

L'application tourne sous **React Native 0.85.3** avec la **Nouvelle Architecture (Fabric/Bridgeless)** activée par défaut. Cette version moderne est incompatible avec beaucoup d'anciennes bibliothèques natives qui reposent sur le "Bridge" classique.

### Authentification Biométrique
- **Problème** : L'implémentation initiale était une simple alerte `alert()`.
- **Solution** : Intégration de `react-native-biometrics`.
- **Fichiers modifiés** :
  - `src/services/auth.ts` : Utilisation de `rnBiometrics.createKeys()` et `rnBiometrics.simplePrompt()`.
  - `AndroidManifest.xml` : Ajout de la permission `USE_BIOMETRIC`.
  - `package.json` : Ajout de la dépendance.

### Détection des Secousses (Accéléromètre)
- **Problème** : La bibliothèque `react-native-sensors` (7.3.0) est obsolète pour la Nouvelle Architecture. Elle générait des erreurs `NativeEventEmitter` car elle n'implémentait pas les méthodes `addListener`/`removeListeners` demandées par le mode Bridgeless.
- **Tentatives** :
  1. **Patch Natif** : Ajout manuel de `addListener` dans `RNSensor.java`. Cela a réduit les erreurs mais le wrapper JS restait instable.
  2. **Alternative `react-native-shake`** : Échec car la bibliothèque n'était pas correctement liée (linking) avec le nouveau système de build sans redémarrage complet et complexe.
- **Solution Finale (La plus robuste)** : 
  - **Bypassing** : Nous avons court-circuité le wrapper JavaScript de la bibliothèque.
  - **Accès Direct** : Utilisation de `NativeModules.RNSensorsAccelerometer` pour configurer le capteur.
  - **Événements Bruts** : Utilisation de `DeviceEventEmitter` pour écouter les données brutes directement depuis le module Java patché.
- **Paramétrage final** :
  - Fréquence : 50ms (20Hz).
  - Magnitude seuil : 15.0 (réglé pour éviter les faux positifs).

## 2. Fichiers Modifiés et Rôles

| Fichier | Modification | Raison |
| :--- | :--- | :--- |
| `src/services/auth.ts` | Refonte des fonctions `authenticateBiometric` et `calculateShakesNeeded`. | Passer d'un simulateur à une logique réelle. |
| `src/screens/AccelScreen.tsx` | Réécriture complète de la logique d'écoute. | Utilisation de `DeviceEventEmitter` pour la stabilité. |
| `android/app/src/main/java/com/sensors/RNSensor.java` | Ajout de `@ReactMethod addListener/removeListeners`. | Compatibilité obligatoire avec React Native 0.82+. |
| `AndroidManifest.xml` | Ajout des permissions `BIOMETRIC`, `VIBRATE`, `HIGH_SAMPLING_RATE`. | Autoriser l'accès au matériel Android. |
| `package.json` | Ajout de `react-native-biometrics` et nettoyage. | Gestion des dépendances. |

---

## 3. Propositions d'Améliorations

Pour rendre l'application encore plus "Premium" et robuste, voici les étapes suggérées :

### A. Expérience Utilisateur (UX/UI)
1.  **Haptic Feedback Réel** : Remplacer `Vibration.vibrate()` par `react-native-haptic-feedback` pour des vibrations plus subtiles et variées (impact léger, moyen, succès).
2.  **Animations de Secousse** : Ajouter une animation (avec `Lottie` ou `Reanimated`) d'un téléphone qui secoue sur l'écran `AccelScreen` pour guider l'utilisateur visuellement.
3.  **Jauges de Progression** : Afficher une barre de progression circulaire qui se remplit à chaque secousse.

### B. Technique & Sécurité
1.  **Détection Gyroscopique** : Combiner l'accéléromètre avec le gyroscope pour détecter une rotation brusque (vrai geste de secousse) et non pas juste un choc linéaire.
2.  **Persistence Native** : Utiliser `AsyncStorage` pour sauvegarder si l'utilisateur a déjà déverrouillé l'app pour la journée, afin qu'un redémarrage de l'app ne demande pas de re-secouer immédiatement.
3.  **Mode Sombre (Dark Mode)** : Harmoniser les couleurs pour qu'elles s'adaptent automatiquement aux réglages du système.

### C. Maintenance
1.  **Migration vers Expo Modules** : À terme, remplacer `react-native-sensors` par `expo-sensors` (utilisable même sans Expo Go). Les modules Expo sont actuellement les mieux maintenus pour la Nouvelle Architecture.
