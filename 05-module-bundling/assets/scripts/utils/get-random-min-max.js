export default function getRandomMinMax(min = MIN, max = MAX) {
  if (min >= max) throw new Error('min 값이 max 값보다 크거나 같으면 안됩니다.');
  return Math.round(Math.random() * (max - min) + min);
}