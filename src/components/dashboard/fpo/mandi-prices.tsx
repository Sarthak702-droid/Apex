
'use client';

import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';

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

const API_KEY = '579b464db66ec23bdd000001cdc3b56454624e4272845db96b3644a4';
const API_URL = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&limit=1000`;

export function MandiPrices() {
  const [data, setData] = useState<MandiRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [stateFilter, setStateFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [commodityFilter, setCommodityFilter] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const result = await response.json();
        if (result.records) {
          setData(result.records);
        } else {
            throw new Error("No records found in API response.");
        }
      } catch (err: any) {
        setError(`Failed to load market data: ${err.message}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const states = useMemo(() => [...new Set(data.map(item => item.state))].sort(), [data]);
  const districts = useMemo(() => {
      if (!stateFilter) return [];
      return [...new Set(data.filter(item => item.state === stateFilter).map(item => item.district))].sort();
  }, [data, stateFilter]);

  const filteredData = useMemo(() => {
    return data.filter(item => 
        (stateFilter ? item.state === stateFilter : true) &&
        (districtFilter ? item.district === districtFilter : true) &&
        (commodityFilter ? item.commodity.toLowerCase().includes(commodityFilter.toLowerCase()) : true)
    );
  }, [data, stateFilter, districtFilter, commodityFilter]);
    
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    return filteredData.slice(startIndex, startIndex + recordsPerPage);
  }, [filteredData, currentPage, recordsPerPage]);
  
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

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

  if (error) {
    return <div className="text-destructive p-4 border border-destructive/50 rounded-lg bg-destructive/10">{error}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Prices</CardTitle>
        <CardDescription>Filter and search for commodity prices from various mandis.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Select value={stateFilter} onValueChange={value => { setStateFilter(value); setDistrictFilter(''); }}>
            <SelectTrigger><SelectValue placeholder="Select State" /></SelectTrigger>
            <SelectContent>
                <SelectItem value="">All States</SelectItem>
                {states.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={districtFilter} onValueChange={setDistrictFilter} disabled={!stateFilter}>
            <SelectTrigger><SelectValue placeholder="Select District" /></SelectTrigger>
            <SelectContent>
                 <SelectItem value="">All Districts</SelectItem>
                 {districts.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
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
        
        <div className="rounded-md border">
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
                paginatedData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                        <div className='font-medium'>{item.commodity}</div>
                        <div className='text-sm text-muted-foreground'>{item.variety}</div>
                    </TableCell>
                    <TableCell>
                        <div>{item.market}</div>
                        <div className='text-sm text-muted-foreground'>{item.district}, {item.state}</div>
                    </TableCell>
                    <TableCell className="text-right font-semibold">₹{item.modal_price}</TableCell>
                    <TableCell className="hidden md:table-cell text-right">₹{item.min_price}</TableCell>
                    <TableCell className="hidden md:table-cell text-right">₹{item.max_price}</TableCell>
                    <TableCell className="hidden lg:table-cell">{format(new Date(item.arrival_date), 'dd MMM yyyy')}</TableCell>
                  </TableRow>
                ))
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
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                    Previous
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                    Next
                </Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
