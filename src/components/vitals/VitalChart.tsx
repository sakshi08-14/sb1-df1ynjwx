import { useEffect, useRef } from 'react';

interface VitalChartProps {
  data: number[];
  color: string;
  label: string;
  unit: string;
  type: string;
}

const VitalChart = ({ data, color, label, unit, type }: VitalChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set dimensions
    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;

    // Find min/max values
    const max = Math.max(...data) * 1.1;
    const min = Math.min(...data) * 0.9;
    const range = max - min;

    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#e5e7eb';
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';

    data.forEach((val, i) => {
      const x = padding + (i / (data.length - 1)) * graphWidth;
      const y = height - padding - ((val - min) / range) * graphHeight;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw points
    data.forEach((val, i) => {
      const x = padding + (i / (data.length - 1)) * graphWidth;
      const y = height - padding - ((val - min) / range) * graphHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Add labels for x-axis (days)
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    ctx.fillStyle = '#6b7280';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    
    days.forEach((day, i) => {
      const x = padding + (i / (days.length - 1)) * graphWidth;
      ctx.fillText(day, x, height - padding + 15);
    });

  }, [data, color]);

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-gray-700">{label}</h4>
        <span className="text-sm text-gray-500">{unit}</span>
      </div>
      <canvas 
        ref={canvasRef} 
        width={300} 
        height={150} 
        className="w-full h-auto"
      ></canvas>
    </div>
  );
};

export default VitalChart;