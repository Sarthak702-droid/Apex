'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Leaf,
  Home,
  Users,
  Briefcase,
  Landmark,
  Shield,
  BarChart3,
  Settings,
  GitGraph,
  Wheat,
  ShoppingBasket,
  FileText,
  DollarSign
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Role } from '@/lib/constants';

const navLinks: Record<Role, { href: string; label: string; icon: React.ReactNode }[]> = {
  Farmer: [
    { href: '/dashboard/farmer', label: 'Overview', icon: <Home className="h-4 w-4" /> },
    { href: '/dashboard/farmer#crop-recommendations', label: 'Crop Recommendations', icon: <Wheat className="h-4 w-4" /> },
    { href: '/dashboard/farmer#profitability', label: 'Profitability', icon: <DollarSign className="h-4 w-4" /> },
    { href: '/dashboard/farmer#contracts', label: 'Contracts', icon: <FileText className="h-4 w-4" /> },
  ],
  FPO: [
    { href: '/dashboard/fpo', label: 'Overview', icon: <Home className="h-4 w-4" /> },
    { href: '/dashboard/fpo#member-stats', label: 'Member Stats', icon: <Users className="h-4 w-4" /> },
    { href: '/dashboard/fpo#performance', label: 'Performance', icon: <BarChart3 className="h-4 w-4" /> },
    { href: '/dashboard/fpo#aggregation', label: 'Aggregation', icon: <GitGraph className="h-4 w-4" /> },
  ],
  Buyer: [
    { href: '/dashboard/buyer', label: 'Overview', icon: <Home className="h-4 w-4" /> },
    { href: '/dashboard/buyer#purchase-insights', label: 'Purchase Insights', icon: <ShoppingBasket className="h-4 w-4" /> },
    { href: '/dashboard/buyer#quality-reports', label: 'Quality Reports', icon: <FileText className="h-4 w-4" /> },
    { href: '/dashboard/buyer#contracts', label: 'Contracts', icon: <Briefcase className="h-4 w-4" /> },
  ],
  Government: [
    { href: '/dashboard/government', label: 'Overview', icon: <Home className="h-4 w-4" /> },
    { href: '/dashboard/government#policy-analytics', label: 'Policy Analytics', icon: <Landmark className="h-4 w-4" /> },
    { href: '/dashboard/government#sustainability-data', label: 'Sustainability Data', icon: <Leaf className="h-4 w-4" /> },
    { href: '/dashboard/government#real-time-monitoring', label: 'Real-time Monitoring', icon: <BarChart3 className="h-4 w-4" /> },
  ],
  Admin: [
    { href: '/dashboard/admin', label: 'Overview', icon: <Home className="h-4 w-4" /> },
    { href: '/dashboard/admin#user-management', label: 'User Management', icon: <Users className="h-4 w-4" /> },
    { href: '/dashboard/admin#platform-analytics', label: 'Platform Analytics', icon: <BarChart3 className="h-4 w-4" /> },
    { href: '/dashboard/admin#system-health', label: 'System Health', icon: <Shield className="h-4 w-4" /> },
  ],
};

const getRoleFromPath = (path: string): Role => {
  const segment = path.split('/')[2];
  switch (segment) {
    case 'farmer': return 'Farmer';
    case 'fpo': return 'FPO';
    case 'buyer': return 'Buyer';
    case 'government': return 'Government';
    case 'admin': return 'Admin';
    default: return 'Farmer'; // Default fallback
  }
};

export function DashboardSidebarNav({ isMobile }: { isMobile: boolean }) {
  const pathname = usePathname();
  const role = getRoleFromPath(pathname);
  const links = navLinks[role] || [];
  
  return (
    <>
      <div className="flex h-16 items-center border-b px-4 lg:px-6">
        <Link href="/home" className="flex items-center gap-2 font-semibold">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg">Tel-Samriddhi</span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className={cn("grid items-start px-2 text-sm font-medium lg:px-4", isMobile && 'py-4')}>
          {links.map((link) => (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                (pathname === link.href) && 'bg-accent text-primary'
              )}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <div className="grid gap-2">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
        </div>
      </div>
    </>
  );
}
