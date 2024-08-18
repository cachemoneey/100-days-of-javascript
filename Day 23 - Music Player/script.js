const image = document.getElementById("cover");
const title = document.getElementById("music-title");
const artist = document.getElementById("music-artist");

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const progress = document.getElementById("progress");
const playerProgress = document.getElementById("player-progress");

const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const background = document.getElementById("bg-img");



const music = new Audio();

const songs = [
    {
        path: './music/The Charmer\'s Call - Hanu Dixit.mp3',
        displayName: 'The Charmer\'s Call',
        cover: '',
        artist: 'Hanu Dixit',
    },
    {
        path: './music/You Will Never See Me Coming - NEFFEX.mp3',
        displayName: 'You Will Never See Me Coming',
        cover: '',
        artist: 'NEFFEX',
    },
    {
        path: './music/I Wish I Knew - Otis McDonald',
        displayName: 'Intellect',
        cover: '',
        artist: 'Otis McDonald',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    } else {
        playMusic();
    }
};


function playMusic(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
};

function pauseMusic(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
};

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;

};

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
};

function updateProgressBar(){
   const { duration, currentTime } = music;
   const progressPercentage = (currentTime / duration) * 100;
   progress.style.width = `${progressPercentage}%`;

   const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
   durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
   currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;

}

function setProgressBar(e){
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
};

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));

music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);

loadMusic(songs[musicIndex]);


