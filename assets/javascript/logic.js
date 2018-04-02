// window.apiKey = "UqSUUkDz0IyApK3toBVqHbtloo27LlFNV";

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
    this.reference.fadeIn(500, buttonListener)
  };

  removeButton() {
    this.reference.remove();
    removeLocal(this.name);
    buttonListener();
  }

}

$(document).ready(function () {
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
    // event.preventDefault();
    if (introText.css("display") !== "none") {
      introText.fadeOut(500)
    }
    if ((sideWrap.width() < 20)
      && event.type === "mouseenter") {
      $("#wrapper").toggleClass("toggled");
    }
    else if ((sideWrap.width() > 200)
      && event.type === "mouseleave") {
      $("#wrapper").toggleClass("toggled");
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
      if (input.length > 0) {
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
