import { SearchResponse, MovieDetail, SearchParams } from '../types/movie';

const API_KEY = process.env.OMDB_API_KEY || '3960642c';
const BASE_URL = 'https://www.omdbapi.com/';

export async function searchMovies(params: SearchParams): Promise<SearchResponse> {
  const searchParams = new URLSearchParams({
    apikey: API_KEY,
    s: params.s,
    ...(params.type && { type: params.type }),
    ...(params.y && { y: params.y }),
    ...(params.page && { page: params.page.toString() }),
  });

  const response = await fetch(`${BASE_URL}?${searchParams}`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  
  if (data.Response === 'False') {
    throw new Error(data.Error || 'Unknown error occurred');
  }
  
  return data;
}

export async function getMovieDetails(imdbID: string): Promise<MovieDetail> {
  const searchParams = new URLSearchParams({
    apikey: API_KEY,
    i: imdbID,
    plot: 'full',
  });

  const response = await fetch(`${BASE_URL}?${searchParams}`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  
  if (data.Response === 'False') {
    throw new Error(data.Error || 'Unknown error occurred');
  }
  
  return data;
}
