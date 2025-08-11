// Returns the correct job image path based on job title
export function getJobImage(title: string): string {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle === 'downtown office complex') {
    return '/Job pictures/Office building 2.jpeg';
  } else if (lowerTitle === 'distribution center') {
    return '/Job pictures/Warehouse 4.jpeg';
  } else if (lowerTitle.includes('data center')) {
    return '/Job pictures/Data Center 1.jpeg';
  } else if (lowerTitle.includes('office')) {
    return '/Job pictures/Office building 1.jpeg';
  } else if (lowerTitle.includes('warehouse')) {
    return '/Job pictures/Warehouse 1.jpeg';
  } else if (lowerTitle.includes('hospital') || lowerTitle.includes('medical')) {
    return '/Job pictures/Hospital 1.jpeg';
  } else if (lowerTitle.includes('manufacturing') || lowerTitle.includes('plant')) {
    return '/Job pictures/Warehouse 2.jpeg';
  } else if (lowerTitle.includes('retail') || lowerTitle.includes('shopping')) {
    return '/Job pictures/Shopping center 1.jpeg';
  } else if (lowerTitle.includes('tech') || lowerTitle.includes('campus')) {
    return '/Job pictures/Office building 3.jpeg';
  } else if (lowerTitle.includes('construction')) {
    return '/Job pictures/Skyscraper.jpeg';
  } else {
    // Default fallback for other job types
    return '/Job pictures/Office building 1.jpeg';
  }
}
