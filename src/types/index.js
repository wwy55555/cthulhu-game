/**
 * Game Type Definitions
 */

export const CharacterClass = {
  INVESTIGATOR: 'investigator',
  OCCULTIST: 'occultist',
  SCHOLAR: 'scholar',
  SOLDIER: 'soldier'
};

export const GameState = {
  MENU: 'menu',
  CHARACTER_CREATE: 'character_create',
  PLAYING: 'playing',
  DIALOGUE: 'dialogue',
  BATTLE: 'battle',
  GAME_OVER: 'game_over',
  END_GAME: 'end_game'
};

export const SanityLevel = {
  STABLE: 'stable',
  ANXIOUS: 'anxious',
  TERRIFIED: 'terrified',
  INSANE: 'insane'
};

export const EncounterType = {
  EXPLORATION: 'exploration',
  MONSTER: 'monster',
  NPC: 'npc',
  RITUAL: 'ritual',
  ARTIFACT: 'artifact'
};
