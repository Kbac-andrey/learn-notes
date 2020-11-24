import { finishTuneGame } from '../events/finish-listener';
import { timer } from '../library/timer';
import { checkRightAnswer } from '../helpers/check-answer';

const initPitch = (variableOfPitch, setupP5Variables) => {
  if (!setupP5Variables.startBtnTune
    && !setupP5Variables.finishBtnTune
    && !setupP5Variables.tuneContainer
    && !setupP5Variables.tuneContainerText
    && !setupP5Variables.model_url) {
    return;
  }
  let pitch;
  let stream;
  let canvas;
  let audioContext;
  let freq = 0;
  let threshold = 1;

  const p5sketch = function (p5library) {
    p5library.setup = async function () {
      disableStartBTN(setupP5Variables.startBtnTune);
      disableStartBTN(setupP5Variables.startBtnGame);
      if (variableOfPitch === 'tuner') {
        p5library.createCanvas(400, 400);
        canvas = document.querySelector('canvas');
      } else {
        p5library.noCanvas();
        timer.start(60);
      }
      audioContext = new AudioContext();
      stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      startPitch(stream, audioContext);

      finishTuneGame(stream, canvas, setupP5Variables);

    };
    p5library.setup();
    if (variableOfPitch == 'tuner') {
      p5library.draw = function () {
        drawFrequencyContainer();
        let recordDiff = findCloseNoteForTune();
        let diff = recordDiff;
        drawBorder(diff);
      };
    } else {

    }

    function startPitch(stream, audioContext) {
      pitch = ml5.pitchDetection(setupP5Variables.model_url, audioContext, stream, modelLoaded);
    }

    function modelLoaded() {
      getPitch();
    }

    function getPitch() {
      pitch.getPitch((error, frequency) => {
        if (frequency) {
          freq = frequency;
          if (variableOfPitch !== 'tuner') {
            checkRightAnswer(freq);
          }
        }
        getPitch();
      })
    }

    function drawFrequencyContainer() {
      p5library.background(0);
      p5library.textAlign(p5library.CENTER, p5library.CENTER);
      p5library.fill(255);
      p5library.textSize(32);
      p5library.text(freq.toFixed(2), p5library.width / 2, p5library.height - 150);
    }

    function findCloseNoteForTune() {
      let closestNote = -1;
      let recordDiff = Infinity;
      setupP5Variables.tuneNotesForZeroString.forEach(note => {
        let diff = freq - note.frequency;
        if (p5library.abs(diff) < p5library.abs(recordDiff)) {
          closestNote = note;
          recordDiff = diff;
        }
      });
      p5library.textSize(64);
      p5library.text(closestNote.note, p5library.width / 2, p5library.height - 50);
      return recordDiff
    }

    function drawBorder(diff) {
      let alpha = p5library.map(p5library.abs(diff), 0, 100, 255, 0);
      p5library.rectMode(p5library.CENTER);
      p5library.fill(255, alpha);
      p5library.stroke(255);
      p5library.strokeWeight(1);
      if (p5library.abs(diff) < threshold) {
        p5library.fill(0, 255, 0);
      }
      p5library.rect(200, 100, 200, 50);

      p5library.stroke(255);
      p5library.strokeWeight(4);
      p5library.line(200, 0, 200, 200);

      p5library.noStroke();
      p5library.fill(255, 0, 0);
      if (p5library.abs(diff) < threshold) {
        p5library.fill(0, 255, 0);
      }
      p5library.rect(200 + diff / 2, 100, 10, 75);
    }

    function disableStartBTN(startBtnTune) {
      if (!startBtnTune) return
      startBtnTune.disabled = true;
    }
  }

  const myp5 = new p5(p5sketch, setupP5Variables.tuneContainer);
};

export { initPitch };
