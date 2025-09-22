export default function setAppRandomHue() {
  document.body.style.setProperty('--hue', getRandomHue())
}
