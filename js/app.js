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
});

function requestBeta() {
  const emailInput = document.getElementById("beta-email");
  const msg = document.getElementById("beta-msg");
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

  msg.style.color = "#6a6";
  msg.textContent = "Submitting…";

  // Append to beta signups via GitHub API (uses fine-grained PAT with single-file write access)
  const owner = "ankitkanojiy";
  const repo = "privatepappa.in";
  const path = "_data/beta_signups.txt";
  const token = "YOUR_GITHUB_FINE_GRAINED_PAT"; // Replace with your PAT

  // First read current file to get its SHA
  fetch("https://api.github.com/repos/" + owner + "/" + repo + "/contents/" + path, {
    headers: { "Authorization": "Bearer " + token, "Accept": "application/vnd.github+json" }
  })
  .then(r => r.json())
  .then(data => {
    const sha = data.sha || null;
    const existing = data.content ? atob(data.content.replace(/\s/g, "")) : "";
    const timestamp = new Date().toISOString().replace("T", " ").substring(0, 19);
    const newEntry = "[" + timestamp + "] " + email + "\n";
    const updated = existing + newEntry;

    return fetch("https://api.github.com/repos/" + owner + "/" + repo + "/contents/" + path, {
      method: "PUT",
      headers: { "Authorization": "Bearer " + token, "Accept": "application/vnd.github+json" },
      body: JSON.stringify({
        message: "Add beta signup: " + email,
        content: btoa(unescape(encodeURIComponent(updated))),
        sha: sha
      })
    });
  })
  .then(r => {
    if (r.ok) {
      msg.style.color = "#6a6";
      msg.textContent = "Added! Redirecting to Play Store…";
      setTimeout(function () {
        window.open("https://play.google.com/store/apps/details?id=com.privatepappa.privatevault", "_blank");
      }, 1000);
    } else {
      throw new Error("GitHub API failed");
    }
  })
  .catch(function () {
    // Fallback: open mailto if GitHub API fails
    const subject = encodeURIComponent("PrivateVault Beta Access Request");
    const body = encodeURIComponent("Please add this email to the beta tester list: " + email);
    window.open("mailto:reply@privatepappa.in?subject=" + subject + "&body=" + body, "_blank");
    msg.style.color = "#6a6";
    msg.textContent = "Opening email client… redirecting to Play Store.";
    setTimeout(function () {
      window.open("https://play.google.com/store/apps/details?id=com.privatepappa.privatevault", "_blank");
    }, 800);
  });
}
