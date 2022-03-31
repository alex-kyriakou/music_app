window.onload = () => {
  const song_img_el = document.getElementById("song-img");
  const song_title_el = document.getElementById("song-title");
  const song_artist_el = document.getElementById("song-artist");
  const song_next_up_el = document.getElementById("song-next-up");

  const play_btn = document.getElementById("play-btn");
  const play_btn_icon = document.getElementById("play-icon");
  const prev_btn = document.getElementById("prev-btn");
  const next_btn = document.getElementById("next-btn");

  const audio_player = document.getElementById("music-player");
  const progress_bar = document.getElementById("progress-bar");
  const progress_area = document.querySelector("progress-area");

  let current_song_index;
  let next_song_index;

  let songs = [
    {
      title: "Howling - Signs (Rødhåd Remix)",
      artist: "Rødhåd",
      song_path: "media/Howling - Signs (Rødhåd Remix).mp3",
      img_path: "media/Howling - Signs (Rødhåd Remix).JPG",
    },

    {
      title: "Alpha-Theta_(Axis_Records)",
      artist: "DVS1",
      song_path: "media/DVS1_-_Alpha-Theta_(Axis_Records).mp3",
      img_path: "media/BetaSensoryMotorRhythm_FRONT.jpg",
    },

    {
      title: "Wenn die Masken fallen (Rødhåd)",
      artist: "Rødhåd",
      song_path: "media/Wenn die Masken fallen (Rødhåd).mp3",
      img_path: "media/Wenn die Masken fallen (Rødhåd).JPG",
    },
  ];

  play_btn.addEventListener("click", TogglePlaySong);
  next_btn.addEventListener("click", () => changeSong());
  prev_btn.addEventListener("click", () => changeSong(false));

  // Progress bar  loading time
  audio_player.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    const progressBarWidth = (currentTime / duration) * 100;

    progress_bar.style.width = `${progressBarWidth}%`;

    audio_player.addEventListener("loadeddata", () => {
      songDuration = document.querySelector(".duration");
      let audioDuration = audio_player.duration;
      let totalMin = Math.floor(audioDuration / 60);
      let totalSec = Math.floor(audioDuration % 60);
      if (totalSec < 10) {
        totalSec = `0${totalSec}`;
      }
      songDuration.innerText = `${totalMin}:${totalSec}`;
    });

    let songCurrentTime = document.querySelector(".current");
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
      currentSec = `0${currentSec}`;
    }

    songCurrentTime.innerText = `${currentMin}:${currentSec}`;
  });

  // update playing song currentTime according to the progress bar width
  progress_bar.addEventListener("click", (e) => {
    let progressWidth = this.clientWidth;
    let clickedOffsetX = e.offsetX;
    let audioDuration = audio_player.duration;

    audio_player.currentTime = (clickedOffsetX / progressWidth) * audioDuration;
  });

  initPlayer();

  function initPlayer() {
    current_song_index = 0;
    next_song_index = current_song_index + 1;
    updatePlayer();
  }

  // Update UI song details
  function updatePlayer() {
    let song = songs[current_song_index];

    song_img_el.style = "background-image: url('" + song.img_path + "')";

    song_title_el.innerText = song.title;
    song_artist_el.innerText = song.artist;

    song_next_up_el.innerText =
      songs[next_song_index].title + " by " + songs[next_song_index].artist;

    audio_player.src = song.song_path;
  }

  // Toggle play-pause icon
  function TogglePlaySong() {
    if (audio_player.paused) {
      audio_player.play();
      play_btn_icon.classList.remove("bx-play");
      play_btn_icon.classList.add("bx-pause");
    } else {
      audio_player.pause();
      play_btn_icon.classList.remove("bx-pause");
      play_btn_icon.classList.add("bx-play");
    }
  }

  // Next-Prev song functionality
  function changeSong(next = true) {
    if (next) {
      current_song_index++;
      next_song_index = current_song_index + 1;

      if (current_song_index > songs.length - 1) {
        current_song_index = 0;
        next_song_index = current_song_index + 1;
      }

      if (next_song_index > songs.length - 1) {
        next_song_index = 0;
      }
    } else {
      current_song_index--;
      next_song_index = current_song_index + 1;

      if (current_song_index < 0) {
        current_song_index = songs.length - 1;
        next_song_index = 0;
      }
    }

    updatePlayer();
    TogglePlaySong();
  }
};
