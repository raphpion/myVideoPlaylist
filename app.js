import { playlist } from './playlist.js'

const player = document.getElementById('player')
const tooltip = document.getElementById('tooltip')

player.style.width = `${playlist.videos.length}00vw`
let i = 0
let currentVideo = null

window.addEventListener('keypress', keyPressHandler)

if (playlist.random) shuffle(playlist.videos)

for (let i = 0; i < playlist.videos.length; ++i) {
  let videoContainer = document.createElement('div')
  videoContainer.className = `video-container`

  let videoElement = document.createElement('video')
  videoElement.id = `video-${i}`

  let source = document.createElement('source')
  source.src = `./videos/${playlist.videos[i]}`

  videoElement.appendChild(source)
  videoContainer.appendChild(videoElement)
  player.appendChild(videoContainer)
}

window.scrollTo(0, 0)
getVideo(0, true)

/* UTIL ================================================================================================================================= */
function getNextVideo() {
  i++
  if (i >= playlist.videos.length) i = 0
  getVideo(i)
}

function getPreviousVideo() {
  i--
  if (i < 0) i = playlist.videos.length - 1
  getVideo(i)
}

function getVideo(i, first = false) {
  if (i == 0) player.style.transform = 'none'
  else player.style.transform = `translateX(${i * -100}vw)`
  currentVideo = document.getElementById(`video-${i}`)

  if (!first) {
    console.log('not first!')
    currentVideo.addEventListener('canplay', canPlayHandler)
    currentVideo.play()
  }
  currentVideo.addEventListener('ended', endedHandler)
}

function canPlayHandler() {
  currentVideo.play()
}

function endedHandler() {
  console.log('getting next video!')
  getNextVideo()
}

function keyPressHandler(e) {
  if (e.code == 'Space') {
    if (currentVideo.paused) currentVideo.play()
    else currentVideo.pause()
  }
  if (e.code == 'KeyH') {
    if (tooltip.classList.contains('hidden')) tooltip.classList.remove('hidden')
    else tooltip.classList.add('hidden')
  }
  if (e.code == 'KeyA') {
    currentVideo.pause()
    currentVideo.currentTime = 0
    getPreviousVideo()
  }
  if (e.code == 'KeyD') {
    currentVideo.pause()
    currentVideo.currentTime = 0
    getNextVideo()
  }
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}
