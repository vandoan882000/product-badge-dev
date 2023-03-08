console.log("Magic badges script attached assets");

const LOAD_SCRIPT = () => {
  console.log("Magic badges's initing");
  
  console.log("Magic badges - JS loading");
  const $scriptEl = document.createElement("script");
  $scriptEl.type = "text/javascript";
  $scriptEl.src = "https://s-magic-badge.netlify.app/main.js";
  $scriptEl.addEventListener("load", () => {
    console.log("Magic badges - JS loaded");
  });
  $scriptEl.addEventListener("error", (e) => {
    console.log("Magic badges - JS failed", e);
  });
  document.body.appendChild($scriptEl);

  console.log("Magic badges - CSS loading");
  const $linkEl = document.createElement("link");
  $linkEl.rel = "stylesheet";
  $linkEl.href = "https://s-magic-badge.netlify.app/main.css";
  $scriptEl.addEventListener("load", () => {
    console.log("Magic badges - Css loaded");
  });
  $scriptEl.addEventListener("error", (e) => {
    console.log("Magic badges - Css failed", e);
  });
  document.body.appendChild($linkEl);
};

LOAD_SCRIPT();