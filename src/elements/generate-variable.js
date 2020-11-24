function setupTunerVariables() {
  return {
    startBtnTune: document.querySelector('.interactive-container__play__tuner'),
    finishBtnTune: document.querySelector('.interactive-container__finish__tuner'),
    startBtnGame: document.querySelector('.interactive-container__play__game'),
    finishBtnGame: document.querySelector('.interactive-container__finish__game'),
    tuneContainer: document.querySelector('.tune-container'),
    tuneContainerText: document.querySelector('.tune-container__text'),
    model_url: 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/',
    tuneNotesForZeroString: [
      { note: 'E', frequency: '329.69' },
      { note: 'B', frequency: '246.99' },
      { note: 'G', frequency: '196.99' },
      { note: 'D', frequency: '146.89' },
      { note: 'A', frequency: '110.00' },
      { note: 'E2', frequency: '83.41' }
    ]
  }
}


function setupGameVariables() {
  return {
    board: document.querySelector('.guitar-board'),
    gameInformationContainer: document.querySelector('.game-information'),
    timerTime: document.querySelector('.timer__time'),
    scoreCounter: document.querySelector('.score__counter'),
    playNoteContainer: document.querySelector('.play-note'),
    showNote: document.querySelector('.play-note__show-note')
  }
}

export { setupTunerVariables, setupGameVariables }