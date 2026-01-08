class BazarovEngine {
  constructor(data) {
    this.data = data;
    this.questions = [];
    this.index = 0;
    this.score = 0;
    this.locked = false;
  }

  init(topic) {
    this.questions = this.pickRandom(topic, 12);
    this.index = 0;
    this.score = 0;
    UI.renderQuestions(this.questions);
    this.start();
  }

  start() {
    UI.setInfo("Read all answers… 4");
    setTimeout(() => this.play(), 4000);
  }

  play() {
    Speech.say(this.questions[this.index].sentence);
  }

  answer(choice) {
    if (this.locked) return;
    this.locked = true;

    if (choice === this.questions[this.index].correct) {
      this.score++;
    }

    setTimeout(() => {
      this.index++;
      this.locked = false;

      if (this.index < this.questions.length) {
        this.play();
      } else {
        UI.showResult(this.score);
      }
    }, 1200);
  }

  pickRandom(topic, count) {
    let pool = [];
    Object.values(this.data[topic]).forEach(level => {
      pool.push(...level);
    });
    return pool.sort(() => Math.random() - 0.5).slice(0, count);
  }
}
