import React from 'react';
import { CalendarIcon, MapPinIcon, ClockIcon, BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
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

  const BadgeGroup: React.FC<{ 
    icon: React.ReactNode; 
    values: string[]; 
    colorClass: string;
  }> = ({ icon, values, colorClass }) => (
    <div className="flex items-start space-x-2">
      <div className="flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="flex flex-wrap gap-1">
        {values.map((value, index) => (
          <span
            key={index}
            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${colorClass}`}
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors">
              <a href={job.url} target="_blank" rel="noopener noreferrer">
                {job.title}
              </a>
            </h3>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <CalendarIcon className="w-4 h-4 mr-1" />
              Updated {formatDate(job.lastUpdated)}
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="space-y-3">
          {/* Locations */}
          <BadgeGroup
            icon={<MapPinIcon className="w-4 h-4 text-green-600" />}
            values={job.locationValues}
            colorClass="bg-green-100 text-green-800"
          />

          {/* Activities */}
          <BadgeGroup
            icon={<BriefcaseIcon className="w-4 h-4 text-blue-600" />}
            values={job.activitiesValues}
            colorClass="bg-blue-100 text-blue-800"
          />

          {/* Entry Levels */}
          <BadgeGroup
            icon={<AcademicCapIcon className="w-4 h-4 text-purple-600" />}
            values={job.entryLevelsValues}
            colorClass="bg-purple-100 text-purple-800"
          />

          {/* Working Times */}
          <BadgeGroup
            icon={<ClockIcon className="w-4 h-4 text-orange-600" />}
            values={job.workingTimesValues}
            colorClass="bg-orange-100 text-orange-800"
          />
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-gray-100">
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          >
            View Job Details
          </a>
        </div>
      </div>
    </div>
  );
};