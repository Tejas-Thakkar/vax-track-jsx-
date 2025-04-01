
import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '../context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  
  // Mock appointment data for demonstration
  const mockAppointments = [
    {
      id: '1',
      centerName: 'City General Hospital',
      address: '123 Health Street, Central District',
      date: '2023-12-15',
      time: '10:30 AM',
      vaccine: 'COVID-19 - Dose 1',
      status: 'Upcoming',
    },
    {
      id: '2',
      centerName: 'Public Health Center',
      address: '456 Medical Avenue, North District',
      date: '2023-11-10',
      time: '2:15 PM',
      vaccine: 'Influenza',
      status: 'Completed',
    }
  ];
  
  useEffect(() => {
    // Simulate loading appointments from an API
    const loadAppointments = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAppointments(mockAppointments);
      } catch (error) {
        console.error("Error loading appointments:", error);
        toast({
          title: "Error",
          description: "Failed to load appointments. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      loadAppointments();
    }
  }, [isAuthenticated, toast]);
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const upcomingAppointments = appointments.filter(app => app.status === 'Upcoming');
  const pastAppointments = appointments.filter(app => app.status !== 'Upcoming');
  
  const handleCancelAppointment = (appointmentId) => {
    toast({
      title: "Appointment cancelled",
      description: "Your appointment has been cancelled successfully.",
    });
    
    // Update the appointments state to remove or update the cancelled appointment
    setAppointments(appointments.map(app => 
      app.id === appointmentId ? { ...app, status: 'Cancelled' } : app
    ));
  };
  
  const handleDownloadCertificate = (appointmentId) => {
    toast({
      title: "Certificate downloaded",
      description: "Your vaccination certificate has been downloaded successfully.",
    });
  };
  
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user?.name || 'User'}</h1>
        <p className="text-muted-foreground mt-1">Manage your vaccination appointments and certificates</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-muted-foreground">Name</dt>
                <dd>{user?.name || 'Not available'}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Email</dt>
                <dd>{user?.email || 'Not available'}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Phone</dt>
                <dd>{user?.phone || 'Not available'}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Age</dt>
                <dd>{user?.age || 'Not available'}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Gender</dt>
                <dd>{user?.gender || 'Not available'}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Vaccination Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">COVID-19</h3>
                <div className="mt-1 flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-vaxtrack-500 h-2.5 rounded-full"
                      style={{ width: pastAppointments.length > 0 ? '50%' : '0%' }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-500 ms-2">
                    {pastAppointments.length > 0 ? '1/2 doses' : '0/2 doses'}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-medium">Influenza</h3>
                <div className="mt-1 flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-vaxtrack-500 h-2.5 rounded-full"
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-500 ms-2">
                    Complete
                  </span>
                </div>
              </div>
            </div>
            <Button asChild variant="link" className="p-0 mt-4 h-auto text-vaxtrack-500">
              <Link to="/vaccination-history">View Full History</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full bg-vaxtrack-500 hover:bg-vaxtrack-600">
              <Link to="/book-appointment">Book New Appointment</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/vaccination-centers">Find Vaccination Centers</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/update-profile">Update Profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-4">
            <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
            <TabsTrigger value="past">Past Appointments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-vaxtrack-500 border-r-transparent"></div>
                <p className="mt-2 text-muted-foreground">Loading appointments...</p>
              </div>
            ) : upcomingAppointments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id} className="overflow-hidden">
                    <div className="bg-vaxtrack-500 py-2 px-4">
                      <span className="text-white font-medium text-sm">
                        {appointment.status}
                      </span>
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-semibold text-lg mb-1">{appointment.vaccine}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{appointment.centerName}</p>
                      
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex">
                          <span className="font-medium w-24">Date:</span>
                          <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex">
                          <span className="font-medium w-24">Time:</span>
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex">
                          <span className="font-medium w-24">Address:</span>
                          <span>{appointment.address}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          className="text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleCancelAppointment(appointment.id)}
                        >
                          Cancel
                        </Button>
                        <Button asChild variant="outline">
                          <Link to={`/reschedule/${appointment.id}`}>Reschedule</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">You don't have any upcoming appointments.</p>
                <Button asChild className="mt-4 bg-vaxtrack-500 hover:bg-vaxtrack-600">
                  <Link to="/book-appointment">Book an Appointment</Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-vaxtrack-500 border-r-transparent"></div>
                <p className="mt-2 text-muted-foreground">Loading appointments...</p>
              </div>
            ) : pastAppointments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pastAppointments.map((appointment) => (
                  <Card key={appointment.id} className="overflow-hidden">
                    <div className="bg-gray-500 py-2 px-4">
                      <span className="text-white font-medium text-sm">
                        {appointment.status}
                      </span>
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-semibold text-lg mb-1">{appointment.vaccine}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{appointment.centerName}</p>
                      
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex">
                          <span className="font-medium w-24">Date:</span>
                          <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex">
                          <span className="font-medium w-24">Time:</span>
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex">
                          <span className="font-medium w-24">Address:</span>
                          <span>{appointment.address}</span>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => handleDownloadCertificate(appointment.id)}
                        className="bg-vaxtrack-500 hover:bg-vaxtrack-600 w-full"
                      >
                        Download Certificate
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">You don't have any past appointments.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;
