// window.apiKey = "UqSUUkDz0IyApK3toBVqHbtloo27LlFNV";

class Meme {
  constructor(meme) {
    this.meme = meme;


  }

  createButton() {

  }
}

$(document).ready(function () {
  loadMemes();
  sidebarListener();
});

function sidebarListener() {
  let sideBar = $("#sidebar-wrapper") ;
  let introText = $("#instruction-row");
  sideBar.hover(function () {
    if (introText.css("display") !== "none") {
      introText.fadeOut(500)
    }
    $("#wrapper").toggleClass("toggled");
  });
}

function loadMemes() {
  if (typeof localStorage.memes !== "undefined") {
    window.memes = JSON.parse(localStorage.memes)
  }
  else {
    window.memes = [];
    $("#instruction-row").fadeIn(1000);
  }
}
