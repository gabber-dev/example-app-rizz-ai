export const timeString = (seconds: number) => {
  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

export const colorFromString = (str: string) => {
  const hash = str.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + acc;
  }, 0);

  const hue = hash % 360;
  return `hsl(${hue}, 50%, 50%)`;
};
