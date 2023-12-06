// APlayer
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
  let dataSong = aplayer.getAttribute("data-song");
  dataSong = JSON.parse(dataSong);

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

if (btnLike) {
  btnLike.addEventListener("click", () => {
    const idSong = btnLike.getAttribute("button-like");

    const isActive = btnLike.classList.contains("active");

    const typeLike = isActive ? "dislike" : "like";
    const link = `/songs/like/${typeLike}/${idSong}`;

    const optionsMethod = {
      method: "PATCH",
    };

    fetch(link, optionsMethod)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.code == 200) {
          const dataLike = btnLike.querySelector("[data-like]");
          dataLike.innerHTML = `${data.like} like`;
          btnLike.classList.toggle("active");
        }
      });
  });
}
// end button like
