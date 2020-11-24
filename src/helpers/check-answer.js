import { Note } from '@tonaljs/tonal';
import { mapNotes } from '../elements/notes';
import { app } from '../index';
const checkRightAnswer = (frequency) => {
  if (frequency && frequency > 0) {
    let shownNoteText = app.requiredNote;
    let noteFromFreq = removeOkt(Note.fromFreq(frequency));
    let note = findTheClosest(mapNotes.notesWithPossibleFrequency, frequency);
    mapNotes.notesWithPossibleFrequency.forEach(noteElement => {
      if (noteFromFreq == noteElement.note && note.note == noteFromFreq && noteFromFreq == shownNoteText) {
        document.querySelectorAll('.fret.active').forEach(fret => {
          fret.classList.remove('active');
        });
        app.activeNote[app.requiredNote].forEach(fret => {
          fret.classList.add('active');
        });
        app.gameVariables.scoreCounter.innerHTML = `${app.score + 1}`;
        app.showNotes();
      }
    })
  }
}

const removeOkt = (noteFromFreq) => {
  return noteFromFreq.replace(/\d+/g, '');
}

const findTheClosest = (note, base) => {
  const closest = note.map(el =>
    el.frequency.reduce((a, b) => Math.abs(b - base) < Math.abs(a - base) ? b : a)
  ).reduce((a, b) => Math.abs(b - base) < Math.abs(a - base) ? b : a);

  return note.find(note => note.frequency.includes(closest));
}

export { checkRightAnswer };