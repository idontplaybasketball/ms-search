import { FilterCategory, type FilterSection, type Result, type FilterOption } from './types';

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
      { name: 'Governments', count: 0 },
      { name: 'Corporate Finance', count: 0 },
      { name: 'Structured Finance', count: 0 },
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
      { name: 'Credit', count: 0 },
      { name: 'Securitization', count: 0 },
      { name: 'Canada', count: 0 },
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

const getLeafOptions = (category: FilterCategory): string[] => {
    const section = FILTER_DATA.find(s => s.category === category);
    if (!section) return [];
    return section.options.reduce<string[]>((acc, opt) => {
        if (opt.subItems && opt.subItems.length > 0) {
            acc.push(...opt.subItems.map(si => si.name));
        } else if (!opt.subItems) {
            acc.push(opt.name);
        }
        return acc;
    }, []);
};

const REGION_LEAVES = getLeafOptions(FilterCategory.Regions);
const SECTOR_LEAVES = getLeafOptions(FilterCategory.Sectors);
const CONTENT_TYPE_LEAVES = getLeafOptions(FilterCategory.ContentType);
const TAG_LEAVES = getLeafOptions(FilterCategory.Tags);

const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomSubset = <T>(arr: T[], max: number): T[] => {
    if (!arr || arr.length === 0) return [];
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * (Math.min(max, arr.length) + 1));
    return shuffled.slice(0, count);
};

const generateMockResults = (count: number, type: 'Research' | 'Issuer' | 'Rating', titlePrefix: string, descriptionPrefix: string): Result[] => {
    return Array(count).fill(null).map((_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 365 * 2)); // random date in last 2 years
        
        const isEnergyRelated = titlePrefix.toLowerCase().includes('energy');

        const description = isEnergyRelated 
            ? `${descriptionPrefix} This methodology describes our approach for rating companies in the global energy sector.`
            : `${descriptionPrefix} This methodology describes our approach used for rating and monitoring U.S. single-family rental (SFR) securitizations.`;
        
        return {
            id: Math.random(),
            type,
            region: getRandomItem(REGION_LEAVES),
            sector: getRandomItem(SECTOR_LEAVES),
            contentType: getRandomItem(CONTENT_TYPE_LEAVES),
            tags: getRandomSubset(TAG_LEAVES, 2),
            title: `${titlePrefix} #${index + 1}`,
            description: description,
            status: 'Active',
            date: date.toLocaleDateString('en-US'), // MM/DD/YYYY format,
            image: `https://picsum.photos/seed/${Math.random()}/80/80`
        }
    });
}

const totalEnergyResearch = 26;
const totalEnergyIssuers = 20;
const totalEnergyRatings = 20;

const totalOtherResearch = 18;
const totalOtherIssuers = 7;
const totalOtherRatings = 11;


export const MOCK_RESULTS: Result[] = [
    // ~65 Energy-related results
    ...generateMockResults(totalEnergyResearch, 'Research', 'Analysis of the Energy Sector', 'Research Document:'),
    ...generateMockResults(totalEnergyIssuers, 'Issuer', 'Issuer Profile: Global Energy Co.', 'Issuer Analysis:'),
    ...generateMockResults(totalEnergyRatings, 'Rating', 'Rating Action: Energy Subsidiary', 'Rating Report:'),
    
    // ~36 Other results
    ...generateMockResults(totalOtherResearch, 'Research', 'Rating Canadian Credit Card Securitizations', 'Research Document:'),
    ...generateMockResults(totalOtherIssuers, 'Issuer', 'Issuer Profile: Major Bank', 'Issuer Analysis:'),
    ...generateMockResults(totalOtherRatings, 'Rating', 'Rating Action: Tech Company Update', 'Rating Report:'),
].map((item, index) => ({ ...item, id: index + 1 }));