// APlayer
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
  let dataSong = aplayer.getAttribute("data-song");
  dataSong = JSON.parse(dataSong);

  let dataSinger = aplayer.getAttribute("data-singer");
  dataSinger = JSON.parse(dataSinger);

  const ap = new APlayer({
    container: aplayer,
    lrcType: 1,
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,
        lrc: dataSong.lyrics,
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

  ap.on("ended", function () {
    const link = `/songs/listens/${dataSong._id}`;

    const options = {
      method: "PATCH",
    };

    fetch(link, options)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.code === 200) {
          const span = document.querySelector(".inner-listen span");
          span.innerHTML = `${data.listens} lượt nghe`;
        }
      });
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

// button favorite
const listBtnFavorite = document.querySelectorAll("[button-favorite]");

if (listBtnFavorite.length > 0) {
  listBtnFavorite.forEach((btnFavorite) => {
    btnFavorite.addEventListener("click", () => {
      const idSong = btnFavorite.getAttribute("button-favorite");

      const isActive = btnFavorite.classList.contains("active");

      const typeFavorite = isActive ? "unfavorite" : "favorite";
      const link = `/songs/favorite/${typeFavorite}/${idSong}`;

      const optionsMethod = {
        method: "PATCH",
      };

      fetch(link, optionsMethod)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.code == 200) {
            console.log(data);
            btnFavorite.classList.toggle("active");
          }
        });
    });
  });
}
// end button favorite

// active inner-menu
const navItems = document.querySelectorAll(".nav-link");
console.log(navItems);
function handleClickNav(event) {
  [...navItems].forEach((item) => item.classList.remove("active"));
  event.target.classList.add("active");
}
[...navItems].forEach((item) => item.addEventListener("click", handleClickNav));

// Search Suggest
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
  const input = boxSearch.querySelector("input[name='keyword']");
  const innerSuggest = boxSearch.querySelector(".inner-suggest");

  input.addEventListener("keyup", () => {
    const keyword = input.value;

    const link = `/search/suggest?keyword=${keyword}`;

    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.code == 200) {
          const songs = data.songs;

          if (songs.length > 0) {
            const htmls = songs.map((item) => {
              return `
                <a class="inner-item" href="/songs/detail/${item.slug}">
                  <div class="inner-image">
                    <img src="${item.avatar}" />
                  </div>
                  <div class="inner-info">
                      <div class="inner-title">${item.title}</div>
                      <div class="inner-singer">
                        <i class="fa-solid fa-microphone-lines"></i> ${item.infoSinger.fullName}
                      </div>
                  </div>
                </a>
              `;
            });

            const innerList = boxSearch.querySelector(".inner-list");
            innerList.innerHTML = htmls.join("");
            innerSuggest.classList.add("show");
          } else {
            innerSuggest.classList.remove("show");
          }
        }
      });
  });
}
// End Search Suggest
