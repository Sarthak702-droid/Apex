
'use server';

type NewsArticle = {
  title: string;
  link: string;
  source_id: string;
  pubDate: string;
};

type NewsApiResponse = {
  status: string;
  totalResults: number;
  results: NewsArticle[];
};

export async function getFoodSecurityNews(): Promise<NewsArticle[]> {
  const apiKey = process.env.NEWSDATA_API_KEY;
  if (!apiKey) {
    console.error('NEWSDATA_API_KEY is not set.');
    return [];
  }

  // Broadened query for incidents in Bhubaneswar / Odisha
  const location = 'Bhubaneswar OR Odisha';
  const incidentKeywords = '"supply disruption" OR shortage OR protest OR traffic OR accident OR "heavy rain" OR flood OR power outage';
  const query = `(${location}) AND (${incidentKeywords})`;


  // Fetch news from India, in English
  const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(query)}&country=in&language=en&category=business,food,politics,environment,technology,top,world`;

  try {
    const response = await fetch(url, {
        next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`News API request failed with status ${response.status}:`, errorBody);
      return [];
    }

    const data: NewsApiResponse = await response.json();

    if (data.status === 'success') {
      // Limit to 10 articles
      return data.results.slice(0, 10);
    } else {
      console.error('News API returned an error status.');
      return [];
    }
  } catch (error) {
    console.error('Failed to fetch news data:', error);
    return [];
  }
}
