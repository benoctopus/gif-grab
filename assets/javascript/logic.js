// window.apiKey = "UqSUUkDz0IyApK3toBVqHbtloo27LlFNV";

class Meme {
  constructor(meme, store) {
    this.name = meme;
    this.createButton(meme);
    appendLocal(this.name, this)
  }

  createButton(meme) {
    let sideElem = $(
      `<li data-id="${this.name}" id="list-${meme}">`
      + `<a data-function="kill" id="kill-${meme}" `
      + `class="link-X meme-category" href="#">X</a>`
      + `<a data-function="display" id="display-${meme}" `
      + `class="link meme-category" href="#">${meme}</a>`
      + `</li>`
    );
    window.sidebar.append(sideElem);
    this.reference = $(`#list-${meme}`);
    buttonListener()
  };

  removeButton() {
    this.reference.remove();
    removeLocal(this.name)
  }
}

$(document).ready(function () {
  window.sidebar = $(".sidebar-nav");
  loadMemes();
  sidebarListener();
  buttonListener();
});

function sidebarListener() {
  let sideBar = $("#sidebar-wrapper");
  let introText = $("#instruction-row");
  sideBar.on("mouseenter mouseleave", function (event) {
    // event.preventDefault();
    if (introText.css("display") !== "none") {
      introText.fadeOut(500)
    }
    $("#wrapper").toggleClass("toggled");
  });
}

function buttonListener() {
  $("a").on("click", function (event) {
    let a = $("a");
    a.off("click", function(){})

    let clicked = $(this);
    let id = clicked.attr("id");
    console.log(clicked);
    if (id === "add-button") {
      let input = $("#search-bar").val();
      if (input.length > 0) {
        let obj = new Meme(input);
      }
    }

    else if (clicked.attr("data-function") === "kill") {
      console.log(clicked.parent().attr("data-id"));
      a.off("mouseleave");
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
