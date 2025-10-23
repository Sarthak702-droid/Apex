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
  DollarSign,
  Plus,
  TrendingUp,
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
  Farmer: [
    { href: '/dashboard/farmer', label: 'Overview', icon: <Home className="h-4 w-4" /> },
    { href: '/dashboard/farmer/crop-recommendations', label: 'AI Recommendations', icon: <Wheat className="h-4 w-4" /> },
    { href: '/dashboard/farmer/compare-crops', label: 'Compare Crops', icon: <TrendingUp className="h-4 w-4" /> },
    { href: '/dashboard/farmer/quality-check', label: 'Quality Check', icon: <FileText className="h-4 w-4" /> },
    { href: '/dashboard/farmer/contracts', label: 'My Contracts', icon: <Briefcase className="h-4 w-4" /> },
    { href: '/dashboard/farmer/profitability', label: 'Profitability', icon: <DollarSign className="h-4 w-4" /> },
    { href: '/dashboard/farmer/oilseed-motivation', label: 'Govt Schemes', icon: <Landmark className="h-4 w-4" /> },
  ],
  FPO: [
    { href: '/dashboard/fpo', label: 'Overview', icon: <Home className="h-4 w-4" /> },
    { href: '/dashboard/fpo#member-stats', label: 'Member Stats', icon: <Users className="h-4 w-4" /> },
    { href: '/dashboard/fpo#performance', label: 'Performance', icon: <BarChart3 className="h-4 w-4" /> },
    { href: '/dashboard/fpo#aggregation', label: 'Aggregation', icon: <GitGraph className="h-4 w-4" /> },
  ],
  Buyer: [
    { href: '/dashboard/buyer', label: 'Overview', icon: <Home className="h-4 w-4" /> },
    { href: '/dashboard/buyer/new-contract', label: 'Create Contract', icon: <Plus className="h-4 w-4" /> },
    { href: '/dashboard/buyer#quality-reports', label: 'Quality Reports', icon: <FileText className="h-4 w-4" /> },
    { href: '/dashboard/buyer#contracts', label: 'My Contracts', icon: <Briefcase className="h-4 w-4" /> },
  ],
  Government: [
    { href: '/dashboard/government', label: 'Overview', icon: <Home className="h-4 w-4" /> },
    { href: '/dashboard/government/new-scheme', label: 'Create Scheme', icon: <Plus className="h-4 w-4" /> },
    { href: '/dashboard/government#policy-analytics', label: 'Policy Analytics', icon: <Landmark className="h-4 w-4" /> },
    { href: '/dashboard/government#sustainability-data', label: 'Sustainability Data', icon: <Leaf className="h-4 w-4" /> },
    { href: '/dashboard/government#real-time-monitoring', label: 'Real-time Monitoring', icon: <BarChart3.Icon className="h-4 w-4" /> },
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
  const roleSegment = segments[1] as (typeof ROLES[number]);
  if (ROLES.map(r => r.toLowerCase()).includes(roleSegment)) {
      const role = ROLES.find(r => r.toLowerCase() === roleSegment);
      if(role) return role;
  }
  
  // Fallback for nested routes
  const potentialRole = segments[1]?.charAt(0).toUpperCase() + segments[1]?.slice(1) as Role;
  if (ROLES.includes(potentialRole)) {
    return potentialRole;
  }
  
  return 'Farmer'; // Default fallback
};


export function DashboardSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const role = getRoleFromPath(pathname);
  const links = navLinks[role] || [];

  const isLinkActive = (href: string) => {
    // Exact match for overview pages
    if (pathname === href) return true;
    // For nested routes, check if the path starts with the link's href
    if (!href.includes('#') && pathname.startsWith(href)) return true;
    // For hash links on the overview page
    if (pathname === `/dashboard/${role.toLowerCase()}` && href.includes('#')) return false;

    return false;
  };

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <Link href="/home" className={cn("flex items-center gap-2 font-semibold", state === 'collapsed' && 'invisible')}>
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg">Tel-Samriddhi</span>
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
