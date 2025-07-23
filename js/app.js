const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const play = document.querySelector("#controls #play");
const prev = document.querySelector("#controls #prev");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");


const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
});


const displayMusic = (music) => {
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}


play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
});


prev.addEventListener("click", () => { prevMusic(); });


next.addEventListener("click", () => { nextMusic(); });


const prevMusic = () => {
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}


const nextMusic = () => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}


const pauseMusic = () => {
    container.classList.remove("playing");
    play.classList = "fa-solid fa-play";
    audio.pause();
}


const playMusic = () => {
    container.classList.add("playing");
    play.classList = "fa-solid fa-pause";
    audio.play();
}


let muteState = "unmuted";

volumeBar.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    if(value == 0) {
        audio.muted = true;
        muteState = "muted";
        volume.classList = "fa-solid fa-volume-xmark";
    }
    else {
        audio.muted = false;
        muteState = "unmuted";
        volume.classList = "fa-solid fa-volume-high";
    }
});

volume.addEventListener("click", () => {
    if(muteState === "unmuted") {
        audio.muted = true;
        muteState = "muted";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    }
    else {
        audio.muted = false;
        muteState = "unmuted";
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = 100;
    }
});


const calculateTime = (totalSeconds) => {
    const minute = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const updatedSeconds = seconds < 10 ? `0${seconds}`: `${seconds}`;
    const result = `${minute}:${updatedSeconds}`;
    return result;
}


audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});


audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});


progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});