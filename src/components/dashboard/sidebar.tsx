'use client';

import { usePathname } from 'next/navigation';
import { DashboardSidebarNav } from './sidebar-nav';

export function DashboardSidebar() {
  const pathname = usePathname();
  const role = pathname.split('/')[2] || 'user';

  return (
    <aside className="hidden border-r bg-background md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <DashboardSidebarNav isMobile={false} />
      </div>
    </aside>
  );
}
