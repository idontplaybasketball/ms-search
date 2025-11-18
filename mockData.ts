
import { type Result } from './types';

const REGIONS = [
  'Canada', 'United States', 'Mexico',
  'Cyprus', 'Greece', 'Italy', 'Portugal', 'Sweden', 'Slovenia', 'Denmark', 'Spain', 'Germany', 'Slovakia', 'France', 'Ireland',
  'Australia', 'India', 'Singapore', 'New Zealand', 'China/Hong Kong',
  'Rest of World'
];

const SECTORS = [
  'Pension Funds', 'Banking Organizations', 'Funds & Investment Management', 'Insurance Organizations', 'Mortgage Insurance', 'Non-Bank Financial Institutions',
  'Hospitals', 'Sub-Sovereign Governments', 'Supranational Institutions', 'Universities', 'Sovereigns', 'Other Government Related Entities',
  'Autos & Auto Suppliers', 'Consumers', 'Energy', 'Industrials', 'Infrastructure', 'Natural Resources', 'Project Finance', 'Real Estate', 'Services', 'Sports and Stadium Finance', 'Telecom/Media/Technology', 'Transportation', 'Utilities & Independent Power',
  'ABCP', 'Auto', 'CMBS', 'Commercial Mortgages', 'Consumer Loans and Credit Cards', 'Consumer/Commercial Leases', 'Covered Bonds', 'Equipment', 'Nonperforming Loans', 'Property Assesed Clean Energy', 'RMBS', 'Split Share & Funds'
];

const CONTENT_TYPES = [
    'Commentaries', 'Industry Studies',
    'Credit Rating Report', 'Presale Report', 'Performance Analytics Reports', 'Ranking Report',
    'Methodology', 'Credit Rating Scales', 'Credit Rating Policies', 'Regulatory Affairs',
    'Interview', 'Webinar', 'Podcast', 'Perspectives'
];

const TAGS = [
  'ESG', 'COVID-19', 'INTEGRATION', 'ORA', 'CREDITRATINGS101', 'RUSSIANUKRAINECONFLICT', 
  'OUTLOOK', 'OUTLOOK2024', 'OUTLOOK2025', 'BANKINGUPDATE', 'DEBTCEILING', 'USCRE', 
  'TARIFFS', 'PRIVATECREDIT', 'AUSTRALIA'
];

function getRandomItem(arr: string[]): string {
    if (!arr || arr.length === 0) {
        return '';
    }
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomSubset(arr: string[], max: number): string[] {
    if (!arr || arr.length === 0) return [];
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * (Math.min(max, arr.length) + 1));
    return shuffled.slice(0, count);
}

const generateMockResults = (count: number, type: 'Research' | 'Issuer' | 'Rating', titlePrefix: string, descriptionPrefix: string): Result[] => {
    return Array.from({ length: count }).map((_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 365 * 2)); // random date in last 2 years
        
        const isEnergyRelated = titlePrefix.toLowerCase().includes('energy');

        const description = isEnergyRelated 
            ? `${descriptionPrefix} This methodology describes our approach for rating companies in the global energy sector.`
            : `${descriptionPrefix} This methodology describes our approach used for rating and monitoring U.S. single-family rental (SFR) securitizations.`;
        
        return {
            id: Math.random(),
            type,
            region: getRandomItem(REGIONS),
            sector: getRandomItem(SECTORS),
            contentType: getRandomItem(CONTENT_TYPES),
            tags: getRandomSubset(TAGS, 2),
            title: `${titlePrefix} #${index + 1}`,
            description: description,
            status: 'Active',
            date: date.toLocaleDateString('en-US'), // MM/DD/YYYY format,
            image: `https://picsum.photos/seed/${Math.random()}/80/80`
        };
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
