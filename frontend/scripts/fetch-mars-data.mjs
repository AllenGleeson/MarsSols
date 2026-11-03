// Fetches Mars weather (InSight) and Curiosity photos, and saves them to
// public/data/mars.json so the site can be hosted as static files.
//
// Usage: node scripts/fetch-mars-data.mjs
// Set MARS_API_KEY to use your own NASA key (falls back to DEMO_KEY).

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const API_KEY = process.env.MARS_API_KEY || 'DEMO_KEY';
const INSIGHT_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`;
const OUT_FILE = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'data', 'mars.json');

const getJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} from ${url.replace(API_KEY, '***')}`);
  return res.json();
};

// The old Mars Rover Photos API has been shut down, so this uses the
// mars.nasa.gov raw image feed for Curiosity (no key needed).
const getImageForDate = async (earthDate) => {
  const next = new Date(`${earthDate}T00:00:00Z`);
  next.setUTCDate(next.getUTCDate() + 1);
  const nextDate = next.toISOString().split('T')[0];
  const url =
    'https://mars.nasa.gov/api/v1/raw_image_items/?order=sol%20desc&per_page=50&page=0' +
    '&condition_1=msl:mission' +
    `&condition_2=${earthDate}:date_taken:gte` +
    `&condition_3=${nextDate}:date_taken:lt`;
  try {
    const { items = [] } = await getJson(url);
    const photo = items.find((item) => item.sample_type === 'full') || items[0];
    return photo ? photo.https_url || photo.url : null;
  } catch (err) {
    console.warn(`No image for ${earthDate}: ${err.message}`);
    return null;
  }
};

const main = async () => {
  const data = await getJson(INSIGHT_URL);
  const temperature = [];
  const windSpeed = [];
  const pressure = [];
  const windDirections = {};
  const days = [];
  let season = '';

  for (const key of data.sol_keys || []) {
    const solData = data[key];
    if (!solData || !solData.AT || !solData.HWS || !solData.PRE || !solData.First_UTC) continue;
    const sol = parseInt(key, 10);
    const first = new Date(solData.First_UTC);

    days.push({ sol, earthDate: first.toISOString().split('T')[0] });
    temperature.push({ sol, av: solData.AT.av, mn: solData.AT.mn, mx: solData.AT.mx });
    windSpeed.push({ sol, av: solData.HWS.av, mn: solData.HWS.mn, mx: solData.HWS.mx });
    pressure.push({ sol, av: solData.PRE.av, mn: solData.PRE.mn, mx: solData.PRE.mx });
    windDirections[key] = Object.values(solData.WD || {})
      .filter((dir) => typeof dir === 'object' && dir.compass_point)
      .map((dir) => ({ compass_point: dir.compass_point, ct: dir.ct }));
    if (!season) season = solData.Season;
  }

  const images = await Promise.all(days.map((day) => getImageForDate(day.earthDate)));

  const result = {
    solDays: {
      Days: days.map((day, i) => ({
        sol: day.sol,
        earthDate: day.earthDate,
        earthday: new Date(`${day.earthDate}T00:00:00Z`).toLocaleDateString('en-GB', { timeZone: 'UTC' }),
        image: images[i],
      })),
      Season: season,
    },
    chartData: { temperature, windSpeed, pressure, windDirections },
  };

  await mkdir(dirname(OUT_FILE), { recursive: true });
  await writeFile(OUT_FILE, JSON.stringify(result, null, 2) + '\n');
  console.log(`Saved ${days.length} sols (${images.filter(Boolean).length} with images) to ${OUT_FILE}`);
};

main().catch((err) => {
  console.error('Failed to fetch Mars data:', err.message);
  process.exit(1);
});
