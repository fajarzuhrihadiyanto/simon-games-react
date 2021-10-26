// Function to shuffle the given array
const shuffle = arr => arr.sort(() => 0.5 - Math.random())

// Function to get random integer from {min} (inclusive) to {max} (inclusive)
export const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

// Define some properties of game modes
export const gameModes = [
  { // Classic Mode
    id: '61667ae2a2a7d3b153d4a4bf',
    name: 'classic',
    btnAction: ({ series, targetIndex }) => {
      return [
        series[targetIndex],
        () => {}
      ]
    }
  },
  { // Reverse Mode
    id: '61667af7a2a7d3b153d4a4c0',
    name: 'reverse',
    btnAction: ({ series, targetIndex }) => {
      return [
        series[series.length - targetIndex - 1],
        () => {}
      ]
    }
  },
  { // Mirror Mode
    id: '61667b06a2a7d3b153d4a4c1',
    name: 'mirror',
    btnAction: ({ series, targetIndex, numOfButtons }) => {
      return [
        numOfButtons - series[targetIndex] + 1,
        () => {}
      ]
    }
  },
  { // Randomize Mode
    id: '61667b15a2a7d3b153d4a4c2',
    name: 'randomize',
    btnAction: ({ series, targetIndex, setButtons }) => {
      return [
        series[targetIndex],
        () => { setButtons(buttons => shuffle(buttons)) }
      ]
    }
  }
]

// Define some properties of game difficulties
export const difficulties = [
  { // Easy
    id: '61667a82a2a7d3b153d4a4bc',
    name: 'easy',
    col: 2,
    buttons: [
      { id: 1, colorScheme: 'red', audio: 'C4.wav' },
      { id: 2, colorScheme: 'yellow', audio: 'E4.wav' },
      { id: 3, colorScheme: 'green', audio: 'G4.wav' },
      { id: 4, colorScheme: 'blue', audio: 'B4.wav' }
    ]
  },
  { // Hard
    id: '61667aa9a2a7d3b153d4a4bd',
    name: 'hard',
    col: 3,
    buttons: [
      { id: 1, colorScheme: 'red', audio: 'B3.wav' },
      { id: 2, colorScheme: 'orange', audio: 'C4.wav' },
      { id: 3, colorScheme: 'yellow', audio: 'D4.wav' },
      { id: 4, colorScheme: 'green', audio: 'E4.wav' },
      { id: 5, colorScheme: 'teal', audio: 'F4.wav' },
      { id: 6, colorScheme: 'sky', audio: 'G4.wav' },
      { id: 7, colorScheme: 'indigo', audio: 'A4.wav' },
      { id: 8, colorScheme: 'purple', audio: 'B4.wav' },
      { id: 9, colorScheme: 'pink', audio: 'C5.wav' }
    ]
  },
  { // Extreme
    id: '61667ac4a2a7d3b153d4a4be',
    name: 'extreme',
    col: 4,
    buttons: [
      { id: 1, colorScheme: 'red', audio: 'E3.wav' },
      { id: 2, colorScheme: 'orange', audio: 'F3.wav' },
      { id: 3, colorScheme: 'amber', audio: 'G3.wav' },
      { id: 4, colorScheme: 'yellow', audio: 'A3.wav' },
      { id: 5, colorScheme: 'lime', audio: 'B3.wav' },
      { id: 6, colorScheme: 'green', audio: 'C4.wav' },
      { id: 7, colorScheme: 'teal', audio: 'D4.wav' },
      { id: 8, colorScheme: 'cyan', audio: 'E4.wav' },
      { id: 9, colorScheme: 'sky', audio: 'F4.wav' },
      { id: 10, colorScheme: 'blue', audio: 'G4.wav' },
      { id: 11, colorScheme: 'violet', audio: 'A4.wav' },
      { id: 12, colorScheme: 'fuchsia', audio: 'B4.wav' },
      { id: 13, colorScheme: 'pink', audio: 'C5.wav' },
      { id: 14, colorScheme: 'brown', audio: 'D5.wav' },
      { id: 15, colorScheme: 'warmGray', audio: 'E5.wav' },
      { id: 16, colorScheme: 'blueGray', audio: 'F5.wav' }
    ]
  }
]

// Define backsound audio and adjust the volume
const backsoundAudio = new Audio('/mixkit-serene-view-443.mp3')
backsoundAudio.volume = 0.1
backsoundAudio.loop = true

// Define menu click effect audio and adjust the volume
const menuClickAudio = new Audio('/menu-click.mp3')
menuClickAudio.volume = 0.05

// Define game over sound audio and adjust the volume
const gameOverAudio = new Audio('/mixkit-game-over-dark-orchestra-633.wav')
gameOverAudio.volume = 0.1

// Export those audio
export const audio = {
  backsound: backsoundAudio,
  menuClick: menuClickAudio,
  gameOver: gameOverAudio
}
