document.addEventListener("DOMContentLoaded", function () {
  const countdownElement = document.getElementById("countdown");
  countdownElement.classList.remove("hidden");
});

function updateCountdown() {
  const now = new Date();
  const nextSunday = new Date();
  nextSunday.setDate(now.getDate() + (7 - now.getDay()) +1);
  nextSunday.setHours(0, 0, 0, 0);

  const timeRemaining = nextSunday - now;

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  const countdownElement = document.getElementById("countdown");
  countdownElement.innerHTML = ` ${days} d, ${hours} h, ${minutes} m, ${seconds} s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();