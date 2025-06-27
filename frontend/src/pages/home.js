import React, { useEffect, useState } from 'react';
import '../assets/css/home.css';
import Jumbotron from '../features/home/Jumbotron';
import SolDays from '../features/home/SolDays';
import SolCharts from '../features/home/SolCharts';
import Loading from '../components/loading';
import Error from '../components/error';

const Home = () => {
  const [marsData, setMarsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarsData = async () => {
      const baseURL =
        process.env.NODE_ENV === 'production'
          ? ''
          : 'http://localhost:5000';

      try {
        const response = await fetch(`${baseURL}/api/mars/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMarsData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarsData();
  }, []);

  return (
    <div>
      <Jumbotron />
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <div id="marsInsight" className="container">
          <div id="SolDays">
            <SolDays marsData={marsData.solDays} />
          </div>
          <div id="SolCharts">
            <SolCharts chartData={marsData.chartData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;