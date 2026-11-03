// Formats a sol's Earth date as e.g. "19 Oct 2020".
// Falls back to the older pre-formatted `earthday` string.
export const formatEarthDate = (day) =>
  day.earthDate
    ? new Date(`${day.earthDate}T00:00:00Z`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
      })
    : day.earthday;
