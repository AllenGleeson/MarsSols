const axios = require('axios');

const MARS_API_KEY = process.env.MARS_API_KEY;
const INSIGHT_API_URL = `https://api.nasa.gov/insight_weather/?api_key=${MARS_API_KEY}&feedtype=json&ver=1.0`;
const CAMERA_OPTIONS = [
  'FHAZ',
  'RHAZ',
  'MAST',
  'CHEMCAM',
  'MAHLI',
  'MARDI',
  'NAVCAM',
  'PANCAM',
  'MINITES'
];

const getImageForDate = async (earthDate) => {
  const camera = CAMERA_OPTIONS[Math.floor(Math.random() * CAMERA_OPTIONS.length)];
  const marsPhotosUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?camera=${camera}&earth_date=${earthDate}&api_key=${MARS_API_KEY}`;
  try {
    const { data } = await axios.get(marsPhotosUrl);

    if (data.photos) {
      const photo = data.photos[0];
      return {
        image: photo.img_src,
        sol: photo.sol,
      };
    }
    return { image: null, sol: null };
  } catch (err) {
    console.error(`Error fetching image for ${earthDate}:`, err.message);
    return { image: null, sol: null };
  }
};

exports.getMarsData = async (req, res) => {
  try {
    const response = await axios.get(INSIGHT_API_URL);
    const data = response.data;

    const solKeys = data.sol_keys || [];
    const temperature = [];
    const windSpeed = [];
    const pressure = [];
    const windDirections = {};
    let season = '';

    // Prepare solDays data without images first
    const solDaysBase = [];

    for (const sol of solKeys) {
      const solData = data[sol];
      if (!solData || !solData.AT || !solData.HWS || !solData.PRE || !solData.First_UTC) continue;

      solDaysBase.push({
        sol: parseInt(sol),
        earthDate: new Date(solData.First_UTC).toISOString().split('T')[0],
        earthdayDisplay: new Date(solData.First_UTC).toLocaleDateString(),
      });

      temperature.push({
        sol: parseInt(sol),
        av: solData.AT.av,
        mn: solData.AT.mn,
        mx: solData.AT.mx,
      });

      windSpeed.push({
        sol: parseInt(sol),
        av: solData.HWS.av,
        mn: solData.HWS.mn,
        mx: solData.HWS.mx,
      });

      pressure.push({
        sol: parseInt(sol),
        av: solData.PRE.av,
        mn: solData.PRE.mn,
        mx: solData.PRE.mx,
      });

      const wd = solData.WD || {};
      const directions = Object.values(wd)
        .filter(dir => typeof dir === 'object' && dir.compass_point)
        .map(dir => ({
          compass_point: dir.compass_point,
          ct: dir.ct,
        }));
      windDirections[sol] = directions;

      if (!season) season = solData.Season;
    }

    // Fetch images concurrently:
    const imagePromises = solDaysBase.map(async ({ earthDate }) => {
      const { image, sol: imageSol } = await getImageForDate(earthDate);
      return { image, sol: imageSol };
    });

    const images = await Promise.all(imagePromises);

    // Combine images back into solDays array
    const solDays = solDaysBase.map((day, idx) => ({
      sol: images[idx].sol ?? day.sol,
      earthday: day.earthdayDisplay,
      image: images[idx].image,
    }));

    res.json({
      solDays: {
        Days: solDays,
        Season: season,
      },
      chartData: {
        temperature,
        windSpeed,
        pressure,
        windDirections,
      },
    });
  } catch (error) {
    console.error('Failed to fetch Mars data:', error.message);
    res.status(500).json({ error: 'Failed to fetch Mars data' });
  }
};