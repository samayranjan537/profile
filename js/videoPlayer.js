let player;
let soundEnabled = false;
let autoplayEnabled = true;
let observer;

// Your video list
const videos = [
  'F1KkIWVTSFI',
  'eSg9TKKaX4Y'
];

let currentIndex = 0;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: videos[currentIndex],
    playerVars: {
      controls: 0,
      modestbranding: 1,
      rel: 0,
      mute: 1,
      playsinline: 1,
      playlist: 'F1KkIWVTSFI,eSg9TKKaX4Y'
    },
    events: {
      onReady: setupObserver
    }
  });
}

function setupObserver() {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!player || !autoplayEnabled) return;

      entry.isIntersecting
        ? player.playVideo()
        : player.pauseVideo();
    },
    { threshold: 0.6 }
  );

  observer.observe(document.getElementById('player'));
}

function toggleSound() {
  if (!player) return;

  soundEnabled = !soundEnabled;

  if (soundEnabled) {
    player.unMute();
    player.setVolume(100);
    document.querySelector('#player iframe').style.pointerEvents = 'auto';
  } else {
    player.mute();
    document.querySelector('#player iframe').style.pointerEvents = 'none';
  }
}

function toggleAutoplay() {
  autoplayEnabled = !autoplayEnabled;

  const icon = document.getElementById('autoplayIcon');

  if (!autoplayEnabled) {
    player.pauseVideo();

    // Show PLAY icon
    icon.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z"></path>
      </svg>
    `;
  } else {
    player.playVideo();

    // Show PAUSE icon
    icon.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 5h4v14H6zm8 0h4v14h-4z"></path>
      </svg>
    `;
  }
}


function nextVideo() {
  currentIndex = (currentIndex + 1) % videos.length;
  loadVideo();
}

function prevVideo() {
  currentIndex =
    (currentIndex - 1 + videos.length) % videos.length;
  loadVideo();
}

function loadVideo() {
  player.loadVideoById(videos[currentIndex]);

  if (!soundEnabled) {
    player.mute();
  }

  if (!autoplayEnabled) {
    player.pauseVideo();
  }
}
