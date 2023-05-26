const { Food } = require('./food.js')

class Character {
  constructor(name, description, currentRoom) {
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.items = [];
    this.health = 100
    this.strength = 10
  }

  applyDamage(amount, name) {
    this.health -= amount;

    if (this.health === 0) {
      this.die(name);
    }
  }

  die(name) {
    this.items.forEach((el) => {
      this.dropItem(el);
    });

    this.currentRoom = null;
    console.log(`The ${name} has died!`)
  }

  dropItem(itemName) {
    [itemName] = this.items
    this.currentRoom.items.push(itemName);

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] === itemName) {
        this.items.splice(i, 1);
        break;
      }
    }
  }

  eatItem(itemName) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name === itemName && this.items[i] instanceof Food) {
        this.items.splice(i, 1);
        break;
      }
    }
  }

  getItemByName(name) {
    [name] = this.items;
    return name;
  }
}

module.exports = {
  Character,
};
