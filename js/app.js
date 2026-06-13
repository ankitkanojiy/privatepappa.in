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
});

function requestBeta() {
  const emailInput = document.getElementById("beta-email");
  const msg = document.getElementById("beta-msg");
  const email = emailInput.value.trim();

  if (!email || !email.includes("@") || !email.includes(".")) {
    msg.style.color = "#f66";
    msg.textContent = "Please enter a valid email address.";
    return;
  }

  const subject = encodeURIComponent("PrivateVault Beta Access Request");
  const body = encodeURIComponent(
    "Hi,\n\nPlease add my Google email to the PrivateVault closed beta tester list:\n\n" + email + "\n\nThank you."
  );

  msg.style.color = "#6a6";
  msg.textContent = "Opening your email client… redirecting to Play Store.";

  // Open email client with pre-filled message
  window.open("mailto:reply@privatepappa.in?subject=" + subject + "&body=" + body, "_blank");

  // Redirect to Play Store after short delay
  setTimeout(function () {
    window.open("https://play.google.com/store/apps/details?id=com.privatepappa.privatevault", "_blank");
  }, 800);
}
