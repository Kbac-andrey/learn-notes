import { initPitch } from '/elements/p5Init';
import { activeBtn } from '../src/helpers/active-buttons';
import { hideElement } from '../src/helpers/hide-element';
import { showElement } from '../src/helpers/show-element';
import { setupTunerVariables, setupGameVariables } from '../src/elements/generate-variable';
import { mapNotes } from '../src/elements/notes';

const app = {
  _strings: 6,
  _frets: 3,
  _guitarTuning: [4, 11, 7, 2, 9, 4],
  score: 0,
  setupP5Variables: setupTunerVariables(),
  gameVariables: setupGameVariables(),

  init() {
    this.createFretboard();
    this.startPlay();
  },

  createFretboard() {
    for (let stringIndex = 0; stringIndex < this._strings; stringIndex++) {
      let string = document.createElement('div');
      if (string) {
        string.classList.add('string');
        this.gameVariables.board.appendChild(string);
        this.createFrets(stringIndex, string);
      }
    }
  },

  createFrets(stringIndex, string) {
    for (let fret = 0; fret <= this._frets; fret++) {
      let noteFret = document.createElement('div');
      noteFret.classList.add('fret');
      string.appendChild(noteFret);
      let noteName = this.generateNote((fret +  this._guitarTuning[stringIndex]));

      noteFret.setAttribute('note', noteName);
      this.activeNote = this.activeNote || {};
      this.activeNote[noteName] = this.activeNote[noteName] || [];
      this.activeNote[noteName].push(noteFret);
    }
  },

  generateNote(noteIndex) {
    noteIndex %= 12;
    let noteName = mapNotes.noteFlat[noteIndex];
    return noteName;
  },

  startPlay() {
    if (this.setupP5Variables.startBtnTune &&  this.setupP5Variables.finishBtnTune) {
      this.setupP5Variables.startBtnTune.addEventListener('click', () => {
        hideElement(this.setupP5Variables.tuneContainerText);
        activeBtn(this.setupP5Variables.finishBtnTune);
        initPitch('tuner', this.setupP5Variables);
      });
    }
    if (this.setupP5Variables.startBtnGame && this.setupP5Variables.finishBtnGame) {
      this.setupP5Variables.startBtnGame.addEventListener('click', () => {
        showElement([this.gameVariables.gameInformationContainer, this.gameVariables.playNoteContainer]);
        activeBtn(this.setupP5Variables.finishBtnGame);
        this.showNotes();
        initPitch('game', this.setupP5Variables);
      });
    }
  },

  showNotes() {
    const note = this.getNote(mapNotes.noteFlat, [this.requiredNote]);
    this.requiredNote = note;
    this.gameVariables.showNote.innerHTML = note;
  },

  getNote(notes, skipNotes) {
    const allowedNotes = notes.filter(note => !skipNotes.includes(note));
    const noteIndex = Math.floor(Math.random() * Math.floor(allowedNotes.length))
    return allowedNotes[noteIndex];
  },
}
app.init();

export { app };