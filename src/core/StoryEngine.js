import { EncounterType } from '../types/index.js';

export class StoryEngine {
  constructor() {
    this.currentChapter = 0;
    this.locations = this.initializeLocations();
    this.questLines = this.initializeQuestLines();
    this.npcs = this.initializeNPCs();
  }

  initializeLocations() {
    return {
      'Arkham': {
        name: 'Arkham, Massachusetts',
        description: 'A city shrouded in mystery and ancient secrets. The Miskatonic University stands as a beacon of knowledge.',
        encounters: [
          {
            type: EncounterType.NPC,
            name: 'Professor Henry Armitage',
            dialogue: 'Greetings, investigator. I have information about strange happenings at the old Marsh Estate...'
          }
        ]
      },
      'Innsmouth': {
        name: 'Innsmouth',
        description: 'A decaying coastal town, home to strange fishermen and older, deeper things...',
        encounters: [
          {
            type: EncounterType.MONSTER,
            enemy: 'DEEP_ONE',
            description: 'A figure emerges from the murky water...'
          }
        ]
      },
      'Miskatonic University': {
        name: 'Miskatonic University',
        description: 'An ancient library filled with forbidden knowledge. Books line the shelves, some bound in strange materials...',
        encounters: [
          {
            type: EncounterType.ARTIFACT,
            name: 'Necronomicon',
            description: 'The legendary grimoire! Its very presence fills you with dread...'
          }
        ]
      },
      'Marsh Estate': {
        name: 'Marsh Estate',
        description: 'A crumbling mansion surrounded by ancient stones and strange symbols. An air of decay hangs over everything.',
        encounters: [
          {
            type: EncounterType.RITUAL,
            name: 'Ritual Chamber',
            description: 'An underground chamber where unspeakable rituals have been performed...'
          }
        ]
      }
    };
  }

  initializeQuestLines() {
    return {
      'main': {
        title: 'The Cosmic Truth',
        description: 'Uncover the truth about the cult and their connection to beings beyond our reality.',
        stages: [
          { id: 1, title: 'Investigate the Marshes', completed: false },
          { id: 2, title: 'Meet with Professor Armitage', completed: false },
          { id: 3, title: 'Find the Necronomicon', completed: false },
          { id: 4, title: 'Confront the Cult Leader', completed: false },
          { id: 5, title: 'Choose Your Fate', completed: false }
        ]
      },
      'innsmouth': {
        title: 'The Deep Ones\' Secret',
        description: 'Discover the connection between the townsfolk and the entities from the sea.',
        stages: [
          { id: 1, title: 'Explore Innsmouth', completed: false },
          { id: 2, title: 'Find evidence of the pact', completed: false },
          { id: 3, title: 'Escape or join them', completed: false }
        ]
      }
    };
  }

  initializeNPCs() {
    return {
      'Professor Henry Armitage': {
        name: 'Professor Henry Armitage',
        description: 'A wise scholar of Miskatonic University',
        dialogue: [
          'The old knowledge is not meant to be known by mortal minds...',
          'I have seen things that would drive lesser men to madness.',
          'If you proceed on this path, there is no going back.'
        ]
      },
      'Nameless Cultist': {
        name: 'Nameless Cultist',
        description: 'A devotee of Cthulhu',
        dialogue: [
          'Ph\'nglui mglw\'nafh Cthulhu R\'lyeh wgah\'nagl fhtagn!',
          'The great old one stirs...',
          'Soon the stars will align and the end times shall come!'
        ]
      },
      'Strange Fisherman': {
        name: 'Strange Fisherman',
        description: 'A suspicious figure from Innsmouth',
        dialogue: [
          'Ye best be careful \'round these parts, stranger...',
          'The sea calls to them what knows her ways.',
          'There\'s things in the deep that would make ye wish fer death.'
        ]
      }
    };
  }

  getLocation(locationName) {
    return this.locations[locationName] || null;
  }

  getRandomEncounter(locationName) {
    const location = this.getLocation(locationName);
    if (location && location.encounters.length > 0) {
      return location.encounters[Math.floor(Math.random() * location.encounters.length)];
    }
    return null;
  }

  getLocationNames() {
    return Object.keys(this.locations);
  }

  getNPC(npcName) {
    return this.npcs[npcName] || null;
  }

  getNPCDialogue(npcName) {
    const npc = this.getNPC(npcName);
    if (npc && npc.dialogue.length > 0) {
      return npc.dialogue[Math.floor(Math.random() * npc.dialogue.length)];
    }
    return 'The person remains silent...';
  }
}
