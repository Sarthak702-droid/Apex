
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Mountain,
  Home,
  Users,
  Briefcase,
  Shield,
  BarChart3,
  Settings,
  GitGraph,
  Truck,
  Building2,
  Siren,
  Map,
  CloudSun,
  Store,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Role, ROLES } from '@/lib/constants';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const navLinks: Record<Role, { href: string; label: string; icon: React.ReactNode }[]> = {
  'Municipalities Corporation': [
    { href: '/dashboard/municipalities-corporation', label: 'City Overview', icon: <Home className="h-4 w-4" /> },
    { href: '/dashboard/municipalities-corporation/supply-analytics', label: 'Supply Analytics', icon: <BarChart3 className="h-4 w-4" /> },
    { href: '/dashboard/municipalities-corporation/weather-forecast', label: 'Weather Forecast', icon: <CloudSun className="h-4 w-4" /> },
    { href: '/dashboard/municipalities-corporation/ai-insights', label: 'Emergency Planning', icon: <Siren className="h-4 w-4" /> },
  ],
  'Development Authorities': [
    { href: '/dashboard/development-authorities', label: 'Infra Overview', icon: <Building2 className="h-4 w-4" /> },
    { href: '/dashboard/development-authorities#zoning', label: 'Food Zoning', icon: <Map className="h-4 w-4" /> },
    { href: '/dashboard/development-authorities#logistics', label: 'Logistics Infra', icon: <Truck className="h-4 w-4" /> },
  ],
  'Disaster Management Agencies': [
    { href: '/dashboard/disaster-management-agencies', label: 'Crisis Center', icon: <Siren className="h-4 w-4" /> },
    { href: '/dashboard/disaster-management-agencies#alerts', label: 'Disruption Alerts', icon: <Shield className="h-4 w-4" /> },
    { href: '/dashboard/disaster-management-agencies#response', label: 'Response Plans', icon: <Briefcase className="h-4 w-4" /> },
  ],
  'FPO (Farmer Producer Organization)': [
    { href: '/dashboard/fpo-farmer-producer-organization', label: 'FPO Overview', icon: <Home className="h-4 w-4" /> },
    { href: '/dashboard/fpo-farmer-producer-organization/mandi-prices', label: 'Mandi Prices', icon: <Store className="h-4 w-4" /> },
    { href: '/dashboard/fpo-farmer-producer-organization#member-stats', label: 'Member Stats', icon: <Users className="h-4 w-4" /> },
    { href: '/dashboard/fpo-farmer-producer-organization#performance', label: 'Performance', icon: <BarChart3
className="h-4 w-4" /> },
    { href: '/dashboard/fpo-farmer-producer-organization#aggregation', label: 'Supply Aggregation', icon: <GitGraph className="h-4 w-4" /> },
  ],
  'Logistic Supporter': [
    { href: '/dashboard/logistic-supporter', label: 'Logistics Hub', icon: <Truck className="h-4 w-4" /> },
    { href: '/dashboard/logistic-supporter#routes', label: 'Route Optimization', icon: <Map className="h-4 w-4" /> },
    { href: '/dashboard/logistic-supporter#fleet', label: 'Fleet Management', icon: <Briefcase className="h-4 w-4" /> },
  ],
  Admin: [
    { href: '/dashboard/admin', label: 'Overview', icon: <Home className="h-4 w-4" /> },
    { href: '/dashboard/admin#user-management', label: 'User Management', icon: <Users className="h-4 w-4" /> },
    { href: '/dashboard/admin#platform-analytics', label: 'Platform Analytics', icon: <BarChart3 className="h-4 w-4" /> },
    { href: '/dashboard/admin#system-health', label: 'System Health', icon: <Shield className="h-4 w-4" /> },
  ],
};

const getRoleFromPath = (path: string): Role => {
  const segments = path.split('/').filter(Boolean);
  const roleSegment = segments[1];
  const matchingRole = ROLES.find(r => r.toLowerCase().replace(/\s+/g, '-').replace(/\(|\)/g, '') === roleSegment);
  if (matchingRole) {
    return matchingRole;
  }
  
  // Fallback for default case if no role matches
  return 'Municipalities Corporation';
};


export function DashboardSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const role = getRoleFromPath(pathname);
  const links = navLinks[role] || [];

  const isLinkActive = (href: string) => {
    // For hash links, we want to check if the base path matches.
    const [baseHref] = href.split('#');
    const [basePathname] = pathname.split('#');

    // Exact match for pages without hashes.
    if (baseHref === basePathname && !href.includes('#')) {
      return true;
    }
    
    // For overview pages with hash links, we only want the overview to be active.
    if (basePathname === baseHref) {
        return true;
    }

    return false;
  };

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <Link href="/home" className={cn("flex items-center gap-2 font-semibold", state === 'collapsed' && 'invisible')}>
            <Mountain className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg">UFR-AI</span>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href}>
                <SidebarMenuButton
                  isActive={isLinkActive(link.href)}
                  tooltip={{ children: link.label }}
                >
                  {link.icon}
                  <span className='group-data-[collapsible=icon]:hidden'>{link.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="#">
              <SidebarMenuButton tooltip={{ children: "Settings" }}>
                <Settings />
                <span className='group-data-[collapsible=icon]:hidden'>Settings</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
