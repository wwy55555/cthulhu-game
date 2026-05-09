import chalk from 'chalk';

export class GameUI {
  static clearScreen() {
    console.clear();
  }

  static printTitle() {
    console.log(chalk.red.bold(`
╔════════════════════════════════════════╗
║                                        ║
║    🌀 CTHULHU'S CALL 🌀                ║
║    A Text-Based Cosmic Horror Game    ║
║                                        ║
╚════════════════════════════════════════╝
    `));
  }

  static printMenu() {
    console.log(chalk.cyan(`
╔════════════════════════════════════════╗
║         MAIN MENU               ║
╠════════════════════════════════════════╣
║ 1. New Game                     ║
║ 2. Load Game                    ║
║ 3. Settings                     ║
║ 4. Exit                         ║
╚════════════════════════════════════════╝
    `));
  }

  static printStatus(player) {
    console.log(chalk.yellow(`
╔════════════════════════════════════════╗
║  ${player.name.padEnd(37)}║
╠════════════════════════════════════════╣
║ Level: ${String(player.level).padEnd(32)}║
║ Health: ${String(player.health + '/' + player.maxHealth).padEnd(30)}║
║ Sanity: ${String(player.sanity + '/' + player.maxSanity).padEnd(30)}║
║ Status: ${String(player.getSanityLevel()).padEnd(31)}║
║ Location: ${String(player.location).padEnd(29)}║
║ Knowledge: ${String(player.knowledge).padEnd(28)}║
╚════════════════════════════════════════╝
    `));
  }

  static printInventory(player) {
    console.log(chalk.green(`
📦 INVENTORY (${player.inventory.length} items):
`));
    if (player.inventory.length === 0) {
      console.log(chalk.dim('  (empty)'));
    } else {
      player.inventory.forEach((item, index) => {
        console.log(`  ${index + 1}. ${item.name} - ${item.description}`);
      });
    }
    console.log();
  }

  static printDialogue(npcName, dialogue) {
    console.log(chalk.blue.italic(`
"${dialogue}"
- ${npcName}
    `));
  }

  static printEncounter(description) {
    console.log(chalk.magenta(`
${description}
    `));
  }

  static printError(message) {
    console.log(chalk.red(`
❌ ${message}
    `));
  }

  static printSuccess(message) {
    console.log(chalk.green(`
✅ ${message}
    `));
  }

  static printWarning(message) {
    console.log(chalk.yellow(`
⚠️  ${message}
    `));
  }

  static printQuestion(message) {
    console.log(chalk.cyan(`
❓ ${message}
    `));
  }

  static printDamage(amount, type = 'normal') {
    if (type === 'critical') {
      console.log(chalk.red.bold(`⚡ CRITICAL: ${amount} damage!`));
    } else if (type === 'sanity') {
      console.log(chalk.magenta(`😨 Sanity loss: ${amount}`));
    } else {
      console.log(chalk.red(`💥 Damage: ${amount}`));
    }
  }

  static printBattleLog(log) {
    console.log(chalk.red.bold(log));
  }

  static printGameOver(reason) {
    console.log(chalk.red.bold(`
╔════════════════════════════════════════╗
║                                        ║
║              GAME OVER                 ║
║  ${reason.padEnd(38)}║
║                                        ║
╚════════════════════════════════════════╝
    `));
  }

  static printEnding(title, description) {
    console.log(chalk.yellow.bold(`
╔════════════════════════════════════════╗
║                                        ║
║  ${title.padEnd(38)}║
║                                        ║
╚════════════════════════════════════════╝

${description}
    `));
  }
}
