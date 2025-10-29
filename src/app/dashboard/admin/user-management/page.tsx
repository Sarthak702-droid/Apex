
import { UserManagement as UserManagementComponent } from '@/components/dashboard/admin/user-management';
import { UserRoleDistribution } from '@/components/dashboard/admin/user-role-distribution';
import { UserRegistrationChart } from '@/components/dashboard/admin/user-registration-chart';

export default function UserManagementPage() {
    return (
        <div className="space-y-8">
            <UserManagementComponent />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <UserRoleDistribution />
                <UserRegistrationChart />
            </div>
        </div>
    );
}
