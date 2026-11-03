// Shared Chart.js setup so every chart looks the same.
import {
  Chart as ChartJS,
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  PolarAreaController,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  PolarAreaController,
  RadialLinearScale,
  Tooltip
);

export const ACCENT = '#fffb00';
export const GRID = 'rgba(255, 255, 255, 0.1)';

// Same meaning, same color, on every chart.
export const COLORS = {
  range: 'rgba(54, 162, 235, 0.45)',
  rangeBorder: 'rgba(54, 162, 235, 1)',
  avg: ACCENT,
};

ChartJS.defaults.color = '#ffffff';
ChartJS.defaults.font.family = '"Jost", sans-serif';
ChartJS.defaults.borderColor = GRID;
ChartJS.defaults.plugins.tooltip.backgroundColor = 'rgba(20, 20, 20, 0.95)';
ChartJS.defaults.plugins.tooltip.borderColor = 'rgba(255, 255, 255, 0.3)';
ChartJS.defaults.plugins.tooltip.borderWidth = 1;
ChartJS.defaults.maintainAspectRatio = false;
