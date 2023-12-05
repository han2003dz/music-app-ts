// APlayer
const aplayer = document.querySelector("#aplayer");
if(aplayer){
  
}
const ap = new APlayer({
  container: document.getElementById("aplayer"),
  audio: [
    {
      name: "name",
      artist: "artist",
      url: "url.mp3",
      cover: "cover.jpg",
    },
  ],
});

// End APlayer
