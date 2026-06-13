document.addEventListener("DOMContentLoaded", () => {
  const search = document.querySelector("[data-faq-search]");
  const cards = document.querySelectorAll("[data-faq-card]");

  if (search && cards.length) {
    search.addEventListener("input", () => {
      const value = search.value.trim().toLowerCase();
      cards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(value) ? "" : "none";
      });
    });
  }

  const betaBtn = document.getElementById("beta-submit");
  if (betaBtn) {
    betaBtn.addEventListener("click", requestBeta);
  }

  // Also handle Enter key in email input
  const betaEmail = document.getElementById("beta-email");
  if (betaEmail && betaBtn) {
    betaEmail.addEventListener("keydown", (e) => {
      if (e.key === "Enter") requestBeta();
    });
  }
});

function requestBeta() {
  var emailInput = document.getElementById("beta-email");
  var msg = document.getElementById("beta-msg");
  var btn = document.getElementById("beta-submit");
  var email = emailInput.value.trim();

  if (!email) {
    msg.style.color = "#f66";
    msg.textContent = "Please enter an email address.";
    return;
  }
  if (email.indexOf("@gmail.com") === -1 && email.indexOf("@googlemail.com") === -1) {
    msg.style.color = "#f66";
    msg.textContent = "Please enter a valid Gmail address (ending with @gmail.com).";
    return;
  }

  btn.disabled = true;
  btn.textContent = "Submitting…";
  msg.style.color = "#5aa5ff";
  msg.textContent = "Sending request…";

  // Open mailto link
  var mailLink = "mailto:reply@privatepappa.in?subject=" + encodeURIComponent("PrivateVault Beta Access - " + email) + "&body=" + encodeURIComponent("Please add this email to the PrivateVault closed beta tester list:\n\n" + email + "\n\nThank you.");
  var a = document.createElement("a");
  a.href = mailLink;
  a.target = "_blank";
  a.click();

  msg.style.color = "#4c4";
  msg.innerHTML = "\u2705 <strong>" + email + "</strong> added! You'll get Play Store access within 1-2 hours. Redirecting…";
  btn.textContent = "Done!";

  // Redirect to Play Store
  setTimeout(function () {
    window.location.href = "https://play.google.com/store/apps/details?id=com.privatepappa.privatevault";
  }, 2000);
}