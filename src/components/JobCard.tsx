import React from 'react';
import { CalendarIcon, MapPinIcon, ClockIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import { JobResult } from '../types/search';

interface JobCardProps {
  job: JobResult;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const BadgeGroup: React.FC<{ icon: React.ReactNode; items: string[]; color: string }> = ({ 
    icon, 
    items, 
    color 
  }) => (
    <div className="flex items-start space-x-2">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div className="flex flex-wrap gap-1">
        {items.map((item, index) => (
          <span
            key={index}
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${color}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
            <a href={job.url} target="_blank" rel="noopener noreferrer">
              {job.title}
            </a>
          </h3>
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="w-4 h-4 mr-1" />
            Updated: {formatDate(job.lastUpdated)}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <BadgeGroup
          icon={<MapPinIcon className="w-4 h-4 text-blue-500" />}
          items={job.locationValues}
          color="bg-blue-50 text-blue-700"
        />

        <BadgeGroup
          icon={<BriefcaseIcon className="w-4 h-4 text-green-500" />}
          items={job.activitiesValues}
          color="bg-green-50 text-green-700"
        />

        <BadgeGroup
          icon={<ClockIcon className="w-4 h-4 text-purple-500" />}
          items={job.workingTimesValues}
          color="bg-purple-50 text-purple-700"
        />

        <BadgeGroup
          icon={<div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">E</span>
          </div>}
          items={job.entryLevelsValues}
          color="bg-orange-50 text-orange-700"
        />
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
        >
          View Details
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
};