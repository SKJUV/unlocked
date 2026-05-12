# 🚀 DÉMARRAGE - ANDROID SEULEMENT

## ⚡ 1 jour, 8 personnes, 1 app Android

App qui se déverrouille via **biométrie** ou **secousses du jour**.

---

## 🎯 AVANT TOUTE CHOSE

### Vous avez déjà Android SDK + ADB configuré?

```bash
echo $ANDROID_HOME   # Doit afficher un chemin
adb --version        # Doit afficher une version
adb devices          # Doit afficher au moins 1 appareil
```

**SI OUI** → Allez à "ÉTAPE 1" ci-dessous  
**SI NON** → **LIRE D'ABORD: `SETUP_ANDROID.md`** ⚠️

---

## 📋 ÉTAPE 1: Installer npm (10 min)

```bash
cd /path/to/unlocked
npm install
npm install react-native-sensors react-native-async-storage @react-native-async-storage/async-storage
```

---

## 📋 ÉTAPE 2: Lancer l'app (5 min)

**Terminal 1:**
```bash
npm start
```

**Terminal 2:** (attendre que Metro démarre)
```bash
npm run android
```

L'app devrait s'afficher! Vous devriez voir:
```
🔒 Déverrouiller

[👆 Biométrie]
    ou
[📱 Secouer]
```

✅ C'est bon? Continuez!

---

## 📋 ÉTAPE 3-5: Comprendre et coder

1. **Lire:** GUIDE_COMPLET.md (10 min)
2. **Lire:** EXPLICATIONS_BINOMES.md (20 min)
3. **CODER:** Votre partie (60 min)

---

## 🎮 AVD vs Téléphone (Important!)

### Vous testez sur quoi?

**AVD (Émulateur):**
```
✅ Facile à setup
✅ Pas besoin de câble
✅ Parfait pour commencer
⚠️ Secouer: Ctrl+numpad
```

**Téléphone physique:**
```
✅ Plus réaliste
✅ Vrai accéléromètre
✅ Vrai capteur d'empreinte
⚠️ Besoin du câble USB
```

Voir START_HERE.md (section "ÉTAPES PRÉCISES") pour les détails.

---

## 👥 QUI FAIT QUOI

| Binôme | Fichier | Rôle | Durée |
|--------|---------|------|-------|
| **03** | `src/services/auth.ts` | Services (PRIORITAIRE!) | 20 min |
| **01** | `src/screens/LockScreen.tsx` | Écran biométrie | 15 min |
| **02** | `src/screens/AccelScreen.tsx` | Écran accéléromètre | 15 min |
| **04** | `App.tsx` + `HomeScreen.tsx` | Navigation | 15 min |

**BINÔME 03 d'abord!** Les autres attendent.

---

## 📚 LES 6 FICHIERS ESSENTIELS

1. **START_HERE.md** ← Vous êtes ici
2. **QUICK_START_ANDROID.md** ← Commandes exactes
3. **SETUP_ANDROID.md** ← Configuration Android (si besoin)
4. **GUIDE_COMPLET.md** ← Tous les codes
5. **EXPLICATIONS_BINOMES.md** ← Votre rôle
6. **FAQ.md** ← Questions/réponses

---

## 🎯 Prochaines actions (dans l'ordre)

1. ✅ Vérifier Android SDK (SETUP_ANDROID.md si besoin)
2. ✅ Installer npm
3. ✅ Lancer `npm start` + `npm run android`
4. ✅ Lire GUIDE_COMPLET.md
5. ✅ Lire EXPLICATIONS_BINOMES.md
6. ✅ CODER votre partie!

