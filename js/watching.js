const video = document.querySelector("video");
const videoSrc = "https://s3.phim1280.tv/20240630/uDHrWdh6/index.m3u8";
if (Hls.isSupported()) {
  const hls = new Hls();
  hls.loadSource(videoSrc);
  hls.attachMedia(video);
  hls.on(Hls.Events.MANIFEST_PARSED, function () {
    video.play();
  });
} else if (video.canPlayType("application/vnd.apple.mpegurl")) {
  video.src = videoSrc;
  video.addEventListener("loadedmetadata", function () {
    video.play();
  });
}
