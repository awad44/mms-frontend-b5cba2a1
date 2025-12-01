import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { DollarSign, TrendingUp, Clock, AlertCircle, Download } from 'lucide-react';
import { mockPayments } from '@/lib/mockData';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import type { Payment } from '@/types';

const revenueData = [
  { name: 'Property Tax', value: 450000, color: '#0088FE' },
  { name: 'Water Bills', value: 180000, color: '#00C49F' },
  { name: 'Electricity', value: 100000, color: '#FFBB28' },
  { name: 'Permits', value: 95000, color: '#FF8042' },
  { name: 'Waste', value: 65000, color: '#8884d8' },
];

const monthlyRevenue = [
  { month: 'Jan', collected: 75000, target: 80000 },
  { month: 'Feb', collected: 82000, target: 80000 },
  { month: 'Mar', collected: 78000, target: 80000 },
  { month: 'Apr', collected: 85000, target: 80000 },
  { month: 'May', collected: 79000, target: 80000 },
  { month: 'Jun', collected: 91000, target: 80000 },
];

export default function Finance() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const handleExportReport = () => {
    toast({
      title: "Export Started",
      description: "Downloading financial report as CSV...",
    });
  };

  const handleViewReceipt = (payment: Payment) => {
    setSelectedPayment(payment);
    setReceiptDialogOpen(true);
  };

  const getFilteredPayments = () => {
    if (activeTab === 'all') return mockPayments;
    return mockPayments.filter(p => p.status === activeTab);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="px-4 sm:px-0">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Finance & Billing</h1>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-1">Revenue management and payment tracking</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 px-4 sm:px-0">
        <Card>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold">$890K</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Total Revenue</div>
              </div>
              <div className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full bg-success/10 flex items-center justify-center">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-success" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-1 sm:mt-2 text-[10px] sm:text-xs text-success">
              <TrendingUp className="h-2 w-2 sm:h-3 sm:w-3" />
              <span>+12.4%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold">$745K</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Collected</div>
              </div>
              <div className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
              </div>
            </div>
            <div className="text-[10px] sm:text-xs text-primary mt-1 sm:mt-2">83.7% rate</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold">$120K</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Pending</div>
              </div>
              <div className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full bg-warning/10 flex items-center justify-center">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-warning" />
              </div>
            </div>
            <div className="text-[10px] sm:text-xs text-muted-foreground mt-1 sm:mt-2">Due in 30d</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold">$25K</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Overdue</div>
              </div>
              <div className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-destructive" />
              </div>
            </div>
            <div className="text-[10px] sm:text-xs text-muted-foreground mt-1 sm:mt-2">18 accounts</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-0">
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg md:text-xl">Revenue Distribution</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Income by category</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg md:text-xl">Monthly Collection</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Collected vs Target</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" style={{ fontSize: '10px' }} />
                <YAxis style={{ fontSize: '10px' }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="collected" fill="hsl(var(--success))" name="Collected" />
                <Bar dataKey="target" fill="hsl(var(--primary))" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mx-4 sm:mx-0">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col gap-3">
            <div>
              <CardTitle className="text-base sm:text-lg md:text-xl">Payment Transactions</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Recent payment activity</CardDescription>
            </div>
            <Button onClick={handleExportReport} className="w-full sm:w-auto text-xs sm:text-sm">
              <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-3 sm:mb-4 h-8 sm:h-10">
              <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
              <TabsTrigger value="paid" className="text-xs sm:text-sm">Paid</TabsTrigger>
              <TabsTrigger value="pending" className="text-xs sm:text-sm">Pending</TabsTrigger>
              <TabsTrigger value="overdue" className="text-xs sm:text-sm">Overdue</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab}>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="whitespace-nowrap">Payment ID</TableHead>
                      <TableHead className="whitespace-nowrap">Citizen</TableHead>
                      <TableHead className="whitespace-nowrap">Type</TableHead>
                      <TableHead className="whitespace-nowrap">Amount</TableHead>
                      <TableHead className="whitespace-nowrap">Date</TableHead>
                      <TableHead className="whitespace-nowrap">Status</TableHead>
                      <TableHead className="whitespace-nowrap">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredPayments().length > 0 ? (
                      getFilteredPayments().map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium text-sm">{payment.id}</TableCell>
                          <TableCell className="text-sm">{payment.citizenName}</TableCell>
                          <TableCell className="capitalize text-sm whitespace-nowrap">{payment.payment_type.replace('_', ' ')}</TableCell>
                          <TableCell className="text-sm">${payment.amount.toLocaleString()}</TableCell>
                          <TableCell className="text-sm whitespace-nowrap">{new Date(payment.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            {payment.status === 'paid' && <Badge className="bg-success text-xs">Paid</Badge>}
                            {payment.status === 'pending' && <Badge variant="outline" className="text-xs">Pending</Badge>}
                            {payment.status === 'overdue' && <Badge variant="destructive" className="text-xs">Overdue</Badge>}
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" onClick={() => handleViewReceipt(payment)} className="text-xs h-8">
                              View Receipt
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground text-sm">
                          No {activeTab === 'all' ? '' : activeTab} payments found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={receiptDialogOpen} onOpenChange={setReceiptDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Payment Receipt</DialogTitle>
            <DialogDescription>Receipt for {selectedPayment?.id}</DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="text-sm font-medium">Payment ID</p>
                <p className="text-sm text-muted-foreground">{selectedPayment.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Citizen</p>
                <p className="text-sm text-muted-foreground">{selectedPayment.citizenName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Type</p>
                <p className="text-sm text-muted-foreground capitalize">{selectedPayment.payment_type.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Amount</p>
                <p className="text-lg font-bold">${selectedPayment.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Date</p>
                <p className="text-sm text-muted-foreground">{new Date(selectedPayment.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge className={
                  selectedPayment.status === 'paid' ? 'bg-success' :
                  selectedPayment.status === 'pending' ? 'bg-accent' : 'bg-destructive'
                }>
                  {selectedPayment.status}
                </Badge>
              </div>
              <Button className="w-full" onClick={() => {
                toast({
                  title: "Receipt Downloaded",
                  description: `Receipt for ${selectedPayment.id} has been downloaded.`,
                });
              }}>
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
