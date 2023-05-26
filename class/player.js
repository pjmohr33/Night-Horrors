const { Character } = require('./character');
const { World } = require('./world');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {
    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0; i < this.items.length; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    const itemIndex = this.currentRoom.items.findIndex((item) => item.name === itemName);

    if (itemIndex !== -1) {
      const item = this.currentRoom.items[itemIndex];
      this.currentRoom.items.splice(itemIndex, 1);
      this.items.push(item);
    }
  }

  hit(name) {
    const enemy = World.enemies.find(enemy => enemy.name === name && enemy.currentRoom === this.currentRoom);

    if (enemy) {
      enemy.attackTarget = this;
      enemy.applyDamage(this.strength);
    } else {
      console.log('Enemy not found.');
    }
  }

  die(name) {
    if(this.name){
      console.log(`The ${name} killed you! You are dead!`)
    } else {
      console.log("You are dead!");
    }
    process.exit();
  }

}

module.exports = {
  Player,
};
