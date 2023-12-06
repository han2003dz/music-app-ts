// APlayer
const aplayer = document.querySelector("#aplayer");
console.log(aplayer);
if (aplayer) {
  let dataSong = aplayer.getAttribute("data-song");
  dataSong = JSON.parse(dataSong);

  console.log(dataSong);

  let dataSinger = aplayer.getAttribute("data-singer");
  dataSinger = JSON.parse(dataSinger);

  const ap = new APlayer({
    container: aplayer,
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,
      },
    ],
    autoplay: true,
    volume: 0.8,
  });

  const elementAvatar = document.querySelector(".singer-detail .inner-avatar");

  ap.on("play", function () {
    elementAvatar.style.animationPlayState = "running";
  });

  ap.on("pause", function () {
    elementAvatar.style.animationPlayState = "paused";
  });
}

// End APlayer

// button like
const btnLike = document.querySelector("[button-like]");
console.log(btnLike);
if(btnLike){
  btnLike.addEventListener("click", () => {
    const idSong.
  })
}
// end button like
