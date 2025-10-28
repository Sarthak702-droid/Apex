import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";

const users = [
  { name: 'Aarav Sharma', email: 'aarav.s@example.com', role: 'Municipalities Corporation', status: 'Active', joined: '2023-10-26' },
  { name: 'Priya Patel', email: 'priya.p@example.com', role: 'Logistic Supporter', status: 'Active', joined: '2023-10-25' },
  { name: 'Rohan Verma', email: 'rohan.v@example.com', role: 'FPO (Farmer Producer Organization)', status: 'Inactive', joined: '2023-10-24' },
  { name: 'Sonia Gupta', email: 'sonia.g@example.com', role: 'Disaster Management Agencies', status: 'Active', joined: '2023-10-23' },
  { name: 'Admin User', email: 'admin@ufr-ai.gov.in', role: 'Admin', status: 'Active', joined: '2023-01-01' },
];

export function UserManagement() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-headline">User Management</CardTitle>
          <CardDescription>Manage all platform users.</CardDescription>
        </div>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-4 w-4" />
          Add User
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Joined</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.email}>
                <TableCell>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">{user.email}</div>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant={user.status === 'Active' ? 'default' : 'secondary'} className={user.status === 'Active' ? 'bg-green-500/20 text-green-700 dark:bg-green-500/10 dark:text-green-400' : ''}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{user.joined}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Deactivate</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
