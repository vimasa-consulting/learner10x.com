import axios from 'axios';

const STRAPI_API_URL = process.env.STRAPI_API_URL || 'http://localhost:1337/api';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

const strapiClient = axios.create({
  baseURL: STRAPI_API_URL,
  headers: {
    'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch data from Strapi API
 * @param endpoint The API endpoint to fetch data from
 * @param params Query parameters for filtering, sorting, etc.
 */
export const fetchFromStrapi = async (endpoint: string, params = {}) => {
  try {
    const response = await strapiClient.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching from Strapi at ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Post data to Strapi API
 * @param endpoint The API endpoint to post data to
 * @param data The data to post
 */
export const postToStrapi = async (endpoint: string, data: any) => {
  try {
    const response = await strapiClient.post(endpoint, { data });
    return response.data;
  } catch (error) {
    console.error(`Error posting to Strapi at ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Update data in Strapi API
 * @param endpoint The API endpoint to update data at
 * @param id The ID of the item to update
 * @param data The data to update
 */
export const updateInStrapi = async (endpoint: string, id: string, data: any) => {
  try {
    const response = await strapiClient.put(`${endpoint}/${id}`, { data });
    return response.data;
  } catch (error) {
    console.error(`Error updating in Strapi at ${endpoint}/${id}:`, error);
    throw error;
  }
};

/**
 * Delete data from Strapi API
 * @param endpoint The API endpoint to delete data from
 * @param id The ID of the item to delete
 */
export const deleteFromStrapi = async (endpoint: string, id: string) => {
  try {
    const response = await strapiClient.delete(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting from Strapi at ${endpoint}/${id}:`, error);
    throw error;
  }
};
