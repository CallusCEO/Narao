export const formatTime = (t: number) => {
    if (t >= 3600) {
        const hours = Math.floor(t / 3600)
            .toString()
            .padStart(2, '0');
        const minutes = Math.floor((t % 3600) / 60)
            .toString()
            .padStart(2, '0');
        const seconds = (t % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    } else {
        const minutes = Math.floor(t / 60)
            .toString()
            .padStart(2, '0');
        const seconds = (t % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }
};

export const formatTimeEN = (t: number): string => {
  // Always get all parts for the AM/PM conversion
  const totalHours = Math.floor(t / 3600);
  const totalMinutes = Math.floor((t % 3600) / 60);
  const totalSeconds = t % 60;

  let displayHours = totalHours % 12;
  const period = totalHours >= 12 ? 'PM' : 'AM';

  // Handle midnight (0 hours should be 12 AM)
  if (displayHours === 0 && totalHours >= 0) {
    displayHours = 12;
  }

  const paddedMinutes = totalMinutes.toString().padStart(2, '0');
  const paddedSeconds = totalSeconds.toString().padStart(2, '0');

  // We ensure hours are always displayed for AM/PM, so pad displayHours
  return `${displayHours.toString().padStart(2, '0')}:${paddedMinutes}:${paddedSeconds} ${period}`;
};