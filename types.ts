import type { FilterCategory } from './constants';

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
  sector: string;
  title: string;
  description: string;
  status: string;
  date: string;
}

export interface ActiveFilter {
  category: FilterCategory;
  value: string;
  originalValue: string;
}
