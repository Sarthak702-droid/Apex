
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Newspaper, Loader2 } from 'lucide-react';
import { getFoodSecurityNews } from '@/services/news-service';
import { formatDistanceToNow } from 'date-fns';

type NewsArticle = {
  title: string;
  link: string;
  source_id: string;
  pubDate: string;
};

export function LiveNewsFeed() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNews() {
      if (!loading) setLoading(true);
      setError(null);
      try {
        const newsArticles = await getFoodSecurityNews();
        setArticles(newsArticles);
      } catch (err) {
        setError('Failed to load news feed. The external API might be unavailable.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadNews(); // Initial load
    const interval = setInterval(loadNews, 60000); // Refresh every 60 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Newspaper className="h-5 w-5" />
                    Live News Feed
                </CardTitle>
                <CardDescription>
                    Live updates from news sources.
                </CardDescription>
            </div>
            {loading && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[30rem]">
          {loading && articles.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Fetching live news...</p>
            </div>
          )}
          {error && <p className="text-destructive text-sm text-center pt-8">{error}</p>}
          {!loading && articles.length === 0 && !error && (
            <p className="text-muted-foreground text-sm text-center pt-8">No relevant news articles found at the moment.</p>
          )}
          <div className="space-y-4">
            {articles.map((article, index) => (
              <div key={index} className="space-y-1 p-2 rounded-md hover:bg-secondary/50">
                <a href={article.link} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline text-sm">
                  {article.title}
                </a>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{article.source_id}</span>
                  <span>{article.pubDate ? formatDistanceToNow(new Date(article.pubDate), { addSuffix: true }) : ''}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
