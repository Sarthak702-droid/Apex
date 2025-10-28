'use client';

import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { parse, format } from 'date-fns';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

type MandiRecord = {
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety: string;
  arrival_date: string;
  min_price: string;
  max_price: string;
  modal_price: string;
};

const API_KEY = '579b464db66ec23bdd000001f8c04fcedac4455e6f57c39605f09be9';
const API_URL = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&limit=5000`;

const parseDate = (dateString: string): Date | null => {
  if (!dateString || typeof dateString !== 'string') return null;
  try {
    // API format can be dd/mm/yyyy
    return parse(dateString, 'dd/MM/yyyy', new Date());
  } catch (error) {
    console.error('Failed to parse date:', dateString, error);
    return null;
  }
};

export function MandiPrices() {
  const [data, setData] = useState<MandiRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [stateFilter, setStateFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [commodityFilter, setCommodityFilter] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const result = await response.json();
        if (result.records) {
          setData(result.records);
        } else {
          throw new Error('No records found in API response.');
        }
      } catch (err) {
        setError(
          'Failed to load market data. This may be due to external API rate limits or CORS policy issues that block direct browser requests.'
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [stateFilter, districtFilter, commodityFilter]);

  const states = useMemo(() => [...new Set(data.map(item => item.state))].sort(), [data]);
  const districts = useMemo(() => {
    if (stateFilter === 'all') return [];
    return [...new Set(data.filter(item => item.state === stateFilter).map(item => item.district))].sort();
  }, [data, stateFilter]);

  const filteredData = useMemo(() => {
    return data.filter(
      item =>
        (stateFilter !== 'all' ? item.state === stateFilter : true) &&
        (districtFilter !== 'all' ? item.district === districtFilter : true) &&
        (commodityFilter ? item.commodity.toLowerCase().includes(commodityFilter.toLowerCase()) : true)
    );
  }, [data, stateFilter, districtFilter, commodityFilter]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    return filteredData.slice(startIndex, startIndex + recordsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const chartData = useMemo(() => {
    if (!filteredData.length) return { statePrices: [], commodityDistribution: [] };

    // State Prices
    const statePriceMap = new Map<string, { total: number; count: number }>();
    filteredData.forEach(item => {
      const price = parseFloat(item.modal_price);
      if (isNaN(price)) return;
      if (!statePriceMap.has(item.state)) {
        statePriceMap.set(item.state, { total: 0, count: 0 });
      }
      const stateData = statePriceMap.get(item.state)!;
      stateData.total += price;
      stateData.count++;
    });
    const statePrices = Array.from(statePriceMap.entries())
      .map(([name, { total, count }]) => ({ name, avgPrice: Math.round(total / count) }))
      .sort((a, b) => b.avgPrice - a.avgPrice)
      .slice(0, 5);

    // Commodity Distribution
    const commodityCount = new Map<string, number>();
    filteredData.forEach(item => {
      commodityCount.set(item.commodity, (commodityCount.get(item.commodity) || 0) + 1);
    });
    const commodityDistribution = Array.from(commodityCount.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    return { statePrices, commodityDistribution };
  }, [filteredData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-lg border bg-card p-8 h-96">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
          <p className="text-muted-foreground">Loading Mandi Data...</p>
        </div>
      </div>
    );
  }

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Prices</CardTitle>
        <CardDescription>Filter and search for commodity prices from various mandis.</CardDescription>
      </CardHeader>

      <CardContent>
        {error && (
          <div className="text-amber-600 p-4 border border-amber-500/50 rounded-lg bg-amber-500/10 mb-6">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Top 5 States by Avg. Price (₹)</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-64 w-full">
                        <ResponsiveContainer>
                            <BarChart data={chartData.statePrices} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid horizontal={false} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={100} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="avgPrice" fill="var(--color-chart-1)" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Top 5 Commodity Distribution</CardTitle>
                </CardHeader>
                <CardContent className='flex justify-center'>
                     <ChartContainer config={{}} className="h-64 w-full">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={chartData.commodityDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                    {chartData.commodityDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Select
            value={stateFilter}
            onValueChange={value => {
              setStateFilter(value);
              setDistrictFilter('all');
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {states.map(s => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={districtFilter} onValueChange={setDistrictFilter} disabled={stateFilter === 'all'}>
            <SelectTrigger>
              <SelectValue placeholder="Select District" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Districts</SelectItem>
              {districts.map(d => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Commodity..."
              className="pl-8"
              value={commodityFilter}
              onChange={e => setCommodityFilter(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Commodity</TableHead>
                <TableHead>Market</TableHead>
                <TableHead className="text-right">Modal Price (₹/Quintal)</TableHead>
                <TableHead className="hidden md:table-cell text-right">Min Price</TableHead>
                <TableHead className="hidden md:table-cell text-right">Max Price</TableHead>
                <TableHead className="hidden lg:table-cell">Arrival Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => {
                  const arrivalDate = parseDate(item.arrival_date);
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{item.commodity}</div>
                        <div className="text-sm text-muted-foreground">{item.variety}</div>
                      </TableCell>
                      <TableCell>
                        <div>{item.market}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.district}, {item.state}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold">₹{item.modal_price}</TableCell>
                      <TableCell className="hidden md:table-cell text-right">₹{item.min_price}</TableCell>
                      <TableCell className="hidden md:table-cell text-right">₹{item.max_price}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {arrivalDate ? format(arrivalDate, 'dd MMM yyyy') : 'N/A'}
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
