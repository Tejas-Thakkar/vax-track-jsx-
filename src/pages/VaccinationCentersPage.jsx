
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

const VaccinationCentersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('list');
  
  // Mock data for vaccination centers
  const vaccinationCenters = [
    {
      id: '1',
      name: 'City General Hospital',
      address: '123 Health Street, Central District',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      type: 'hospital',
      vaccines: ['COVID-19', 'Influenza', 'Hepatitis B'],
      timing: '9:00 AM - 5:00 PM',
      slots: 45,
      distance: 2.5,
      location: { lat: 19.075983, lng: 72.877655 }
    },
    {
      id: '2',
      name: 'Public Health Center',
      address: '456 Medical Avenue, North District',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400002',
      type: 'healthcare',
      vaccines: ['COVID-19', 'Polio'],
      timing: '10:00 AM - 6:00 PM',
      slots: 30,
      distance: 4.7,
      location: { lat: 19.085983, lng: 72.857655 }
    },
    {
      id: '3',
      name: 'Community Wellness Clinic',
      address: '789 Wellness Road, East District',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400003',
      type: 'clinic',
      vaccines: ['COVID-19', 'Influenza', 'MMR'],
      timing: '8:30 AM - 7:00 PM',
      slots: 20,
      distance: 5.2,
      location: { lat: 19.065983, lng: 72.897655 }
    },
    {
      id: '4',
      name: 'Medical College & Hospital',
      address: '101 Education Lane, South District',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400004',
      type: 'hospital',
      vaccines: ['COVID-19', 'Influenza', 'Hepatitis B', 'Polio', 'MMR'],
      timing: '9:00 AM - 6:00 PM',
      slots: 60,
      distance: 3.8,
      location: { lat: 19.055983, lng: 72.867655 }
    },
    {
      id: '5',
      name: 'Urban Primary Health Center',
      address: '202 Urban Road, West District',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400005',
      type: 'healthcare',
      vaccines: ['COVID-19', 'Polio', 'MMR'],
      timing: '10:00 AM - 5:00 PM',
      slots: 25,
      distance: 6.1,
      location: { lat: 19.095983, lng: 72.847655 }
    }
  ];
  
  // Filter centers based on search query and filter type
  const filteredCenters = vaccinationCenters.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          center.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          center.pincode.includes(searchQuery);
    
    const matchesFilter = filterType === 'all' || center.type === filterType;
    
    return matchesSearch && matchesFilter;
  });
  
  // Sort centers by distance
  const sortedCenters = [...filteredCenters].sort((a, b) => a.distance - b.distance);
  
  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Vaccination Centers</h1>
        <p className="text-muted-foreground">Find and view vaccination centers near you</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2">
          <Input
            placeholder="Search by center name, address or pincode"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Centers</SelectItem>
              <SelectItem value="hospital">Hospitals</SelectItem>
              <SelectItem value="clinic">Clinics</SelectItem>
              <SelectItem value="healthcare">Healthcare Centers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mb-6 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing {sortedCenters.length} centers
        </p>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-vaxtrack-500 hover:bg-vaxtrack-600' : ''}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="ml-2">List</span>
          </Button>
          <Button
            variant={viewMode === 'map' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('map')}
            className={viewMode === 'map' ? 'bg-vaxtrack-500 hover:bg-vaxtrack-600' : ''}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 20L3 17V4L9 7M9 20L15 17M9 20V7M15 17L21 20V7L15 4M15 17V4M9 7L15 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="ml-2">Map</span>
          </Button>
        </div>
      </div>
      
      <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
        <TabsContent value="list" className="space-y-4">
          {sortedCenters.length > 0 ? (
            sortedCenters.map((center) => (
              <Card key={center.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="p-4 md:p-6 md:col-span-2 border-b md:border-b-0 md:border-r">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{center.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {center.address}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {center.city}, {center.state} - {center.pincode}
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {center.distance} km away
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {center.vaccines.map((vaccine, index) => (
                          <span key={index} className="inline-flex text-xs bg-vaxtrack-100 text-vaxtrack-800 px-2 py-1 rounded">
                            {vaccine}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-4 space-y-1 text-sm">
                        <div className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>Open: {center.timing}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>Type: {center.type === 'hospital' ? 'Hospital' : center.type === 'clinic' ? 'Clinic' : 'Healthcare Center'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 md:p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Available Slots</span>
                          <span className="font-semibold text-vaxtrack-500">{center.slots}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-vaxtrack-500 h-2.5 rounded-full" 
                            style={{ width: `${Math.min(100, (center.slots / 60) * 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Updated 10 minutes ago
                        </p>
                      </div>
                      
                      <div className="mt-4 flex flex-col space-y-2">
                        <Button asChild className="bg-vaxtrack-500 hover:bg-vaxtrack-600">
                          <Link to={`/book-appointment?center=${center.id}`}>
                            Book Appointment
                          </Link>
                        </Button>
                        <Button asChild variant="outline">
                          <Link to={`/center-details/${center.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-1">No centers found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                onClick={() => { setSearchQuery(''); setFilterType('all'); }}
                className="bg-vaxtrack-500 hover:bg-vaxtrack-600"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="map">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 h-[500px] flex items-center justify-center">
              <div className="text-center p-6">
                <svg className="w-12 h-12 mx-auto text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 20L3 17V4L9 7M9 20L15 17M9 20V7M15 17L21 20V7L15 4M15 17V4M9 7L15 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 className="mt-2 text-lg font-medium">Map View</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Map integration would be shown here with center locations.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VaccinationCentersPage;
