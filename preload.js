window.addEventListener('DOMContentLoaded', () => {
  const ipcRenderer = require("electron").ipcRenderer;
  let isPlaying = false;

  document.getElementById("playPauseBtn").addEventListener('click', playPause);
  document.getElementById("prevBtn").addEventListener('click', prev);
  document.getElementById("nextBtn").addEventListener('click', next);

  function playPause() {
    ipcRenderer.send("playPause");
    document.getElementById("playPauseBtn").getElementsByTagName("img")[0].src = !isPlaying ? "assets/img/pause.png" : "assets/img/play.png";
    isPlaying = !isPlaying;
  }


  function prev() {
    ipcRenderer.send("prev");
  }


  function next() {
    ipcRenderer.send("next");
  }
})