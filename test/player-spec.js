const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');

const { Player } = require("../class/player.js");
const { Room } = require("../class/room.js");
const { Item } = require("../class/item.js");
const { Food } = require("../class/food.js");

const { World } = require("../class/world.js");

const { Character } = require("../class/character.js");
const { Enemy } = require("../class/enemy.js");

describe('Player', () => {

  let enemy;
  let eastRoom;
  let westRoom;
  let item;
  let sandwich;
  let player;

  beforeEach(function () {
    eastRoom = new Room("East Room", "An eastern room");
    westRoom = new Room("West Room", "A room to the west of testRoom");
    item = new Item("rock", "just a simple rock");
    sandwich = new Food("sandwich", "a delicious looking sandwich");
    enemy = new Enemy('enemy', 'an ordinary character', eastRoom);
    player = new Player("player", eastRoom);

    World.enemies.push(enemy);
    World.setPlayer(player);

    enemy.items.push(item);
    eastRoom.items.push(sandwich);
    eastRoom.connectRooms('w', westRoom);
  });

  afterEach(() =>{
    eastRoom = "";
    westRoom = "";
    item = "";
    sandwich = "";
    enemy = "";
    player = "";

    World.enemies = [];
    World.rooms = {};

    enemy.items = [];
    eastRoom.items = [];
  });

  it('should find enemies when moving rooms', () =>{
    const checkRoomStub = sinon.stub(enemy, 'checkRoom');

    enemy.currentRoom = westRoom;

    player.move('w')

    const callCount = checkRoomStub.withArgs(`A an ordinary character is in here!`).callCount;

    expect(callCount).to.equal(1);
    expect(checkRoomStub).to.be.calledWith(`A an ordinary character is in here!`);

    checkRoomStub.restore();
  })
});
