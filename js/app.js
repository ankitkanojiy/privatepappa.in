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
  const emailInput = document.getElementById("beta-email");
  const msg = document.getElementById("beta-msg");
  const btn = document.getElementById("beta-submit");
  const email = emailInput.value.trim();

  if (!email) {
    msg.style.color = "#f66";
    msg.textContent = "Please enter an email address.";
    return;
  }
  if (!email.endsWith("@gmail.com") && !email.endsWith("@googlemail.com")) {
    msg.style.color = "#f66";
    msg.textContent = "Please enter a valid Gmail address (ending with @gmail.com).";
    return;
  }

  // Disable button during submission
  btn.disabled = true;
  btn.textContent = "Submitting…";
  msg.style.color = "#5aa5ff";

  // Try to save via mailto as primary method (always works, no backend needed)
  const subject = encodeURIComponent("PrivateVault Beta Access — " + email);
  const body = encodeURIComponent("Please add this email to the PrivateVault closed beta tester list:\n\n" + email + "\n\nThank you.");
  window.open("mailto:reply@privatepappa.in?subject=" + subject + "&body=" + body, "_blank");

  // Show success and redirect
  msg.style.color = "#4c4";
  msg.innerHTML = "&#x2705; <strong>" + email + "</strong> added! You'll get Play Store access within 1-2 hours. Redirecting…";

  btn.textContent = "Done!";
  btn.style.background = "#3a3";

  setTimeout(function () {
    window.open("https://play.google.com/store/apps/details?id=com.privatepappa.privatevault", "_blank");
  }, 1500);

  // Re-enable after a few seconds
  setTimeout(function () {
    btn.disabled = false;
    btn.textContent = "Request Beta Access →";
    btn.style.background = "#5aa5ff";
  }, 4000);
}