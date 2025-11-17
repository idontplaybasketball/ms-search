
import type { FilterSection, Result } from './types';

export enum FilterCategory {
  Regions = 'regions',
  Sectors = 'sectors',
  ContentType = 'contentType',
  Tags = 'tags',
  Dates = 'dates',
}

export const FILTER_DATA: FilterSection[] = [
  {
    title: 'Regions',
    category: FilterCategory.Regions,
    options: [
      { 
        name: 'North America', 
        count: 15,
        subItems: [
          { name: 'Canada', count: 5 },
          { name: 'United States', count: 8 },
          { name: 'Mexico', count: 2 },
        ]
      },
      {
        name: 'Europe',
        count: 45,
        subItems: [
          { name: 'Cyprus', count: 2 },
          { name: 'Greece', count: 3 },
          { name: 'Italy', count: 6 },
          { name: 'Portugal', count: 4 },
          { name: 'Sweden', count: 5 },
          { name: 'Slovenia', count: 1 },
          { name: 'Denmark', count: 4 },
          { name: 'Spain', count: 5 },
          { name: 'Germany', count: 8 },
          { name: 'Slovakia', count: 1 },
          { name: 'France', count: 5 },
          { name: 'Ireland', count: 1 },
        ]
      },
      {
        name: 'Asia Pacific',
        count: 40,
        subItems: [
          { name: 'Australia', count: 10 },
          { name: 'India', count: 5 },
          { name: 'Singapore', count: 4 },
          { name: 'New Zealand', count: 3 },
          { name: 'China/Hong Kong', count: 18 },
        ]
      },
      { name: 'Rest of World', count: 5 },
    ],
  },
  {
    title: 'Sectors & Asset Classes',
    category: FilterCategory.Sectors,
    options: [
      {
        name: 'Financial Institutions',
        count: 23,
        subItems: [
          { name: 'Pension Funds', count: 3 },
          { name: 'Banking Organizations', count: 12 },
          { name: 'Funds & Investment Management', count: 2 },
          { name: 'Insurance Organizations', count: 3 },
          { name: 'Mortgage Insurance', count: 2 },
          { name: 'Non-Bank Financial Institutions', count: 2 },
        ],
      },
      { name: 'Governments', count: 13 },
      { name: 'Corporate Finance', count: 13 },
      { name: 'Structured Finance', count: 13 },
    ],
  },
  {
    title: 'Content Type',
    category: FilterCategory.ContentType,
    options: [
        {
            name: 'Topical Content',
            count: 25,
            subItems: [
                { name: 'Commentaries', count: 15 },
                { name: 'Industry Studies', count: 10 },
            ]
        },
        {
            name: 'Credit Ratings',
            count: 45,
            subItems: [
                { name: 'Credit Rating Report', count: 20 },
                { name: 'Presale Report', count: 8 },
                { name: 'Performance Analytics Reports', count: 12 },
                { name: 'Ranking Report', count: 5 },
            ]
        },
        {
            name: 'Regulatory',
            count: 35,
            subItems: [
                { name: 'Methodology', count: 15 },
                { name: 'Credit Rating Scales', count: 7 },
                { name: 'Credit Rating Policies', count: 9 },
                { name: 'Regulatory Affairs', count: 4 },
            ]
        },
        {
            name: 'Media Content',
            count: 46,
            subItems: [
                { name: 'Interview', count: 10 },
                { name: 'Webinar', count: 18 },
                { name: 'Podcast', count: 12 },
                { name: 'Perspectives', count: 6 },
            ]
        }
    ],
  },
  {
    title: 'Tags',
    category: FilterCategory.Tags,
    options: [
      { name: 'Credit', count: 80 },
      { name: 'Securitization', count: 45 },
      { name: 'Canada', count: 12 },
    ],
  },
  {
    title: 'Dates',
    category: FilterCategory.Dates,
    control: 'radio',
    options: [
        { name: 'Last Week', count: 0 },
        { name: 'Last Month', count: 0 },
        { name: 'Last Quarter', count: 0 },
        { name: 'Last Year', count: 0 },
        { name: 'Date Range', count: 0 },
    ],
  },
];

export const MOCK_RESULTS: Result[] = Array(10).fill({
    id: 1,
    sector: 'Sector Name',
    title: 'Rating Canadian Credit Card and Personal Line of Credit Securitizations',
    description: 'This methodology describes our approach used for rating and monitoring U.S. single-family rental (SFR) securitizations. SFR securitizations are unique in that the structures and legal documentation are primarily based on commercial mortgage-backed securities (CMBS);',
    status: 'Active',
    date: '10/20/25',
}).map((item, index) => ({ ...item, id: index + 1 }));