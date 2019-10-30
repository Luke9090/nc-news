export const formatTime = timeStr => {
  const posted = Date.parse(timeStr);
  const now = new Date();
  const gap = (now - posted) / 1000;
  const periods = [
    { name: 'year', length: 60 * 60 * 24 * 365, result: 0 },
    { name: 'month', length: 60 * 60 * 24 * 30, result: 0 },
    { name: 'week', length: 60 * 60 * 24 * 7, result: 0 },
    { name: 'day', length: 60 * 60 * 24, result: 0 },
    { name: 'hour', length: 60 * 60, result: 0 },
    { name: 'minute', length: 60, result: 0 }
  ];
  periods.forEach(period => {
    period.result = Math.floor(gap / period.length);
  });
  console.log(timeStr);
  console.log(periods);
  const biggestPeriod = periods.find(period => period.result > 0);
  if (biggestPeriod === undefined) return 'Just now';
  const { name, result } = biggestPeriod;
  return `${result} ${name}${result === 1 ? '' : 's'} ago`;
};
