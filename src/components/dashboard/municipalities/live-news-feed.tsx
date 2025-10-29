
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
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
      setLoading(true);
      setError(null);
      try {
        const newsArticles = await getFoodSecurityNews();
        setArticles(newsArticles);
      } catch (err) {
        setError('Failed to load news feed.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Newspaper className="h-5 w-5 text-primary" />
          Live News Feed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72">
          {loading && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}
          {error && <p className="text-destructive text-sm">{error}</p>}
          {!loading && articles.length === 0 && !error && (
            <p className="text-muted-foreground text-sm text-center pt-8">No relevant news articles found at the moment.</p>
          )}
          <div className="space-y-4">
            {articles.map((article, index) => (
              <div key={index} className="space-y-1">
                <a href={article.link} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">
                  {article.title}
                </a>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{article.source_id}</span>
                  <span>{formatDistanceToNow(new Date(article.pubDate), { addSuffix: true })}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
