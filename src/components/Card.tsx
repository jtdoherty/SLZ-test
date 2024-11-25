import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-[#0f1219] rounded-lg p-6">
      <div className="flex items-center mb-4">
        <Icon className="h-6 w-6 text-indigo-500 mr-2" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
};

export default Card;