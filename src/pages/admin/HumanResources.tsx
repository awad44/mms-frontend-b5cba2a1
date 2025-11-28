import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users, UserCheck, Clock, AlertCircle, Calendar } from 'lucide-react';
import { mockEmployees, mockLeaves } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import type { Employee, Leave } from '@/types';

export default function HumanResources() {
  const { toast } = useToast();
  const [addEmployeeOpen, setAddEmployeeOpen] = useState(false);
  const [viewProfileOpen, setViewProfileOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [leaves, setLeaves] = useState(mockLeaves);

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    phone: ''
  });

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.position) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Employee Added",
      description: `${newEmployee.name} has been successfully added to the system.`,
    });

    setNewEmployee({ name: '', email: '', position: '', department: '', phone: '' });
    setAddEmployeeOpen(false);
  };

  const handleViewProfile = (employee: Employee) => {
    setSelectedEmployee(employee);
    setViewProfileOpen(true);
  };

  const handleApproveLeave = (leaveId: string) => {
    setLeaves(leaves.map(leave => 
      leave.id === leaveId ? { ...leave, status: 'approved' as const } : leave
    ));
    toast({
      title: "Leave Approved",
      description: "Leave request has been approved successfully.",
    });
  };

  const handleRejectLeave = (leaveId: string) => {
    setLeaves(leaves.map(leave => 
      leave.id === leaveId ? { ...leave, status: 'rejected' as const } : leave
    ));
    toast({
      title: "Leave Rejected",
      description: "Leave request has been rejected.",
    });
  };

  const handleProcessPayroll = () => {
    toast({
      title: "Payroll Processing",
      description: "Monthly payroll is being processed. This may take a few minutes.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Human Resources</h1>
        <p className="text-muted-foreground mt-1">Employee management and HR operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">156</div>
                <div className="text-sm text-muted-foreground">Total Employees</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">142</div>
                <div className="text-sm text-muted-foreground">Present Today</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">On Leave</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-muted-foreground">Pending Approvals</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="employees">
        <TabsList>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="leaves">Leave Requests</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Employee Directory</CardTitle>
                  <CardDescription>Complete staff roster</CardDescription>
                </div>
                <Button onClick={() => setAddEmployeeOpen(true)}>Add Employee</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {mockEmployees.map((employee) => (
                  <Card key={employee.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold">{employee.name}</h4>
                          <p className="text-sm text-muted-foreground">{employee.position}</p>
                          <p className="text-xs text-muted-foreground mt-1">{employee.department}</p>
                        </div>
                        <div className="hidden md:block text-right">
                          <p className="text-sm font-medium">{employee.email}</p>
                          <p className="text-sm text-muted-foreground">{employee.phone}</p>
                        </div>
                        <Badge variant={employee.status === 'active' ? 'default' : 'outline'}>
                          {employee.status}
                        </Badge>
                        <Button variant="outline" size="sm" onClick={() => handleViewProfile(employee)}>View Profile</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Tracker</CardTitle>
              <CardDescription>Daily attendance records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Check In</TableHead>
                      <TableHead>Check Out</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Admin User</TableCell>
                      <TableCell>Jan 22, 2024</TableCell>
                      <TableCell>08:30 AM</TableCell>
                      <TableCell>05:00 PM</TableCell>
                      <TableCell>8.5h</TableCell>
                      <TableCell>
                        <Badge className="bg-success">Present</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Finance Officer</TableCell>
                      <TableCell>Jan 22, 2024</TableCell>
                      <TableCell>09:15 AM</TableCell>
                      <TableCell>05:30 PM</TableCell>
                      <TableCell>8.25h</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-warning">Late</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaves" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Leave Requests</CardTitle>
              <CardDescription>Pending and approved leave applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaves.map((leave) => (
                      <TableRow key={leave.id}>
                        <TableCell>{leave.employeeName}</TableCell>
                        <TableCell className="capitalize">{leave.type}</TableCell>
                        <TableCell>{new Date(leave.startDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(leave.endDate).toLocaleDateString()}</TableCell>
                        <TableCell>{leave.days} days</TableCell>
                        <TableCell>
                          {leave.status === 'approved' ? (
                            <Badge className="bg-success">Approved</Badge>
                          ) : leave.status === 'rejected' ? (
                            <Badge variant="destructive">Rejected</Badge>
                          ) : (
                            <Badge variant="outline">Pending</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {leave.status === 'pending' && (
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8"
                                onClick={() => handleApproveLeave(leave.id)}
                              >
                                Approve
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8"
                                onClick={() => handleRejectLeave(leave.id)}
                              >
                                Reject
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Overview</CardTitle>
              <CardDescription>Monthly salary processing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Payroll Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Monthly payroll will be processed on the 25th
                </p>
                <Button className="mt-6" onClick={handleProcessPayroll}>Process Payroll</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={addEmployeeOpen} onOpenChange={setAddEmployeeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogDescription>Add a new employee to the system</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="emp-name">Full Name</Label>
              <Input 
                id="emp-name"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="emp-email">Email</Label>
              <Input 
                id="emp-email"
                type="email"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                placeholder="john.doe@example.com"
              />
            </div>
            <div>
              <Label htmlFor="emp-position">Position</Label>
              <Input 
                id="emp-position"
                value={newEmployee.position}
                onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <Label htmlFor="emp-department">Department</Label>
              <Input 
                id="emp-department"
                value={newEmployee.department}
                onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                placeholder="Engineering"
              />
            </div>
            <div>
              <Label htmlFor="emp-phone">Phone</Label>
              <Input 
                id="emp-phone"
                value={newEmployee.phone}
                onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                placeholder="+1 234-567-8900"
              />
            </div>
            <Button onClick={handleAddEmployee} className="w-full">Add Employee</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={viewProfileOpen} onOpenChange={setViewProfileOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Employee Profile</DialogTitle>
            <DialogDescription>Complete information for {selectedEmployee?.name}</DialogDescription>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">
                    {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{selectedEmployee.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedEmployee.position}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Employee ID</p>
                <p className="text-sm text-muted-foreground">{selectedEmployee.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Department</p>
                <p className="text-sm text-muted-foreground">{selectedEmployee.department}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{selectedEmployee.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">{selectedEmployee.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Join Date</p>
                <p className="text-sm text-muted-foreground">{new Date(selectedEmployee.joinDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge variant={selectedEmployee.status === 'active' ? 'default' : 'outline'}>
                  {selectedEmployee.status}
                </Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
