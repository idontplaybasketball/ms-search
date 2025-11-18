import { FILTER_DATA } from './constants';
import { FilterCategory, type Result } from './types';

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
