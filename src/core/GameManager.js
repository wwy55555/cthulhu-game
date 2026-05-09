import { Player } from './Player.js';
import { StoryEngine } from './StoryEngine.js';
import { BattleSystem } from './BattleSystem.js';
import { GameState, CharacterClass, EncounterType } from '../types/index.js';
import { EnemyTypes } from './Enemy.js';
import { GameUI } from '../ui/GameUI.js';

export class GameManager {
  constructor() {
    this.player = null;
    this.storyEngine = new StoryEngine();
    this.battleSystem = new BattleSystem();
    this.gameState = GameState.MENU;
    this.currentEnemy = null;
    this.isInBattle = false;
  }

  createPlayer(name, characterClass) {
    this.player = new Player(name, characterClass);
    this.gameState = GameState.PLAYING;
    return this.player;
  }

  moveToLocation(locationName) {
    const location = this.storyEngine.getLocation(locationName);
    if (location) {
      this.player.location = locationName;
      return location;
    }
    return null;
  }

  getAvailableLocations() {
    return this.storyEngine.getLocationNames();
  }

  triggerEncounter() {
    const encounter = this.storyEngine.getRandomEncounter(this.player.location);
    if (!encounter) return null;

    switch (encounter.type) {
      case EncounterType.NPC:
        return {
          type: 'dialogue',
          npc: encounter.name,
          dialogue: this.storyEngine.getNPCDialogue(encounter.name)
        };
      case EncounterType.MONSTER:
        return this.startCombat(encounter.enemy);
      case EncounterType.ARTIFACT:
        return {
          type: 'artifact',
          name: encounter.name,
          description: encounter.description
        };
      case EncounterType.RITUAL:
        return {
          type: 'ritual',
          name: encounter.name,
          description: encounter.description
        };
      default:
        return null;
    }
  }

  startCombat(enemyType) {
    let enemy;
    if (typeof enemyType === 'string') {
      enemy = EnemyTypes[enemyType];
    } else {
      enemy = enemyType;
    }

    this.currentEnemy = { ...enemy }; // Clone to avoid modifying original
    this.isInBattle = true;
    this.battleSystem.startBattle(this.player, this.currentEnemy);
    return {
      type: 'battle_start',
      enemy: this.currentEnemy
    };
  }

  executeCombatTurn(playerAction = 'attack') {
    if (!this.isInBattle || !this.currentEnemy) return null;

    const result = this.battleSystem.executeTurn(this.player, this.currentEnemy, playerAction);

    if (!this.currentEnemy.isAlive()) {
      this.battleSystem.endBattle(this.player, this.currentEnemy, true);
      this.isInBattle = false;
      return { ...result, battleEnd: true, victory: true };
    }

    if (this.player.isDead() || this.player.isInsane()) {
      this.battleSystem.endBattle(this.player, this.currentEnemy, false);
      this.isInBattle = false;
      return { ...result, battleEnd: true, victory: false };
    }

    return result;
  }

  getBattleLog() {
    return this.battleSystem.getBattleLog();
  }

  checkGameOver() {
    if (this.player.isDead()) {
      return { gameOver: true, reason: 'You have been defeated...' };
    }
    if (this.player.isInsane()) {
      return { gameOver: true, reason: 'Your mind has shattered from cosmic horror!' };
    }
    return { gameOver: false };
  }

  getGameStatus() {
    return {
      player: this.player.getStatus(),
      location: this.player.location,
      inBattle: this.isInBattle
    };
  }
}
