# 📖 EXPLICATIONS PAR BINÔME

---

## BINÔME 03 - Services (PRIORITAIRE!)

### Votre mission
Créer `src/services/auth.ts` - **Les autres vous attendent!**

### C'est quoi?
3 fonctions + 1 variable globale = fondations de l'app

### À faire
1. Créer le fichier dans `src/services/auth.ts`
2. Copier le code de GUIDE_COMPLET.md
3. Tester la formule pour les 7 jours:
   - Lundi → 1 ✅
   - Mardi → 4 ✅
   - Mercredi → 4 ✅
   - Jeudi → 1 ✅
   - **Vendredi → 0** (cas spécial!) ✅
   - Samedi → 1 ✅
   - Dimanche → 4 ✅
4. Signaler quand c'est prêt! 🚀

### Checklist
- [ ] Fichier créé
- [ ] Code copié
- [ ] Compile sans erreur
- [ ] Formule testée ✅

---

## BINÔME 01 - LockScreen (Biométrie)

### Votre mission
Créer `src/screens/LockScreen.tsx` - L'écran de déverrouillage

### C'est quoi?
2 boutons: "👆 Biométrie" et "📱 Secouer"

### À faire
1. Attendre que BINÔME 03 signale OK ⏳
2. Créer `src/screens/LockScreen.tsx`
3. Copier le code de GUIDE_COMPLET.md
4. Tester:
   - Les 2 boutons s'affichent ✅
   - Clic biométrie montre ⏳ pendant 500ms ✅
   - Clic secouer change d'écran ✅

### Points clés
- `useState(false)` = variable loading
- Lors du clic: loading=true → attendre 500ms → appeler onBio() → loading=false
- L'écran affiche ⏳ pendant l'attente

### Checklist
- [ ] Fichier créé
- [ ] Code copié
- [ ] Compile sans erreur
- [ ] 2 boutons affichés ✅

---

## BINÔME 02 - AccelScreen (Accéléromètre)

### Votre mission
Créer `src/screens/AccelScreen.tsx` - Compter les secousses du téléphone

### C'est quoi?
Écran qui compte les mouvements du téléphone jusqu'à un certain nombre.

### À faire
1. Attendre que BINÔME 03 signale OK ⏳
2. Créer `src/screens/AccelScreen.tsx`
3. Copier le code de GUIDE_COMPLET.md
4. Tester:
   - Secouer le téléphone → compteur augmente ✅
   - Vibration à chaque shake ✅
   - Quand compteur atteint le nombre requis → "✅ Déverrouillé!" ✅
   - Vendredi: affiche un bouton spécial au lieu de compter ✅

### Points clés
- **2 useEffect:**
  1. Calculate required shakes using formula
  2. Listen to accelerometer
- Magnitude = √(x² + y² + z²) = force du mouvement
- Magnitude > 3.0 = c'est un vrai shake
- Délai 300ms = évite de compter un seul gros shake comme 10
- Vendredi: required === 0 → cas spécial

### TESTER sur AVD vs Téléphone

**Sur AVD (Émulateur):**
```
Côté droit de l'écran → Accéléromètre controls
OU Ctrl + numpad 2/4/6/8 pour secouer
Doit afficher mouvement dans l'app ✅
```

**Sur téléphone physique:**
```
Secouer PHYSIQUEMENT le téléphone 📱
Le compteur devrait augmenter ✅
Vibration ressentie ✅
```

### Checklist
- [ ] Fichier créé
- [ ] Code copié
- [ ] Compile sans erreur
- [ ] Secouer fonctionne sur votre plateforme (AVD OU téléphone) ✅
- [ ] Vibration marche ✅
- [ ] Vendredi = cas spécial ✅

---

## BINÔME 04 - Navigation (App.tsx + HomeScreen)

### Votre mission
Créer la navigation entre les écrans + l'écran d'accueil

### C'est quoi?
2 fichiers:
- `src/screens/HomeScreen.tsx` = écran d'accueil
- `App.tsx` = navigation (décide quel écran afficher)

### À faire
1. Attendre que BINÔME 03 signale OK ⏳
2. Créer `src/screens/HomeScreen.tsx`
3. Modifier `App.tsx`
4. Copier les codes de GUIDE_COMPLET.md
5. Tester:
   - App affiche LockScreen au démarrage ✅
   - Clic biométrie → HomeScreen ✅
   - Clic verrouiller → LockScreen ✅
   - Clic secouer → AccelScreen ✅
   - Assez de shakes → HomeScreen ✅

### Points clés
- `useState('lock')` = écran actuel (lock, home, ou accel)
- Affichage conditionnel: `{screen === 'lock' && <LockScreen ... />}`
- Chaque écran a des callbacks: onBio, onAccel, onSuccess, onBack, onLock
- App.tsx change l'état quand callbacks sont appelés

### Checklist
- [ ] HomeScreen.tsx créé
- [ ] App.tsx modifié
- [ ] Code copié
- [ ] Compile sans erreur ✅
- [ ] Navigation fonctionne ✅

---

## 📋 TIMELINE

```
09:00 → npm install
09:15 → BINÔME 03 commence
09:30 → BINÔME 03 tests
10:00 → BINÔME 03 signale OK
10:00 → BINÔME 01, 02, 04 commencent en parallèle
10:45 → Chacun teste son écran
11:15 → BINÔME 04 intègre tout
11:45 → Tests d'intégration
12:00 → DEMO ✅
```

---

**Besoin d'aide? Allez lire FAQ.md ou les commentaires dans le code!**
