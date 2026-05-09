export class Enemy {
  constructor(name, health, attack, defense, sanityDamage, description) {
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    this.attack = attack;
    this.defense = defense;
    this.sanityDamage = sanityDamage;
    this.description = description;
    this.loot = [];
    this.experience = 0;
  }

  takeDamage(amount) {
    this.health = Math.max(0, this.health - amount);
    return this.health;
  }

  getAttackDamage() {
    const variance = this.attack * 0.2;
    const damage = this.attack + (Math.random() - 0.5) * 2 * variance;
    return Math.floor(Math.max(1, damage));
  }

  isAlive() {
    return this.health > 0;
  }

  addLoot(item) {
    this.loot.push(item);
  }
}

// 预定义的敌人
export const EnemyTypes = {
  CULTIST: new Enemy(
    'Cultist',
    30,
    15,
    5,
    10,
    'A hooded cultist chanting in an unknown language...'
  ),
  GHOUL: new Enemy(
    'Ghoul',
    50,
    20,
    8,
    25,
    'A grotesque creature, half-human, half-beast, clawing at the darkness...'
  ),
  SHOGGOTH: new Enemy(
    'Shoggoth',
    100,
    35,
    15,
    50,
    'A massive, writhing mass of tentacles and eyes - a truly cosmic horror!'
  ),
  DEEP_ONE: new Enemy(
    'Deep One',
    70,
    25,
    12,
    40,
    'An amphibious creature from the deep, with an ancient and alien intelligence...'
  ),
  NIGHTMARE: new Enemy(
    'Nightmare',
    60,
    28,
    10,
    45,
    'A creature born from the darkest nightmares, bathed in eldritch light...'
  )
};
