const { Character } = require('./character');


class Enemy extends Character {
  constructor(name, description, currentRoom, idleAction) {
    super(name, description, currentRoom);
    this.idleAction = idleAction;
    this.cooldown = 3000
    this.attackTarget = null;
    this.moveCountdown = 2;
  }

  setPlayer(player) {
    this.player = player;
  }

  randomMove() {
    const roomOptions = Object.values(this.currentRoom.exits);
    this.currentRoom = roomOptions[Math.floor(Math.random() * roomOptions.length)];
    this.cooldown += 5000

    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(`${this.description} has entered the room!`);

    } else if (this.player && this.player.currentRoom !== this.currentRoom) {
      console.log(`The ${this.name} disappeared!`)
    }
  }

  takeSandwich() {
    // Fill this in
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = () => {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  applyDamage(amount) {
    this.health -= amount;

    this.attackTarget = this.player;

    if (this.health === 0) {
      this.die(this.name);
    }
  }

  attack() {
    if (this.player.currentRoom === this.currentRoom) {
      this.attackTarget.applyDamage(this.strength, this.name);
      this.cooldown += 3000
    }
  }

  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();

    } else if (this.attackTarget !== null && this.attackTarget.currentRoom === this.currentRoom) {
      this.attack();

    } else if (this.moveCountdown === 0) {
      this.randomMove();
      this.moveCountdown = 2;

    } else {
      this.idleEnemyAction();
      this.moveCountdown--;
    }


    if (this.health > 0) {
      this.rest();
    }
  }


  idleEnemyAction() {
    this.cooldown += 10000;

    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(`The ${this.name} ${this.idleAction}`);
    }
  }
}

module.exports = {
  Enemy,
};
