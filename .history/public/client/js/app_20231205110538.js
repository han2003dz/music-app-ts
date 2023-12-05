// APlayer
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
  let dataSong = aplayer.getAttribute()
  const ap = new APlayer({
    container: aplayer,
    audio: [
      {
        name: "name",
        artist: "artist",
        url: "url.mp3",
        cover: "cover.jpg",
      },
    ],
  });
}

// End APlayer
