# SIMON GAMES

This is my simple react app build with :
- create react app
- chakra ui

## About Simon Games
Simon games is an electronic game invented by Ralph H. Baer and Howard J. Morrison programmed by Lenny Cope. This game can simply played by matching a random series of tones and blinked light that appear on a bunch of colored button. Every time we can match the series, it will add one new random tones and blinked light to the series, so the game will getting longer and harder.

This game is useful to improve our memory skills by memorizing the series of blinked button. Simon games also practice our concentration and patient, especially when we have reached dozens of series. To make the game more exciting, I create some variation to the game, such as game modes and difficulties by the number of buttons.

## Game Modes
### Classic Mode
Classic mode is the original version of simon games, where we have to match the exact series of tones and blinked button. In every round, a bunch of buttons will be blinked for a second sequentially. After the last button blinked, we have to recreate the tones by click on the same button sequentially to go to the next round. Every round, a new blinked button will be added to the series.

### Reverse Mode
Reverse mode is a new variation of Simon says, where we have to recreate the tones in the reverse order of the original series. In other words, the last blinked button must be clicked first, and continue until the first blinked light which must be clicked at last.

### Mirror Mode
Mirror mode is a new variation of Simon says, where for each blinked button, we have to click the button that placed in the mirror position of the original one. If the blinked button is in the southwest position, we have to click the button in the northeast position, and vice versa.

### Randomize Mode
Randomize mode is a new variation of Simon says, where for each button we clicked, the order of a button will be shuffled. The goal here is to match the button order based on the color and tones, so pay attention to the color order, not just the position pattern.

##Game Difficulties
There are some game difficulties :
- Easy (2x2) as the original version
- Hard (3x3)
- Extreme (4x4)
