class BotA {
  constructor(botb) {
    this._botB = botb;
  }

  say() {
    console.log("BotA!!");
    this._botB.yell();
  }
}

export default BotA;
