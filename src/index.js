import inquirer from 'inquirer';
import chalk from 'chalk';
import { GameManager } from './core/GameManager.js';
import { GameUI } from './ui/GameUI.js';
import { CharacterClass, GameState } from './types/index.js';

const game = new GameManager();

async function main() {
  GameUI.clearScreen();
  GameUI.printTitle();

  while (true) {
    if (game.gameState === GameState.MENU) {
      await mainMenu();
    } else if (game.gameState === GameState.CHARACTER_CREATE) {
      await characterCreation();
    } else if (game.gameState === GameState.PLAYING) {
      await gameLoop();
    }
  }
}

async function mainMenu() {
  GameUI.printMenu();
  const answer = await inquirer.prompt([{
    type: 'list',
    name: 'choice',
    message: 'Choose an option:',
    choices: ['New Game', 'Exit']
  }]);

  if (answer.choice === 'New Game') {
    game.gameState = GameState.CHARACTER_CREATE;
  } else {
    process.exit(0);
  }
}

async function characterCreation() {
  GameUI.clearScreen();
  console.log(chalk.cyan('\n=== CHARACTER CREATION ===\n'));

  const nameAnswer = await inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: 'Enter your character name:',
    default: 'Investigator'
  }]);

  const classAnswer = await inquirer.prompt([{
    type: 'list',
    name: 'class',
    message: 'Choose your class:',
    choices: [
      { name: 'Investigator (High combat & investigation)', value: CharacterClass.INVESTIGATOR },
      { name: 'Occultist (Master of the occult)', value: CharacterClass.OCCULTIST },
      { name: 'Scholar (Excellent investigator)', value: CharacterClass.SCHOLAR },
      { name: 'Soldier (Combat expert)', value: CharacterClass.SOLDIER }
    ]
  }]);

  game.createPlayer(nameAnswer.name, classAnswer.class);
  GameUI.printSuccess(`Welcome, ${game.player.name}!`);
  await new Promise(resolve => setTimeout(resolve, 1500));
}

async function gameLoop() {
  while (game.gameState === GameState.PLAYING && !game.player.isDead() && !game.player.isInsane()) {
    GameUI.clearScreen();
    GameUI.printStatus(game.player);

    // Check for encounters randomly
    if (Math.random() < 0.3) {
      await handleEncounter();
    }

    const actions = [
      'Explore current location',
      'View Inventory',
      'View Status',
      'Travel to another location',
      'Rest and recover',
      'Quit Game'
    ];

    const answer = await inquirer.prompt([{
      type: 'list',
      name: 'action',
      message: 'What do you do?',
      choices: actions
    }]);

    switch (answer.action) {
      case 'Explore current location':
        await handleEncounter();
        break;
      case 'View Inventory':
        GameUI.clearScreen();
        GameUI.printInventory(game.player);
        await inquirer.prompt([{ type: 'input', name: 'continue', message: 'Press Enter to continue...' }]);
        break;
      case 'View Status':
        // Already displayed
        await inquirer.prompt([{ type: 'input', name: 'continue', message: 'Press Enter to continue...' }]);
        break;
      case 'Travel to another location':
        await travelToLocation();
        break;
      case 'Rest and recover':
        game.player.heal(30);
        game.player.recoverSanity(20);
        GameUI.printSuccess('You rest and recover some health and sanity.');
        await new Promise(resolve => setTimeout(resolve, 1500));
        break;
      case 'Quit Game':
        GameUI.printWarning('Thanks for playing Cthulhu\'s Call!');
        process.exit(0);
    }

    // Check game over conditions
    const gameOverCheck = game.checkGameOver();
    if (gameOverCheck.gameOver) {
      GameUI.printGameOver(gameOverCheck.reason);
      game.gameState = GameState.GAME_OVER;
      await inquirer.prompt([{ type: 'input', name: 'continue', message: 'Press Enter to return to menu...' }]);
      game.gameState = GameState.MENU;
    }
  }
}

async function handleEncounter() {
  const encounter = game.triggerEncounter();

  if (!encounter) {
    GameUI.printQuestion('You find nothing of interest here.');
    await new Promise(resolve => setTimeout(resolve, 1000));
    return;
  }

  if (encounter.type === 'dialogue') {
    GameUI.clearScreen();
    GameUI.printDialogue(encounter.npc, encounter.dialogue);
    game.player.knowledge += 5;
    await inquirer.prompt([{ type: 'input', name: 'continue', message: 'Press Enter to continue...' }]);
  } else if (encounter.type === 'battle_start') {
    await handleBattle(encounter.enemy);
  } else if (encounter.type === 'artifact') {
    GameUI.clearScreen();
    GameUI.printEncounter(encounter.description);
    game.player.knowledge += 20;
    GameUI.printSuccess('You have learned dark secrets!');
    await inquirer.prompt([{ type: 'input', name: 'continue', message: 'Press Enter to continue...' }]);
  } else if (encounter.type === 'ritual') {
    GameUI.clearScreen();
    GameUI.printEncounter(encounter.description);
    game.player.loseSanity(30);
    GameUI.printDamage(30, 'sanity');
    await inquirer.prompt([{ type: 'input', name: 'continue', message: 'Press Enter to continue...' }]);
  }
}

async function handleBattle(enemy) {
  GameUI.clearScreen();
  GameUI.printBattleLog(game.getBattleLog());

  while (game.isInBattle) {
    const answer = await inquirer.prompt([{
      type: 'list',
      name: 'action',
      message: `${game.player.name} (${game.player.health}/${game.player.maxHealth}HP) vs ${enemy.name} (${enemy.health}/${enemy.maxHealth}HP)`,
      choices: ['Attack', 'Defend', 'Flee']
    }]);

    let playerAction = 'attack';
    if (answer.action === 'Defend') playerAction = 'defend';
    if (answer.action === 'Flee') {
      GameUI.printSuccess('You manage to escape!');
      game.isInBattle = false;
      break;
    }

    const result = game.executeCombatTurn(playerAction);

    GameUI.clearScreen();
    GameUI.printBattleLog(game.getBattleLog());

    if (result.battleEnd) {
      if (result.victory) {
        GameUI.printSuccess('Victory!');
      } else {
        GameUI.printError('Defeat!');
        game.gameState = GameState.GAME_OVER;
      }
      await inquirer.prompt([{ type: 'input', name: 'continue', message: 'Press Enter to continue...' }]);
      break;
    }
  }
}

async function travelToLocation() {
  const locations = game.getAvailableLocations();
  const answer = await inquirer.prompt([{
    type: 'list',
    name: 'location',
    message: 'Where do you want to travel?',
    choices: locations
  }]);

  const location = game.moveToLocation(answer.location);
  GameUI.clearScreen();
  GameUI.printSuccess(`You have arrived at ${location.name}`);
  console.log(chalk.cyan(`\n${location.description}\n`));
  await inquirer.prompt([{ type: 'input', name: 'continue', message: 'Press Enter to continue...' }]);
}

main().catch(console.error);
