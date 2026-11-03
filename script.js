(function () {
  // Menu
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("site-menu");
  if (toggle && menu) {
    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      menu.classList.toggle("open", open);
    }
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener("click", function (e) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
  }

  // Contact form
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var key = form.elements["access_key"].value;
      if (!key || key === "YOUR_ACCESS_KEY_HERE") {
        status.className = "form-status error";
        status.textContent = "This form is not connected yet. Add your Web3Forms access key to contact.html.";
        return;
      }
      var button = form.querySelector(".submit");
      button.disabled = true;
      button.textContent = "Sending...";
      status.className = "form-status";
      status.textContent = "";

      fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.success) {
            form.reset();
            status.className = "form-status success";
            status.textContent = "Message sent. Thank you, I will reply soon.";
          } else {
            throw new Error(data.message || "Request failed");
          }
        })
        .catch(function () {
          status.className = "form-status error";
          status.textContent = "Message not sent. Please try again or email riley@rileystout.com.";
        })
        .then(function () {
          button.disabled = false;
          button.textContent = "Send message";
        });
    });
  }
})();
