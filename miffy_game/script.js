// changing background colors

let currentColorIndex = 0;
const colors = [
  "#FFAAA5",
  "pink",
  "#FFD3B6",
  "#FDFFAB",
  "#A8E6CF",
  "lightblue",
  "#C499F3",
  "#DDBC89",
  "#EDE7CF",
];

function changeBackgroundColor() {
  document.body.style.backgroundColor = colors[currentColorIndex];
  currentColorIndex = (currentColorIndex + 1) % colors.length;
}

//
//
//
//adding miffy in different height and let it slide

let miffyCount = 0;

function addMiffy() {
  const miffyContainer = document.getElementById("miffyContainer");
  const newMiffy = document.createElement("img");
  newMiffy.alt = "Miffy";
  newMiffy.classList.add("miffy");
  newMiffy.src = "images/miffy_1.png";

  //random height level of miffy coming out
  const randomTop = Math.floor(Math.random() * 101);
  newMiffy.style.top = `${randomTop}%`;

  //appear after clicked
  newMiffy.style.animation = "roll 10s linear infinite";
  newMiffy.style.animationDelay = "0s";
  newMiffy.style.animationIterationCount = "infinite";

  miffyContainer.appendChild(newMiffy);

  miffyCount++;
}

//
//
//
//adding cupcake and drop
function addCupcake() {
  const cupcakeContainer = document.getElementById("cupcakeContainer");
  const newCupcake = document.createElement("img");
  newCupcake.alt = "Cupcake";
  newCupcake.classList.add("cupcake");
  newCupcake.src = "images/cupcake.png";

  // Set initial position at the top of the screen
  newCupcake.style.position = "absolute";
  newCupcake.style.left = `${Math.random() * (window.innerWidth - 50)}px`; // Random horizontal position
  newCupcake.style.top = "0";

  // Animate cupcake falling from top to bottom
  newCupcake.style.animation = "fall 5s linear forwards";
  newCupcake.style.animationIterationCount = "1"; // Play animation once

  cupcakeContainer.appendChild(newCupcake);

  // After the animation completes, set the position to fixed at the bottom
  newCupcake.addEventListener("animationend", function () {
    newCupcake.style.position = "fixed";
    newCupcake.style.bottom = "0";
  });
}

//
// Adding a butterfly that pops up and bounces
function addButterfly() {
  const butterflyContainer = document.getElementById("butterflyContainer");
  const newButterfly = document.createElement("img");

  // Array of butterfly image filenames
  const butterflyImages = ["b1.png", "b2.png", "b3.png", "b4.png"];

  // Randomly select a butterfly image from the array
  const randomButterflyImage =
    butterflyImages[Math.floor(Math.random() * butterflyImages.length)];

  newButterfly.src = "images/" + randomButterflyImage;

  // Set initial position at a random location
  newButterfly.style.position = "absolute";
  newButterfly.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
  newButterfly.style.top = `${Math.random() * (window.innerHeight - 50)}px`;

  butterflyContainer.appendChild(newButterfly);

  // Animate butterfly to bounce
  newButterfly.animate(
    [
      { transform: "translateY(0)" },
      { transform: "translateY(-20px)", offset: 0.5 },
      { transform: "translateY(0)" },
    ],
    {
      duration: 1000,
      iterations: Infinity,
      easing: "ease-in-out",
    }
  );

  // Add event listener to each butterfly
  newButterfly.addEventListener("click", function () {
    // Trigger confetti effect
    triggerConfetti(newButterfly);
    // Remove clicked butterfly
    butterflyContainer.removeChild(newButterfly);
  });
}

// Function to trigger confetti effect
function triggerConfetti(butterfly) {
  const confettiContainer = document.getElementById("confettiContainer");

  // Create 10 heart images for confetti
  for (let i = 1; i <= 10; i++) {
    const confetti = document.createElement("img");
    confetti.src = "images/heart.png"; // Replace with the path to your heart image
    confetti.alt = "Heart";
    confetti.style.position = "absolute";
    confetti.style.left = `${butterfly.offsetLeft}px`;
    confetti.style.top = `${butterfly.offsetTop}px`;

    confettiContainer.appendChild(confetti);

    // Animate confetti to splash out and disappear
    confetti.animate(
      [
        { transform: "scale(0) rotate(0deg)", opacity: 1 },
        { transform: "scale(2) rotate(360deg)", opacity: 0 },
      ],
      {
        duration: 2000,
        easing: "ease-in-out",
      }
    );

    // Remove confetti after animation completes
    confetti.addEventListener("animationend", function () {
      confettiContainer.removeChild(confetti);
    });
  }

  setTimeout(() => {
    // Remove only the heart elements
    const hearts = confettiContainer.querySelectorAll("img");
    hearts.forEach((heart) => {
      confettiContainer.removeChild(heart);
    });
  }, 2000); // Adjust as needed
}
