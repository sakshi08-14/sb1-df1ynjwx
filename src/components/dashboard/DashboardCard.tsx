import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const DashboardCard = ({ title, children, className = '' }: DashboardCardProps) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-4 h-full transition-all duration-300 hover:shadow-lg ${className}`}>
      <h3 className="text-lg font-semibold text-gray-700 mb-3">{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default DashboardCard;