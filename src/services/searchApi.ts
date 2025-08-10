import { SearchRequest, SearchResponse } from '../types/search';

// Mock data for demonstration
const mockResponse: SearchResponse = {
  results: [
    {
      id: "f1a2b3c4-d5e6-7890-abcd-ef0123457000",
      title: "Personalreferent (m/w/d)* Personal und Qualifizierung",
      url: "https://karriere.example.com/job?id=f1a2b3c4-d5e6-7890-abcd-ef0123457000",
      lastUpdated: "2025-08-09T22:00:00Z",
      locationText: "Standort",
      locationValues: ["Düsseldorf", "Essen"],
      activitiesText: "Tätigkeitsbereich",
      activitiesValues: ["Personal und Qualifizierung", "Prozess- und Projektmanagement"],
      entryLevelsText: "Einstiegslevel",
      entryLevelsValues: ["Berufseinstieg", "Berufserfahrung"],
      workingTimesText: "Arbeitszeit",
      workingTimesValues: ["Vollzeit", "Teilzeit"]
    },
    {
      id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      title: "Software Developer (m/w/d) Frontend",
      url: "https://karriere.example.com/job?id=a1b2c3d4-e5f6-7890-1234-567890abcdef",
      lastUpdated: "2025-08-08T15:30:00Z",
      locationText: "Standort",
      locationValues: ["Köln", "Remote"],
      activitiesText: "Tätigkeitsbereich",
      activitiesValues: ["Digitalisierung", "Software Development"],
      entryLevelsText: "Einstiegslevel",
      entryLevelsValues: ["Berufserfahrung"],
      workingTimesText: "Arbeitszeit",
      workingTimesValues: ["Vollzeit"]
    }
  ],
  pagination: {
    currentPage: 1,
    pageSize: 20,
    totalResults: 13,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false
  },
  searchInfo: {
    executionTimeMs: 30,
    searchTerm: "",
    appliedFilters: {
      activities: null,
      locations: null,
      entryLevels: null,
      workingTimes: null
    }
  },
  facets: {
    activities: [
      { value: "Digitalisierung", count: 5, label: "Activities" },
      { value: "Kundenbetreuung", count: 4, label: "Activities" },
      { value: "Marketing und Kommunikation", count: 4, label: "Activities" },
      { value: "Personal und Qualifizierung", count: 3, label: "Activities" },
      { value: "Software Development", count: 2, label: "Activities" }
    ],
    locations: [
      { value: "Düsseldorf", count: 13, label: "Locations" },
      { value: "Köln", count: 2, label: "Locations" },
      { value: "Leipzig", count: 2, label: "Locations" },
      { value: "Bonn", count: 1, label: "Locations" },
      { value: "Remote", count: 1, label: "Locations" }
    ],
    entryLevels: [
      { value: "Berufseinstieg", count: 6, label: "Entry Levels" },
      { value: "Ausbildung / Duales Studium", count: 4, label: "Entry Levels" },
      { value: "Berufserfahrung", count: 4, label: "Entry Levels" }
    ],
    workingTimes: [
      { value: "Teilzeit", count: 11, label: "Working Times" },
      { value: "Vollzeit", count: 9, label: "Working Times" },
      { value: "Minijob/Geringfügig", count: 6, label: "Working Times" }
    ]
  }
};

export const searchJobs = async (request: SearchRequest): Promise<SearchResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // TODO: Replace with actual API call
  // const response = await fetch('YOUR_API_ENDPOINT', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(request),
  // });
  // return await response.json();
  
  // Filter mock results based on request
  let filteredResults = mockResponse.results;
  
  if (request.searchTerm) {
    filteredResults = filteredResults.filter(job => 
      job.title.toLowerCase().includes(request.searchTerm.toLowerCase())
    );
  }
  
  if (request.locations.length > 0) {
    filteredResults = filteredResults.filter(job =>
      job.locationValues.some(loc => request.locations.includes(loc))
    );
  }
  
  if (request.activities.length > 0) {
    filteredResults = filteredResults.filter(job =>
      job.activitiesValues.some(act => request.activities.includes(act))
    );
  }
  
  return {
    ...mockResponse,
    results: filteredResults,
    pagination: {
      ...mockResponse.pagination,
      totalResults: filteredResults.length
    },
    searchInfo: {
      ...mockResponse.searchInfo,
      searchTerm: request.searchTerm,
      appliedFilters: {
        activities: request.activities.length > 0 ? request.activities : null,
        locations: request.locations.length > 0 ? request.locations : null,
        entryLevels: request.entryLevels.length > 0 ? request.entryLevels : null,
        workingTimes: request.workingTimes.length > 0 ? request.workingTimes : null,
      }
    }
  };
};