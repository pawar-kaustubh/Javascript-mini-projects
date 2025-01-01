// document.addEventListener("DOMContentLoaded", () => {
//     const keysContainer = document.querySelector(".keys");

//     const sounds = {
//       a: "clap",
//       k: "drum",
//       s: "hihat",
//       d: "kick",
//       f: "openhat",
//       g: "boom",
//       h: "ride",
//       j: "snare",
//       l: "tom",
//     };

//     // Create and display key elements
//     Object.keys(sounds).forEach((key) => {
//       const keyElement = document.createElement("div");
//       keyElement.classList.add("key",key);

//       keyElement.dataset.sound = sounds[key];
//       keysContainer.appendChild(keyElement);

//     });

//   //   Play sound on key press
//     document.addEventListener("keydown", (event) => {
//       const sound = sounds[event.key.toLocaleLowerCase()];
//       if (sound) {
//         playSound(sound);
//         highlightKey(event.key.toLowerCase());
//       }

//     });
//     // Play sound function
//     function playSound(sound) {
//       const audio = new Audio(`sounds/${sound}.wav`);
//       audio.play();

//     }

//     function highlightKey(key) {
//       const keyElement = document.querySelector(`.key.${key}]`);
//       if (keyElement) {
//         keyElement.classList.add("playing");
//         setTimeout(() => keyElement.classList.remove("playing"), 200); // Reset after 200ms

//       }
//     }
//   });

window.addEventListener("keydown", function (e) {
  const audio = document.querySelector(`audio[data-key="${e.key}"]`);
  const key = document.querySelector(`.key[data-key="${e.key}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add("playing");
  setTimeout(function () {}, 0.07);
  
  console.log(audio);
});

function removeTransition(e) {
  console.log(e);
}
const keys = document.querySelectorAll(".key");
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
