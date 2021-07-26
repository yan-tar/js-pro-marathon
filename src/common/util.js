export function clamp(x, fromX, toX) {
  if (x < fromX) x = fromX;
  if (x > toX) x = toX;

  return x;
}

export function animateEx(dx, startTime, currentTime, speed, looped = false) {
  const diff = currentTime - startTime;
  let time = (speed && diff / speed) || 0;

  if (looped) {
    time %= 1;
  } else if (time > 1) {
    time = 1;
  }

  return { offset: dx * time, progress: time };
}
