import { CharacterClass, SanityLevel } from '../types/index.js';

export class Player {
  constructor(name, characterClass) {
    this.name = name;
    this.class = characterClass;
    this.level = 1;
    this.experience = 0;
    this.health = 100;
    this.maxHealth = 100;
    this.sanity = 100;
    this.maxSanity = 100;
    this.inventory = [];
    this.weapons = [];
    this.artifacts = [];
    this.knowledge = 0; // 克苏鲁知识值
    this.skills = this.initializeSkills(characterClass);
    this.location = 'Arkham';
    this.questLog = [];
  }

  initializeSkills(characterClass) {
    const baseSkills = {
      investigate: 50,
      combat: 30,
      occult: 20,
      persuade: 40,
      sanity_resistance: 40
    };

    switch (characterClass) {
      case CharacterClass.INVESTIGATOR:
        return { ...baseSkills, investigate: 70, combat: 50 };
      case CharacterClass.OCCULTIST:
        return { ...baseSkills, occult: 80, sanity_resistance: 60 };
      case CharacterClass.SCHOLAR:
        return { ...baseSkills, investigate: 75, occult: 50 };
      case CharacterClass.SOLDIER:
        return { ...baseSkills, combat: 80, sanity_resistance: 50 };
      default:
        return baseSkills;
    }
  }

  takeDamage(amount) {
    this.health = Math.max(0, this.health - amount);
    return this.health;
  }

  heal(amount) {
    this.health = Math.min(this.maxHealth, this.health + amount);
  }

  loseSanity(amount) {
    const sanityLoss = Math.floor(amount * (1 - this.skills.sanity_resistance / 100));
    this.sanity = Math.max(0, this.sanity - sanityLoss);
    return sanityLoss;
  }

  recoverSanity(amount) {
    this.sanity = Math.min(this.maxSanity, this.sanity + amount);
  }

  getSanityLevel() {
    const percentage = (this.sanity / this.maxSanity) * 100;
    if (percentage > 75) return SanityLevel.STABLE;
    if (percentage > 50) return SanityLevel.ANXIOUS;
    if (percentage > 25) return SanityLevel.TERRIFIED;
    return SanityLevel.INSANE;
  }

  addItem(item) {
    this.inventory.push(item);
  }

  removeItem(itemName) {
    const index = this.inventory.findIndex(item => item.name === itemName);
    if (index !== -1) {
      this.inventory.splice(index, 1);
      return true;
    }
    return false;
  }

  hasItem(itemName) {
    return this.inventory.some(item => item.name === itemName);
  }

  addExperience(amount) {
    this.experience += amount;
    if (this.experience >= this.level * 100) {
      this.levelUp();
    }
  }

  levelUp() {
    this.level += 1;
    this.maxHealth += 20;
    this.health = this.maxHealth;
    this.maxSanity += 10;
    this.sanity = Math.min(this.sanity + 10, this.maxSanity);
    Object.keys(this.skills).forEach(skill => {
      this.skills[skill] += 5;
    });
  }

  getStatus() {
    return {
      name: this.name,
      class: this.class,
      level: this.level,
      health: `${this.health}/${this.maxHealth}`,
      sanity: `${this.sanity}/${this.maxSanity}`,
      sanity_level: this.getSanityLevel(),
      knowledge: this.knowledge,
      location: this.location,
      inventory_count: this.inventory.length
    };
  }

  isDead() {
    return this.health <= 0;
  }

  isInsane() {
    return this.sanity <= 0;
  }
}
