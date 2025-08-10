export interface SearchRequest {
  searchTerm: string;
  activities: string[];
  locations: string[];
  entryLevels: string[];
  workingTimes: string[];
  page: number;
  includeFacets: boolean;
}

export interface FacetItem {
  value: string;
  count: number;
  label: string;
}

export interface Facets {
  activities: FacetItem[];
  locations: FacetItem[];
  entryLevels: FacetItem[];
  workingTimes: FacetItem[];
}

export interface JobResult {
  id: string;
  title: string;
  url: string;
  lastUpdated: string;
  locationText: string;
  locationValues: string[];
  activitiesText: string;
  activitiesValues: string[];
  entryLevelsText: string;
  entryLevelsValues: string[];
  workingTimesText: string;
  workingTimesValues: string[];
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalResults: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface SearchInfo {
  executionTimeMs: number;
  searchTerm: string;
  appliedFilters: {
    activities: string[] | null;
    locations: string[] | null;
    entryLevels: string[] | null;
    workingTimes: string[] | null;
  };
}

export interface SearchResponse {
  results: JobResult[];
  pagination: Pagination;
  searchInfo: SearchInfo;
  facets: Facets;
}