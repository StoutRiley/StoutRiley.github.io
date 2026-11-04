(function () {
  var box = document.getElementById("lightbox");
  var img = document.getElementById("lightbox-img");
  var caption = document.getElementById("lightbox-caption");
  var thumbs = Array.prototype.slice.call(document.querySelectorAll(".thumb"));
  if (!box || !img || !thumbs.length || typeof box.showModal !== "function") return;

  var current = 0;
  var opener = null;

  function show(i) {
    current = (i + thumbs.length) % thumbs.length;
    var thumb = thumbs[current];
    var source = thumb.querySelector("img");
    img.src = source.getAttribute("src");
    img.alt = source.getAttribute("alt") || "";
    caption.textContent = thumb.getAttribute("data-caption") || "";
  }

  thumbs.forEach(function (thumb, i) {
    thumb.addEventListener("click", function () {
      opener = thumb;
      show(i);
      box.showModal();
    });
  });

  box.querySelector(".lb-close").addEventListener("click", function () {
    box.close();
  });
  box.querySelector(".lb-prev").addEventListener("click", function () {
    show(current - 1);
  });
  box.querySelector(".lb-next").addEventListener("click", function () {
    show(current + 1);
  });

  // Click on the dark backdrop closes the viewer
  box.addEventListener("click", function (e) {
    if (e.target === box) box.close();
  });

  box.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  // Escape closes the dialog natively; return focus to the photo that was opened
  box.addEventListener("close", function () {
    img.src = "";
    if (opener) opener.focus();
  });
})();
