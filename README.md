# 🌀 Cthulhu's Call - Cosmic Horror Game Engine

A text-based Cthulhu-themed adventure game built with Node.js. Explore the dark world of cosmic horror, face eldritch entities, and maintain your sanity as you uncover ancient secrets.

## Features

### 🎮 Gameplay
- **Character Classes**: Investigator, Occultist, Scholar, Soldier - each with unique skills
- **Dynamic Combat System**: Turn-based battles with critical hits and sanity damage
- **Sanity Mechanic**: Witnessing cosmic horrors damages your mental state
- **Location System**: Multiple locations to explore (Arkham, Innsmouth, Miskatonic University, Marsh Estate)
- **NPC Interactions**: Meet mysterious characters and uncover cosmic truths
- **Inventory System**: Collect items and artifacts
- **Experience & Leveling**: Grow stronger as you progress

### 📖 Story Elements
- Multiple quest lines
- Encounters: NPCs, Monsters, Artifacts, Rituals
- Branching narratives based on choices
- Multiple endings

### 👾 Enemies
- **Cultist**: Fanatical servants of the old ones
- **Ghoul**: Grotesque creatures of the underground
- **Shoggoth**: Massive cosmic horrors
- **Deep One**: Amphibious beings from the depths
- **Nightmare**: Creatures from darkest dreams

## Installation

```bash
# Clone the repository
git clone https://github.com/wwy55555/cthulhu-game.git
cd cthulhu-game

# Install dependencies
npm install
```

## Quick Start

```bash
# Run the game
npm start

# Development mode with auto-reload
npm run dev
```

## How to Play

1. **Create a Character**: Choose your name and class
2. **Explore Locations**: Travel between different locations
3. **Encounter Enemies**: Fight monsters or meet NPCs
4. **Manage Resources**: Keep your health and sanity in check
5. **Progress the Story**: Uncover the truth about the cult
6. **Achieve an Ending**: Different choices lead to different outcomes

## Game Mechanics

### Sanity System
- Start with 100 sanity points
- Lose sanity when encountering cosmic horrors
- Higher sanity resistance reduces sanity damage
- Game over if sanity reaches 0

### Combat
- Turn-based system
- Attack, Defend, or Flee options
- Critical hits (20% chance)
- Damage reduction based on defense

### Character Progression
- Gain experience from defeating enemies
- Level up to improve stats
- Unlock new abilities
- Improve all skills gradually

## Architecture

```
src/
├── core/
│   ├── Player.js           # Player class and character management
│   ├── Enemy.js            # Enemy definitions and combat
│   ├── StoryEngine.js      # Story, locations, NPCs, quests
│   ├── BattleSystem.js     # Combat mechanics
│   └── GameManager.js      # Main game controller
├── ui/
│   └── GameUI.js           # User interface and display
├── types/
│   └── index.js            # TypeScript-like type definitions
└── index.js                # Entry point
```

## Extending the Game

### Add New Enemies
```javascript
const AZAZOTH = new Enemy(
  'Azazoth the Blind Idiot God',
  150,
  40,
  20,
  80,
  'A cosmic entity beyond comprehension emerges from the void...'
);
```

### Add New Locations
```javascript
locations['Dunwich'] = {
  name: 'Dunwich',
  description: 'A cursed village where strange things happen...',
  encounters: [
    {
      type: EncounterType.MONSTER,
      enemy: 'NIGHTMARE',
      description: 'Something stirs in the darkness...'
    }
  ]
};
```

### Add New NPCs
```javascript
npcs['Keziah Mason'] = {
  name: 'Keziah Mason',
  description: 'An ancient witch with forbidden knowledge',
  dialogue: [
    'The rats in the walls... they speak to me...'
  ]
};
```

## Future Enhancements

- [ ] Save/Load game state
- [ ] More complex dialogue system
- [ ] Item crafting system
- [ ] Spells and rituals
- [ ] Multiplayer elements
- [ ] Web-based UI
- [ ] Sound effects and music
- [ ] Achievements system

## Technologies

- **Node.js**: Runtime
- **Inquirer.js**: Interactive CLI prompts
- **Chalk**: Terminal styling

## Contributing

Contributions are welcome! Feel free to:
- Add new story content
- Create new enemies and locations
- Improve game mechanics
- Fix bugs

## License

MIT

## Author

wwy55555

## Acknowledgments

- Inspired by H.P. Lovecraft's Cthulhu Mythos
- Text-based adventure game traditions
- The community of cosmic horror enthusiasts

---

**Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn!**

*"In his house at R'lyeh, dead Cthulhu waits dreaming."*
