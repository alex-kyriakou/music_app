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
      title: "Wenn die Masken fallen (Rødhåd Version)",
      artist: "Rødhåd",
      song_path: "media/Wenn die Masken fallen (Rødhåd Version).mp3",
      img_path: "media/Wenn die Masken fallen (Rødhåd Version).jpg",
    },
  ];

  play_btn.addEventListener("click", TogglePlaySong);

  initPlayer();

  function initPlayer() {
    current_song_index = 0;
    next_song_index = current_song_index + 1;
    updatePlayer();
  }

  function updatePlayer() {
    let song = songs[current_song_index];

    song_img_el.style = "background-image: url('" + song.img_path + "')";
    song_title_el.innerText = song.title;
    song_artist_el.innerText = song.artist;

    song_next_up_el.innerText =
      songs[next_song_index].title + " by " + songs[next_song_index].artist;

    audio_player.src = song.song_path;
  }

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
};
