# 日本語ラボ — Nihongo Lab

🇯🇵🇰🇷 Appli web **responsive et installable (PWA)** pour apprendre le **japonais** et le **coréen**, inspirée de Duolingo : alphabets, vocabulaire, grammaire, phrases de voyage, quiz, écriture et prononciation — avec une mascotte par langue.

- 🐱 **Maneki-neko** t'accompagne en japonais
- 🐯 **Horangi** (le tigre coréen) t'accompagne en coréen
- 🌸 Thème visuel dédié à chaque langue (couleurs, motifs, pétales)

## ✨ Fonctionnalités

| Langue | Japonais 🇯🇵 | Coréen 🇰🇷 |
|---|---|---|
| **Alphabets** | Hiragana + Katakana (208 kana) | Hangeul (40 lettres) |
| **Vocabulaire** | ~150 mots en 12 thèmes | ~150 mots en 12 thèmes |
| **Grammaire** | Particules, formes verbales… | Particules, honorifiques… |
| **Phrases de voyage** | Tokyo, gare, onsen… | Séoul, métro, jjimjilbang… |

- 🎯 **Quiz** progressifs avec feedback et XP
- ✏️ **Entraînement à l'écriture** (tracé animé)
- 🎤 **Exercices de prononciation** avec reconnaissance vocale et score
- 🔊 **Audio** avec les meilleures voix natives disponibles
- 📱 **PWA** : installable sur téléphone, fonctionne hors-ligne
- 🌙 **Dark mode**
- 💾 Progression sauvegardée localement dans le navigateur (localStorage), séparée par langue

## 🛠 Technologies

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** + **shadcn/ui**
- **Framer Motion** (animations)
- **Bun** (gestionnaire de paquets)

> ℹ️ L'app est **100 % locale** : aucune base de données, aucun compte utilisateur. Toute la progression est stockée dans le navigateur (localStorage).

## 🚀 Installation

Prérequis : [Bun](https://bun.sh) ≥ 1.x et Node.js ≥ 20.

```bash
# 1. Installer les dépendances
bun install

# 2. Lancer le serveur de développement
bun run dev
```

Ouvre ensuite `http://localhost:5173`.

## 🏗 Build de production

```bash
bun run build
```

Le build est généré dans `dist/`. Pour le prévisualiser :

```bash
bun run preview
```

## 🔐 Variables d'environnement

Copie les variables ci-dessous dans un fichier `.env.local` à la racine du projet (ce fichier ne doit **jamais** être commité — il est ignoré par `.gitignore`).

| Variable | Requise | Description |
|---|---|---|
| `VITE_VLY_APP_ID` | Non | Identifiant d'app pour le monitoring d'erreurs (plateforme Freebuff) |
| `VITE_VLY_MONITORING_URL` | Non | Endpoint d'envoi des erreurs runtime (plateforme Freebuff) |

> ℹ️ Sur la plateforme Freebuff, ces variables sont injectées automatiquement. Aucune n'est nécessaire pour faire tourner l'app en local.

⚠️ **Ne commit jamais les vraies valeurs de ces variables.**

## 📁 Structure du projet

```
src/
├── components/       # UI de l'app (tabs, quiz, mascottes, écriture…)
│   └── ui/           # Primitives shadcn/ui
├── contexts/         # Contexte de langue (japonais/coréen)
├── data/             # Contenus pédagogiques (japonais + coréen)
├── hooks/            # Progression, PWA
├── lib/              # Moteur de quiz, synthèse vocale, prononciation
└── pages/            # Landing (l'app), NotFound
public/               # Icons, manifest PWA, service worker
```

## 📝 Remarques

- L'app est conçue **mobile-first** : installe-la sur ton téléphone via « Ajouter à l'écran d'accueil » (iOS) ou « Installer l'app » (Android).
- La progression est stockée dans `localStorage` — elle est propre à chaque navigateur.
- Le contenu pédagogique vit dans `src/data/` : facile à enrichir.
