export class BattleSystem {
  constructor() {
    this.turnCount = 0;
    this.combatLog = [];
  }

  startBattle(player, enemy) {
    this.turnCount = 0;
    this.combatLog = [];
    this.combatLog.push(`\n⚔️  BATTLE START: ${player.name} vs ${enemy.name}\n`);
    this.combatLog.push(`${enemy.description}\n`);
  }

  playerAttack(player, enemy) {
    const skill = player.skills.combat;
    const hitChance = skill + (Math.random() * 30 - 15); // ±15 variance
    const isCrit = Math.random() < 0.2; // 20% critical chance

    if (hitChance > 50) {
      const baseDamage = 15 + (player.level * 2);
      const damage = isCrit ? baseDamage * 1.5 : baseDamage;
      const finalDamage = Math.floor(Math.max(1, damage - enemy.defense));

      enemy.takeDamage(finalDamage);
      const message = isCrit
        ? `⚡ CRITICAL HIT! You deal ${finalDamage} damage!`
        : `✓ You attack! Deal ${finalDamage} damage.`;
      this.combatLog.push(message);
      return { hit: true, damage: finalDamage, crit: isCrit };
    } else {
      this.combatLog.push(`✗ Your attack misses!`);
      return { hit: false, damage: 0, crit: false };
    }
  }

  enemyAttack(player, enemy) {
    const damage = enemy.getAttackDamage();
    const actualDamage = Math.max(1, damage - 5); // Simple defense
    player.takeDamage(actualDamage);
    this.combatLog.push(`💥 ${enemy.name} attacks! You take ${actualDamage} damage.`);
    return actualDamage;
  }

  enemySanityAttack(player, enemy) {
    const sanityLoss = player.loseSanity(enemy.sanityDamage);
    if (sanityLoss > 0) {
      this.combatLog.push(`😨 Witnessing such cosmic horror! You lose ${sanityLoss} sanity.`);
    }
    return sanityLoss;
  }

  executeTurn(player, enemy, playerAction = 'attack') {
    this.turnCount += 1;
    this.combatLog.push(`\n--- Turn ${this.turnCount} ---`);

    // Player's turn
    if (playerAction === 'attack') {
      this.playerAttack(player, enemy);
    } else if (playerAction === 'defend') {
      this.combatLog.push(`🛡️  You take a defensive stance!`);
    }

    // Enemy's turn (if still alive)
    if (enemy.isAlive()) {
      this.enemyAttack(player, enemy);
      this.enemySanityAttack(player, enemy);
    }

    return {
      playerAlive: !player.isDead(),
      enemyAlive: enemy.isAlive(),
      log: this.combatLog[this.combatLog.length - 1]
    };
  }

  endBattle(player, enemy, victory) {
    if (victory) {
      player.addExperience(enemy.experience || 50);
      this.combatLog.push(`\n✨ VICTORY! You defeated the ${enemy.name}!`);
      this.combatLog.push(`📈 Gained ${enemy.experience || 50} experience points!`);

      if (enemy.loot.length > 0) {
        this.combatLog.push(`\n📦 Loot:`);
        enemy.loot.forEach(item => {
          player.addItem(item);
          this.combatLog.push(`  + ${item.name}`);
        });
      }
    } else {
      this.combatLog.push(`\n💀 DEFEAT! You have been defeated by the ${enemy.name}...`);
    }
  }

  getBattleLog() {
    return this.combatLog.join('\n');
  }
}
