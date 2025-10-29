
'use client';

import { useEffect, useState } from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Newspaper, Loader2, List } from 'lucide-react';
import { getFoodSecurityNews } from '@/services/news-service';
import { formatDistanceToNow } from 'date-fns';

type NewsArticle = {
  title: string;
  link: string;
  source_id: string;
  pubDate: string;
};

export function IncidentFeed() {
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

    loadNews();
    const interval = setInterval(loadNews, 60000); 

    return () => clearInterval(interval);
  }, []);

  return (
        <>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="font-headline flex items-center gap-2">
                            <List className="h-5 w-5" />
                            Live Incident Feed
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
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin" />
                        <p>Fetching live feed...</p>
                    </div>
                    </div>
                )}
                {error && <p className="text-destructive text-sm text-center pt-8">{error}</p>}
                {!loading && articles.length === 0 && !error && (
                    <p className="text-muted-foreground text-sm text-center pt-8">No relevant articles found at the moment.</p>
                )}
                <div className="space-y-4">
                    {articles.map((article, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 rounded-md hover:bg-secondary/50">
                        <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-lg flex items-center justify-center mt-1">
                            <Newspaper className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className='w-full'>
                            <a href={article.link} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline text-sm">
                            {article.title}
                            </a>
                            <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                            <span>{article.source_id}</span>
                            <span>{article.pubDate ? formatDistanceToNow(new Date(article.pubDate), { addSuffix: true }) : ''}</span>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                </ScrollArea>
            </CardContent>
        </>
  );
}
