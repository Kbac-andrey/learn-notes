import { activeBtn } from '../helpers/active-buttons';
import { disableBtn } from '../helpers/disable-buttons';
import { showElement } from '../helpers/show-element';
import { setupGameVariables } from '../elements/generate-variable';
import { hideElement } from '../helpers/hide-element';
import { timer } from '../library/timer';
import { app } from '../index'
const finishTuneGame = (stream, canvas, setupP5Variables) => {
  if (setupP5Variables.finishBtnTune && setupP5Variables.tuneContainerText, setupP5Variables.finishBtnGame) {
    finishTune(stream, canvas, setupP5Variables);
    finishGame(stream, setupP5Variables)
  }
}
const finishTune = (stream, canvas, setupP5Variables) => {
  setupP5Variables.finishBtnTune.addEventListener('click', () => {
    stopStream(stream);
    removeCanvas(canvas);
    showElement(setupP5Variables.tuneContainerText);
    activeBtn(setupP5Variables.startBtnTune);
    activeBtn(setupP5Variables.startBtnGame);
    disableBtn(setupP5Variables.finishBtnTune);

  }, { once: true });
}

const finishGame = (stream, setupP5Variables) => {
  let gameVariables = setupGameVariables();
  timer.on('stop', () => {
    stopStream(stream);
    document.querySelectorAll('.fret.active').forEach(fret => {
      fret.classList.remove('active');
    });
    disableBtn(setupP5Variables.finishBtnGame);
    activeBtn(setupP5Variables.startBtnGame);
    activeBtn(setupP5Variables.startBtnTune);
    app.gameVariables.scoreCounter.innerHTML = `${app.score = 0}`
    hideElement([gameVariables.gameInformationContainer, gameVariables.playNoteContainer]);
  });

  setupP5Variables.finishBtnGame.addEventListener('click', () => {
    stopStream(stream);
    document.querySelectorAll('.fret.active').forEach(fret => {
      fret.classList.remove('active');
    });
    disableBtn(setupP5Variables.finishBtnGame);
    activeBtn(setupP5Variables.startBtnGame);
    activeBtn(setupP5Variables.startBtnTune);
    app.gameVariables.scoreCounter.innerHTML = `${app.score = 0}`
    hideElement([gameVariables.gameInformationContainer, gameVariables.playNoteContainer]);
    timer.stop();
  }, { once: true });
}

const stopStream = (stream) => {
  if (stream.active) {
    stream.getTracks().forEach(function (track) {
      track.stop();
      track.enabled = false;
    });
  };
}

const removeCanvas = (canvas) => {
  if (!canvas) return
  canvas.remove();
}

export { finishTuneGame };