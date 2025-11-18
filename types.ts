
export enum FilterCategory {
  Regions = 'regions',
  Sectors = 'sectors',
  ContentType = 'contentType',
  Tags = 'tags',
  Dates = 'dates',
}

export interface FilterOption {
  name: string;
  count: number;
  subItems?: FilterOption[];
}

export interface FilterSection {
  title: string;
  category: FilterCategory;
  options: FilterOption[];
  searchable?: boolean;
  control?: 'checkbox' | 'radio';
}

export interface Filters {
  regions: string[];
  sectors: string[];
  contentType: string[];
  tags: string[];
  dates: string | null;
  dateRange?: { from: string; to: string };
}

export interface Result {
  id: number;
  type: 'Research' | 'Issuer' | 'Rating';
  region: string;
  sector: string;
  contentType: string;
  tags: string[];
  title: string;
  description: string;
  status: string;
  date: string;
  image?: string;
}

export interface ActiveFilter {
  category: FilterCategory;
  value: string;
  originalValue: string;
}

export interface Article {
    id: number;
    title: string;
    category: string;
    image: string;
}