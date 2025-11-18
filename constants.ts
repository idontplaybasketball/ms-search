import { FilterCategory, type FilterSection } from './types';

export const FILTER_DATA: FilterSection[] = [
  {
    title: 'Regions',
    category: FilterCategory.Regions,
    options: [
      { 
        name: 'North America', 
        count: 0,
        subItems: [
          { name: 'Canada', count: 0 },
          { name: 'United States', count: 0 },
          { name: 'Mexico', count: 0 },
        ]
      },
      {
        name: 'Europe',
        count: 0,
        subItems: [
          { name: 'Cyprus', count: 0 },
          { name: 'Greece', count: 0 },
          { name: 'Italy', count: 0 },
          { name: 'Portugal', count: 0 },
          { name: 'Sweden', count: 0 },
          { name: 'Slovenia', count: 0 },
          { name: 'Denmark', count: 0 },
          { name: 'Spain', count: 0 },
          { name: 'Germany', count: 0 },
          { name: 'Slovakia', count: 0 },
          { name: 'France', count: 0 },
          { name: 'Ireland', count: 0 },
        ]
      },
      {
        name: 'Asia Pacific',
        count: 0,
        subItems: [
          { name: 'Australia', count: 0 },
          { name: 'India', count: 0 },
          { name: 'Singapore', count: 0 },
          { name: 'New Zealand', count: 0 },
          { name: 'China/Hong Kong', count: 0 },
        ]
      },
      { name: 'Rest of World', count: 0 },
    ],
  },
  {
    title: 'Sectors & Asset Classes',
    category: FilterCategory.Sectors,
    options: [
      {
        name: 'Financial Institutions',
        count: 0,
        subItems: [
          { name: 'Pension Funds', count: 0 },
          { name: 'Banking Organizations', count: 0 },
          { name: 'Funds & Investment Management', count: 0 },
          { name: 'Insurance Organizations', count: 0 },
          { name: 'Mortgage Insurance', count: 0 },
          { name: 'Non-Bank Financial Institutions', count: 0 },
        ],
      },
      { 
        name: 'Governments', 
        count: 0,
        subItems: [
            { name: 'Hospitals', count: 0 },
            { name: 'Sub-Sovereign Governments', count: 0 },
            { name: 'Supranational Institutions', count: 0 },
            { name: 'Universities', count: 0 },
            { name: 'Sovereigns', count: 0 },
            { name: 'Other Government Related Entities', count: 0 },
        ]
      },
      { 
        name: 'Corporate Finance', 
        count: 0,
        subItems: [
            { name: 'Autos & Auto Suppliers', count: 0 },
            { name: 'Consumers', count: 0 },
            { name: 'Energy', count: 0 },
            { name: 'Industrials', count: 0 },
            { name: 'Infrastructure', count: 0 },
            { name: 'Natural Resources', count: 0 },
            { name: 'Project Finance', count: 0 },
            { name: 'Real Estate', count: 0 },
            { name: 'Services', count: 0 },
            { name: 'Sports and Stadium Finance', count: 0 },
            { name: 'Telecom/Media/Technology', count: 0 },
            { name: 'Transportation', count: 0 },
            { name: 'Utilities & Independent Power', count: 0 },
        ]
      },
      { 
        name: 'Structured Finance', 
        count: 0,
        subItems: [
            { name: 'ABCP', count: 0 },
            { name: 'Auto', count: 0 },
            { name: 'CMBS', count: 0 },
            { name: 'Commercial Mortgages', count: 0 },
            { name: 'Consumer Loans and Credit Cards', count: 0 },
            { name: 'Consumer/Commercial Leases', count: 0 },
            { name: 'Covered Bonds', count: 0 },
            { name: 'Equipment', count: 0 },
            { name: 'Nonperforming Loans', count: 0 },
            { name: 'Property Assesed Clean Energy', count: 0 },
            { name: 'RMBS', count: 0 },
            { name: 'Split Share & Funds', count: 0 },
        ]
      },
    ],
  },
  {
    title: 'Content Type',
    category: FilterCategory.ContentType,
    options: [
        {
            name: 'Topical Content',
            count: 0,
            subItems: [
                { name: 'Commentaries', count: 0 },
                { name: 'Industry Studies', count: 0 },
            ]
        },
        {
            name: 'Credit Ratings',
            count: 0,
            subItems: [
                { name: 'Credit Rating Report', count: 0 },
                { name: 'Presale Report', count: 0 },
                { name: 'Performance Analytics Reports', count: 0 },
                { name: 'Ranking Report', count: 0 },
            ]
        },
        {
            name: 'Regulatory',
            count: 0,
            subItems: [
                { name: 'Methodology', count: 0 },
                { name: 'Credit Rating Scales', count: 0 },
                { name: 'Credit Rating Policies', count: 0 },
                { name: 'Regulatory Affairs', count: 0 },
            ]
        },
        {
            name: 'Media Content',
            count: 0,
            subItems: [
                { name: 'Interview', count: 0 },
                { name: 'Webinar', count: 0 },
                { name: 'Podcast', count: 0 },
                { name: 'Perspectives', count: 0 },
            ]
        }
    ],
  },
  {
    title: 'Tags',
    category: FilterCategory.Tags,
    options: [
      { name: 'ESG', count: 0 },
      { name: 'COVID-19', count: 0 },
      { name: 'INTEGRATION', count: 0 },
      { name: 'ORA', count: 0 },
      { name: 'CREDITRATINGS101', count: 0 },
      { name: 'RUSSIANUKRAINECONFLICT', count: 0 },
      { name: 'OUTLOOK', count: 0 },
      { name: 'OUTLOOK2024', count: 0 },
      { name: 'OUTLOOK2025', count: 0 },
      { name: 'BANKINGUPDATE', count: 0 },
      { name: 'DEBTCEILING', count: 0 },
      { name: 'USCRE', count: 0 },
      { name: 'TARIFFS', count: 0 },
      { name: 'PRIVATECREDIT', count: 0 },
      { name: 'AUSTRALIA', count: 0 },
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
