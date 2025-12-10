/**
 * API Client for Portfolio Admin
 *
 * Fetches data from the deployed portfolio-admin API at build time (SSG).
 * All endpoints are public and CORS-enabled for GitHub Pages.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://portfolio-admin-blue.vercel.app';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      // Revalidate every 24 hours for SSG
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'API request failed');
    }

    return data.data as T;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Fetch all enums (dropdown values) for filters and forms
 */
export async function fetchEnums() {
  return fetchAPI<{
    projectCategories: string[];
    companies: string[];
    jobRoles: string[];
    certCategories: string[];
    certStatuses: string[];
    skillLevels: string[];
    jobTypes: string[];
    blogCategories: string[];
  }>('/api/public/enums');
}

/**
 * Fetch all projects
 */
export async function fetchProjects(params?: {
  category?: string;
  company?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  limit?: number;
  page?: number;
}) {
  const queryParams = new URLSearchParams();

  if (params?.category) queryParams.append('category', params.category);
  if (params?.company) queryParams.append('company', params.company);
  if (params?.isActive !== undefined) queryParams.append('isActive', String(params.isActive));
  if (params?.isFeatured !== undefined) queryParams.append('isFeatured', String(params.isFeatured));
  if (params?.limit) queryParams.append('limit', String(params.limit));
  if (params?.page) queryParams.append('page', String(params.page));

  const query = queryParams.toString();
  const endpoint = `/api/public/projects${query ? `?${query}` : ''}`;

  const projects = await fetchAPI<any[]>(endpoint);

  // Convert date strings to Date objects
  return projects.map(project => ({
    ...project,
    startDate: project.startDate ? new Date(project.startDate) : new Date(),
    endDate: project.endDate ? new Date(project.endDate) : new Date(),
  }));
}

/**
 * Fetch all certifications
 */
export async function fetchCertifications(params?: {
  category?: string;
  status?: string;
  featured?: boolean;
  limit?: number;
  page?: number;
}) {
  const queryParams = new URLSearchParams();

  if (params?.category) queryParams.append('category', params.category);
  if (params?.status) queryParams.append('status', params.status);
  if (params?.featured !== undefined) queryParams.append('featured', String(params.featured));
  if (params?.limit) queryParams.append('limit', String(params.limit));
  if (params?.page) queryParams.append('page', String(params.page));

  const query = queryParams.toString();
  const endpoint = `/api/public/certifications${query ? `?${query}` : ''}`;

  return fetchAPI<any[]>(endpoint);
}

/**
 * Fetch skill hierarchy
 */
export async function fetchSkillHierarchy() {
  return fetchAPI<any[]>('/api/public/skill-hierarchy');
}

/**
 * Fetch all timeline entries (career experience)
 */
export async function fetchTimeline() {
  const timeline = await fetchAPI<any[]>('/api/public/timeline');

  // Convert date strings to Date objects
  return timeline.map(entry => ({
    ...entry,
    startDate: entry.startDate ? new Date(entry.startDate) : new Date(),
    endDate: entry.endDate ? new Date(entry.endDate) : new Date(),
  }));
}

/**
 * Fetch all testimonials
 */
export async function fetchTestimonials() {
  return fetchAPI<any[]>('/api/public/testimonials');
}

/**
 * Fetch all blog posts
 */
export async function fetchBlogPosts(params?: {
  category?: string;
  isPublished?: boolean;
  limit?: number;
  page?: number;
}) {
  const queryParams = new URLSearchParams();

  if (params?.category) queryParams.append('category', params.category);
  if (params?.isPublished !== undefined) queryParams.append('isPublished', String(params.isPublished));
  if (params?.limit) queryParams.append('limit', String(params.limit));
  if (params?.page) queryParams.append('page', String(params.page));

  const query = queryParams.toString();
  const endpoint = `/api/public/blog${query ? `?${query}` : ''}`;

  return fetchAPI<any[]>(endpoint);
}
