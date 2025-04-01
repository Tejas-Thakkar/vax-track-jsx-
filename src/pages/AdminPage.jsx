
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '../context/AuthContext';

const AdminPage = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for admin dashboard
  const centers = [
    { id: '1', name: 'City General Hospital', status: 'active', appointments: 125, vaccines: 450 },
    { id: '2', name: 'Public Health Center', status: 'active', appointments: 87, vaccines: 320 },
    { id: '3', name: 'Community Wellness Clinic', status: 'active', appointments: 54, vaccines: 210 },
    { id: '4', name: 'Medical College & Hospital', status: 'active', appointments: 98, vaccines: 380 },
    { id: '5', name: 'Urban Primary Health Center', status: 'inactive', appointments: 0, vaccines: 150 },
  ];
  
  const vaccineInventory = [
    { id: 'covid19', name: 'COVID-19 Vaccine', total: 850, allocated: 620, available: 230 },
    { id: 'influenza', name: 'Influenza Vaccine', total: 420, allocated: 280, available: 140 },
    { id: 'hepatitisb', name: 'Hepatitis B Vaccine', total: 320, allocated: 180, available: 140 },
    { id: 'mmr', name: 'MMR Vaccine', total: 250, allocated: 120, available: 130 },
    { id: 'polio', name: 'Polio Vaccine', total: 380, allocated: 210, available: 170 },
  ];
  
  // Mock statistics
  const statsData = {
    totalRegistrations: 15287,
    totalAppointments: 12453,
    totalVaccinations: 10890,
    centerCount: 5,
  };
  
  // Mock some recent appointments
  const recentAppointments = [
    { id: 'a1', patientName: 'John Doe', center: 'City General Hospital', vaccine: 'COVID-19', time: '10:30 AM', date: '2023-12-05', status: 'Confirmed' },
    { id: 'a2', patientName: 'Jane Smith', center: 'Public Health Center', vaccine: 'Influenza', time: '11:45 AM', date: '2023-12-05', status: 'Confirmed' },
    { id: 'a3', patientName: 'Robert Johnson', center: 'Medical College & Hospital', vaccine: 'Hepatitis B', time: '01:15 PM', date: '2023-12-05', status: 'Pending' },
    { id: 'a4', patientName: 'Emily Wilson', center: 'Community Wellness Clinic', vaccine: 'MMR', time: '02:30 PM', date: '2023-12-05', status: 'Cancelled' },
    { id: 'a5', patientName: 'Michael Brown', center: 'City General Hospital', vaccine: 'COVID-19', time: '04:00 PM', date: '2023-12-05', status: 'Confirmed' },
  ];
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  // If not authenticated or not admin, redirect
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (isAuthenticated && !isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  // Mock functions for demonstration
  const handleStatusChange = (centerId, newStatus) => {
    toast({
      title: "Center Updated",
      description: `Center status changed to ${newStatus}`,
      variant: "default",
    });
  };
  
  const handleVaccineAllocation = (vaccineId, centerId, quantity) => {
    toast({
      title: "Vaccine Allocated",
      description: `${quantity} doses allocated to center`,
      variant: "default",
    });
  };
  
  const handleAppointmentStatusChange = (appointmentId, newStatus) => {
    toast({
      title: "Appointment Updated",
      description: `Appointment status changed to ${newStatus}`,
      variant: "default",
    });
  };
  
  const renderDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Registrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalRegistrations.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalAppointments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">+8% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Vaccinations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalVaccinations.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">+5% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Centers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.centerCount}</div>
            <p className="text-xs text-muted-foreground mt-1">No change from last week</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left font-medium p-2 border-b">Patient</th>
                    <th className="text-left font-medium p-2 border-b">Vaccine</th>
                    <th className="text-left font-medium p-2 border-b">Time</th>
                    <th className="text-left font-medium p-2 border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="p-2 border-b">{appointment.patientName}</td>
                      <td className="p-2 border-b">{appointment.vaccine}</td>
                      <td className="p-2 border-b">{appointment.time}</td>
                      <td className="p-2 border-b">
                        <span className={`inline-block px-2 py-1 rounded text-xs ${
                          appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button variant="outline" className="mt-4 w-full">View All Appointments</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Vaccine Inventory Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vaccineInventory.map((vaccine) => (
                <div key={vaccine.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{vaccine.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {vaccine.available} / {vaccine.total} available
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-vaxtrack-500 h-2 rounded-full"
                      style={{ width: `${(vaccine.available / vaccine.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full">Manage Inventory</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  
  const renderCenters = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Vaccination Centers</h2>
        <Button className="bg-vaxtrack-500 hover:bg-vaxtrack-600">Add New Center</Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left font-medium p-3 border-b">Center Name</th>
              <th className="text-left font-medium p-3 border-b">Status</th>
              <th className="text-left font-medium p-3 border-b">Appointments</th>
              <th className="text-left font-medium p-3 border-b">Vaccines</th>
              <th className="text-left font-medium p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {centers.map((center) => (
              <tr key={center.id}>
                <td className="p-3 border-b">{center.name}</td>
                <td className="p-3 border-b">
                  <span className={`inline-block px-2 py-1 rounded text-xs ${
                    center.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {center.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-3 border-b">{center.appointments}</td>
                <td className="p-3 border-b">{center.vaccines}</td>
                <td className="p-3 border-b">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Select 
                      defaultValue={center.status} 
                      onValueChange={(value) => handleStatusChange(center.id, value)}
                    >
                      <SelectTrigger className="w-[100px] h-8 text-xs">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Activate</SelectItem>
                        <SelectItem value="inactive">Deactivate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  const renderInventory = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Vaccine Inventory</h2>
        <Button className="bg-vaxtrack-500 hover:bg-vaxtrack-600">Add Stock</Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left font-medium p-3 border-b">Vaccine Name</th>
              <th className="text-left font-medium p-3 border-b">Total Stock</th>
              <th className="text-left font-medium p-3 border-b">Allocated</th>
              <th className="text-left font-medium p-3 border-b">Available</th>
              <th className="text-left font-medium p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vaccineInventory.map((vaccine) => (
              <tr key={vaccine.id}>
                <td className="p-3 border-b">{vaccine.name}</td>
                <td className="p-3 border-b">{vaccine.total}</td>
                <td className="p-3 border-b">{vaccine.allocated}</td>
                <td className="p-3 border-b">
                  <span className={`${
                    vaccine.available < 100 ? 'text-red-600' : 'text-green-600'
                  } font-medium`}>
                    {vaccine.available}
                  </span>
                </td>
                <td className="p-3 border-b">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Edit Stock</Button>
                    <Button variant="outline" size="sm">Allocate</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  const renderAppointments = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Appointment Management</h2>
        <div className="flex space-x-4">
          <Input placeholder="Search by name or ID" className="w-64" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left font-medium p-3 border-b">ID</th>
              <th className="text-left font-medium p-3 border-b">Patient</th>
              <th className="text-left font-medium p-3 border-b">Center</th>
              <th className="text-left font-medium p-3 border-b">Vaccine</th>
              <th className="text-left font-medium p-3 border-b">Date & Time</th>
              <th className="text-left font-medium p-3 border-b">Status</th>
              <th className="text-left font-medium p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="p-3 border-b">{appointment.id}</td>
                <td className="p-3 border-b">{appointment.patientName}</td>
                <td className="p-3 border-b">{appointment.center}</td>
                <td className="p-3 border-b">{appointment.vaccine}</td>
                <td className="p-3 border-b">
                  {new Date(appointment.date).toLocaleDateString()} {appointment.time}
                </td>
                <td className="p-3 border-b">
                  <span className={`inline-block px-2 py-1 rounded text-xs ${
                    appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                    appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="p-3 border-b">
                  <Select 
                    defaultValue={appointment.status.toLowerCase()}
                    onValueChange={(value) => handleAppointmentStatusChange(appointment.id, value)}
                  >
                    <SelectTrigger className="w-[120px] h-8 text-xs">
                      <SelectValue placeholder="Change Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confirmed">Confirm</SelectItem>
                      <SelectItem value="completed">Complete</SelectItem>
                      <SelectItem value="cancelled">Cancel</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-muted-foreground">Showing 5 of 243 appointments</p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
  
  const renderReports = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Reports</h2>
        <Button className="bg-vaxtrack-500 hover:bg-vaxtrack-600">Generate New Report</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Vaccination Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Coverage chart would appear here</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Daily Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Appointment chart would appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <h3 className="font-bold text-lg mb-4">Available Reports</h3>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left font-medium p-3 border-b">Report Name</th>
            <th className="text-left font-medium p-3 border-b">Date Generated</th>
            <th className="text-left font-medium p-3 border-b">Type</th>
            <th className="text-left font-medium p-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border-b">Monthly Vaccination Summary - November 2023</td>
            <td className="p-3 border-b">Dec 1, 2023</td>
            <td className="p-3 border-b">Monthly</td>
            <td className="p-3 border-b">
              <Button variant="outline" size="sm">Download</Button>
            </td>
          </tr>
          <tr>
            <td className="p-3 border-b">Center Performance Report - Q4 2023</td>
            <td className="p-3 border-b">Nov 28, 2023</td>
            <td className="p-3 border-b">Quarterly</td>
            <td className="p-3 border-b">
              <Button variant="outline" size="sm">Download</Button>
            </td>
          </tr>
          <tr>
            <td className="p-3 border-b">Vaccine Inventory Status</td>
            <td className="p-3 border-b">Nov 25, 2023</td>
            <td className="p-3 border-b">Inventory</td>
            <td className="p-3 border-b">
              <Button variant="outline" size="sm">Download</Button>
            </td>
          </tr>
          <tr>
            <td className="p-3 border-b">User Registration Analysis</td>
            <td className="p-3 border-b">Nov 20, 2023</td>
            <td className="p-3 border-b">Analytics</td>
            <td className="p-3 border-b">
              <Button variant="outline" size="sm">Download</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-16rem)]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-vaxtrack-500 border-r-transparent mb-4"></div>
          <p className="text-lg">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage vaccination centers, inventory and appointments</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8 w-full max-w-2xl">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="centers">Centers</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          {renderDashboard()}
        </TabsContent>
        
        <TabsContent value="centers">
          {renderCenters()}
        </TabsContent>
        
        <TabsContent value="inventory">
          {renderInventory()}
        </TabsContent>
        
        <TabsContent value="appointments">
          {renderAppointments()}
        </TabsContent>
        
        <TabsContent value="reports">
          {renderReports()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
