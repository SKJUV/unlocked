# ❓ FAQ - Questions Fréquentes

## Installation

**Q: npm install prend trop longtemps!**  
A: Normal! Première fois = 10-20 min. Lisez la doc en attendant.

**Q: "command not found: npm"**  
A: Installer Node.js depuis https://nodejs.org/

**Q: "ça marche pas, erreur complète"**  
A: Copier l'erreur complète et la chercher sur Google. 95% du temps, c'est dedans!

---

## BINÔME 03 - Services

**Q: Comment tester la formule?**  
A: Vérifier pour les 7 jours:
- Jour 1 (Lundi) → (1×1) % 5 = 1 ✅
- Jour 5 (Vendredi) → (5×5) % 5 = 0 ✅

**Q: Pourquoi vendredi c'est 0?**  
A: C'est magique! 5² = 25, et 25 % 5 = 0.

**Q: Mes fonctions n'exécutent pas?**  
A: Vérifier les `export` en haut du fichier.

---

## BINÔME 01 - LockScreen

**Q: Pourquoi 500ms d'attente?**  
A: Simule le temps réel d'empreinte. Plus réaliste!

**Q: Le bouton montre ⏳ mais rien ne change après?**  
A: C'est normal! Après 500ms, onBio() est appelé et l'écran change.

---

## BINÔME 02 - AccelScreen

**Q: L'accéléromètre ne détecte rien!**  
A: Vérifier:
- `npm install react-native-sensors` fait?
- Vous testez sur un VRAI téléphone (pas juste l'émulateur)?

**Q: Pourquoi magnitude > 3.0?**  
A: Seuil pour déterminer si c'est un vrai shake. Pas trop sensible.

**Q: Pourquoi 300ms?**  
A: Évite de compter UN gros mouvement comme 10 petits shakes.

**Q: Vendredi, rien ne s'affiche?**  
A: Vérifier: `if (required === 0)` affiche cas spécial.

---

## BINÔME 04 - Navigation

**Q: Comment useState marche?**  
A: 
```typescript
const [screen, setScreen] = useState('lock');
// screen = valeur actuelle
// setScreen = fonction pour changer
```

**Q: Un écran ne s'affiche pas?**  
A: Vérifier:
- Import correct en haut? ✅
- Props correctes? ✅
- Condition ternaire juste? ✅

**Q: Mon app boucle infiniment?**  
A: Vérifier: setScreen() ne s'appelle pas infiniment.

---

## Général

**Q: Je sais pas par où commencer?**  
A: START_HERE.md → GUIDE_COMPLET.md → EXPLICATIONS_BINOMES.md

**Q: Comment je sais si mon code est bon?**  
A: Tester:
- Compile sans erreur ✅
- L'app se lance ✅
- Votre écran s'affiche ✅
- Les boutons répondent ✅

**Q: J'ai pas de temps!**  
A: Priorité: Code de votre binôme. Optionnel: UI parfaite.

**Q: Comment collaborer?**  
A: BINÔME 03 d'abord. Autres en parallèle après. BINÔME 04 intègre tout.

---

**Pas de réponse? Google c'est votre ami! 🚀**
