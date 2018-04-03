// window.apiKey = "UqSUUkDz0IyApK3toBVqHbtloo27LlFNV";
//https://api.giphy.com/v1/gifs/search?

class Meme {
  constructor(meme, store) {
    this.name = format(meme);
    this.createButton(this.name);
    appendLocal(this.name, this)
  }

  createButton(meme) {
    let sideElem = $(
      `<li data-id="${meme}" id="list-${meme}" style="display: none;">`
      + `<a data-function="kill" id="kill-${meme}" `
      + `class="link-X meme-category" href="#">X</a>`
      + `<a data-function="display" id="display-${meme}" `
      + `class="link meme-category" href="#">${deFormat(meme)}</a>`
      + `</li>`
    );
    window.sidebar.append(sideElem);
    this.reference = $(`#list-${meme}`);
    this.reference.fadeIn(500, buttonListener);
  };

  removeButton() {
    this.reference.remove();
    removeLocal(this.name);
    buttonListener();
  }
}

class Gif {
  constructor(name, rating, still, active, row) {
    this.name = name.split("GIF")[0].trim();
    this.rating = rating;
    this.still = still;
    this.active = active;
    this.row = row;
    this.display();
  }

  display() {
    let elem = $(
      `<div class="col-2 card gif-box" `
      + `id="div-${format(this.name)}" style="display: none">`
      + `<img id="${format(this.name)}" `
      + `class="card-img pagination gif-image" `
      + `data-state="still" `
      + `src="${this.still}" `
      + `><h3 class="pacifico">${this.name}</h3.class>`
      + `<h3 class="pacifico smaller-text"> Rating: ${this.rating}</h3>`
      + `</div>`
    );
    this.row.append(elem);
    this.reference = $(`#div-${format(this.name)}`);
    window.currentGifs.push(this.reference);
  }


}

$(document).ready(function () {
  window.jifs = $("#jifs");
  window.sidebar = $(".sidebar-nav");
  loadMemes();
  sidebarListener();
  buttonListener();
});

function sidebarListener() {
  let sideWrap = $("#sidebar-wrapper");
  let introText = $("#instruction-row");
  console.log(sideWrap.width());
  sideWrap.on("mouseenter mouseleave", function (event) {
    console.log(event, this, $(this));
    if (introText.css("display") !== "none") {
      introText.fadeOut(500)
    }
    if ((sideWrap.width() < 20)
      && event.type === "mouseenter") {
      $("#wrapper").toggleClass("toggled");
      $("h3").animate({
        "font-size": "-=7",
      }, 350);
      $(".gif-box").animate({
        "height": "-=50",
      }, 300)
    }
    else if ((sideWrap.width() > 200)
      && event.type === "mouseleave") {
      $("#wrapper").toggleClass("toggled");
      $("h3").animate({
        "font-size": "+=7",
      }, 350);
      $(".gif-box").animate({
        "height": "+=50",
      }, 300)
    }
  });
}

function buttonListener() {
  $("a").on("click", function (event) {
    let a = $("a");
    let clicked = $(this);
    let id = clicked.attr("id");
    console.log(clicked);
    if (id === "add-button") {
      let input = $("#search-bar").val().trim();
      a.off("click");
      if (input.length > 0 && memeStorage.indexOf(format(input)) < 0) {
        let obj = new Meme(input);
      }
      else {
        buttonListener();
      }
    }
    else if (clicked.attr("data-function") === "kill") {
      a.off("click");
      console.log(clicked.parent().attr("data-id"));
      a.off("mouseleave mouseenter");
      clicked.parent().fadeOut(500, function () {
        window.activeMemes[
          clicked.parent().attr("data-id")
          ].removeButton();
      })
    }
  });
}

function loadMemes() {
  window.memeStorage = [];
  window.activeMemes = {};
  if (typeof localStorage.memes !== "undefined") {
    let local = JSON.parse(localStorage.memes);
    local.forEach((value) => {
      let obj = new Meme(value);
    })
  }
  else {
    localStorage.memes = JSON.stringify(window.memeStorage);
    $("#instruction-row").fadeIn(1000);
  }
}

function getGifs(meme, offset) {
  let url = ("https://api.giphy.com/v1/gifs/search?"
    + $.param({
      "api_key": "UqSUUkDz0IyApK3toBVqHbtloo27LlFN",
      "q": meme,
      "offset": offset,
      "limit": "24",
      "lang": "en"
    }));
  console.log(url);
  $.ajax({
    url: url,
    method: "GET"
  }).then((response) => {
    arrangeGifs(response);
    console.log(response)
  });
}

function arrangeGifs(response) {
  window.currentGifs = [];
  let gifCount = 0;
  let rowCount = 0;
  let currentRow = createRow(rowCount);
  window.activeGifs = [];
  response.data.forEach((value) => {
    activeGifs.push(
      new Gif(
        value.title,
        value.rating,
        value.images.fixed_height_still.url,
        value.images.fixed_height.url,
        currentRow
      )
    );
    gifCount++;
    if (gifCount > 3) {
      gifCount = 0;
      rowCount++;
      currentRow = createRow(rowCount)
    }
    cascade(true);
  });
}

function cascade(bool) {
  this.cascadeCount = 0;
  if (bool) {
    window.cascadeInterval = setInterval(cascadeFadeIn.bind(this), 35)
  }
  else if (!bool) {
    window.cascadeInterval = setInterval(cascadeFadeOut.bind(this), 25)
  }
}

function cascadeFadeIn() {
  if (this.cascadeCount < currentGifs.length) {
    currentGifs[this.cascadeCount].fadeIn(500);
    this.cascadeCount++;
  }
  else{
    clearInterval(window.cascadeInterval);
    this.cascadeCount = 0;
  }
}

function cascadeFadeOut() {
  if (this.cascadeCount < currentGifs.length) {
    currentGifs[this.cascadeCount].fadeOut(500);
    this.cascadeCount++;
  }
  else{
    clearInterval(window.cascadeInterval);
    this.cascadeCount = 0;
  }
}

function createRow(count) {
  let row = $(
    `<div class = "row justify-content-around gif-row" id = "row-${count}" > `
  );
  jifs.append(row);
  return $(`#row-${count}`)
}

function format(string) {
  return string.replace(/ /g, "-")
}

function deFormat(string) {
  return string.replace(/-/g, " ")
}


function appendLocal(string, object) {
  window.activeMemes[string] = object;
  window.memeStorage.push(string);
  localStorage.memes = JSON.stringify(memeStorage);
}

function removeLocal(string) {
  delete activeMemes[string];
  memeStorage.splice(memeStorage.indexOf(string));
  localStorage.memes = JSON.stringify(memeStorage);
}
