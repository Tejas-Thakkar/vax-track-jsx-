
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useAuth } from '../context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const BookAppointmentPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get center ID from URL query parameter if available
  const searchParams = new URLSearchParams(location.search);
  const centerIdFromUrl = searchParams.get('center');
  
  // State for form fields
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [vaccineType, setVaccineType] = useState('');
  const [doseNumber, setDoseNumber] = useState('1');
  const [centerId, setCenterId] = useState(centerIdFromUrl || '');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data
  const vaccineTypes = [
    { id: 'covid19', name: 'COVID-19 Vaccine' },
    { id: 'influenza', name: 'Influenza Vaccine' },
    { id: 'hepatitisb', name: 'Hepatitis B Vaccine' },
    { id: 'mmr', name: 'MMR (Measles, Mumps, Rubella) Vaccine' },
    { id: 'polio', name: 'Polio Vaccine' },
  ];
  
  const vaccinationCenters = [
    {
      id: '1',
      name: 'City General Hospital',
      address: '123 Health Street, Central District',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      distance: 2.5,
      availableVaccines: ['covid19', 'influenza', 'hepatitisb'],
    },
    {
      id: '2',
      name: 'Public Health Center',
      address: '456 Medical Avenue, North District',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400002',
      distance: 4.7,
      availableVaccines: ['covid19', 'polio'],
    },
    {
      id: '3',
      name: 'Community Wellness Clinic',
      address: '789 Wellness Road, East District',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400003',
      distance: 5.2,
      availableVaccines: ['covid19', 'influenza', 'mmr'],
    },
    {
      id: '4',
      name: 'Medical College & Hospital',
      address: '101 Education Lane, South District',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400004',
      distance: 3.8,
      availableVaccines: ['covid19', 'influenza', 'hepatitisb', 'polio', 'mmr'],
    },
    {
      id: '5',
      name: 'Urban Primary Health Center',
      address: '202 Urban Road, West District',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400005',
      distance: 6.1,
      availableVaccines: ['covid19', 'polio', 'mmr'],
    }
  ];
  
  // Generate dates for the next 14 days
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });
  
  // Mock time slots
  const timeSlots = [
    '09:00 AM - 09:30 AM',
    '09:30 AM - 10:00 AM',
    '10:00 AM - 10:30 AM',
    '10:30 AM - 11:00 AM',
    '11:00 AM - 11:30 AM',
    '11:30 AM - 12:00 PM',
    '12:00 PM - 12:30 PM',
    '12:30 PM - 01:00 PM',
    '02:00 PM - 02:30 PM',
    '02:30 PM - 03:00 PM',
    '03:00 PM - 03:30 PM',
    '03:30 PM - 04:00 PM',
    '04:00 PM - 04:30 PM',
    '04:30 PM - 05:00 PM'
  ];
  
  // Filter centers based on selected vaccine type and search query
  const filteredCenters = vaccinationCenters.filter(center => {
    const matchesVaccine = !vaccineType || center.availableVaccines.includes(vaccineType);
    const matchesSearch = !searchQuery || 
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.pincode.includes(searchQuery);
    
    return matchesVaccine && matchesSearch;
  }).sort((a, b) => a.distance - b.distance);
  
  // Get selected center details
  const selectedCenter = vaccinationCenters.find(center => center.id === centerId);
  
  // Get selected vaccine name
  const selectedVaccineName = vaccineTypes.find(v => v.id === vaccineType)?.name || '';
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // If center is pre-selected from URL, move to step 2
    if (centerIdFromUrl) {
      setStep(2);
    }
    
    return () => clearTimeout(timer);
  }, [centerIdFromUrl]);
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const handleNext = () => {
    if (step === 1) {
      if (!vaccineType) {
        toast({
          title: "Selection Required",
          description: "Please select a vaccine type",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
    }
    else if (step === 2) {
      if (!centerId) {
        toast({
          title: "Selection Required",
          description: "Please select a vaccination center",
          variant: "destructive",
        });
        return;
      }
      setStep(3);
    }
    else if (step === 3) {
      if (!selectedDate || !selectedTimeSlot) {
        toast({
          title: "Selection Required",
          description: "Please select both date and time slot",
          variant: "destructive",
        });
        return;
      }
      setStep(4);
    }
  };
  
  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleBookAppointment = () => {
    // In a real app, this would send the data to the backend
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Appointment Booked",
        description: "Your vaccination appointment has been successfully scheduled.",
        variant: "default",
      });
      
      navigate('/dashboard');
    }, 1500);
  };
  
  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-4">Select Vaccine Type</h2>
              <RadioGroup value={vaccineType} onValueChange={setVaccineType} className="space-y-3">
                {vaccineTypes.map((vaccine) => (
                  <div key={vaccine.id} className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50">
                    <RadioGroupItem value={vaccine.id} id={vaccine.id} />
                    <Label htmlFor={vaccine.id} className="flex-grow cursor-pointer">{vaccine.name}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            {vaccineType && (
              <div className="space-y-3">
                <h3 className="text-md font-medium">Select Dose</h3>
                <RadioGroup value={doseNumber} onValueChange={setDoseNumber} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="dose1" />
                    <Label htmlFor="dose1">Dose 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="dose2" />
                    <Label htmlFor="dose2">Dose 2</Label>
                  </div>
                  {(vaccineType === 'covid19' || vaccineType === 'influenza') && (
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="booster" id="booster" />
                      <Label htmlFor="booster">Booster</Label>
                    </div>
                  )}
                </RadioGroup>
              </div>
            )}
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-4">Select Vaccination Center</h2>
              <div className="mb-4">
                <Input
                  placeholder="Search by center name, address or pincode"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-vaxtrack-500 border-r-transparent"></div>
                  <p className="mt-2 text-muted-foreground">Loading centers...</p>
                </div>
              ) : filteredCenters.length > 0 ? (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {filteredCenters.map((center) => (
                    <div 
                      key={center.id}
                      className={`border rounded-md p-4 cursor-pointer transition-all ${
                        centerId === center.id 
                          ? 'border-vaxtrack-500 bg-vaxtrack-50' 
                          : 'hover:border-gray-400'
                      }`}
                      onClick={() => setCenterId(center.id)}
                    >
                      <div className="flex justify-between">
                        <h3 className="font-medium">{center.name}</h3>
                        <span className="text-sm text-muted-foreground">{center.distance} km away</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{center.address}</p>
                      <p className="text-sm text-muted-foreground">{center.city}, {center.state} - {center.pincode}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No centers found that offer this vaccine type.</p>
                  <Button 
                    variant="link" 
                    onClick={() => { setSearchQuery(''); }}
                    className="text-vaxtrack-500"
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-4">Select Date & Time Slot</h2>
              
              <div className="mb-6">
                <Label htmlFor="date" className="block mb-2">Select Date</Label>
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a date" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDates.map((date) => (
                      <SelectItem key={date} value={date}>
                        {new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedDate && (
                <div>
                  <Label className="block mb-2">Select Time Slot</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {timeSlots.map((slot, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`p-2 text-center text-sm rounded-md border ${
                          selectedTimeSlot === slot 
                            ? 'bg-vaxtrack-500 text-white border-vaxtrack-500' 
                            : 'hover:border-vaxtrack-500 hover:text-vaxtrack-500'
                        }`}
                        onClick={() => setSelectedTimeSlot(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-medium mb-4">Confirm Appointment Details</h2>
            
            <div className="space-y-4">
              <div className="border rounded-md p-4 bg-gray-50">
                <h3 className="font-medium text-sm text-muted-foreground mb-2">Vaccine</h3>
                <p>{selectedVaccineName} - Dose {doseNumber}</p>
              </div>
              
              <div className="border rounded-md p-4 bg-gray-50">
                <h3 className="font-medium text-sm text-muted-foreground mb-2">Center</h3>
                <p className="font-medium">{selectedCenter?.name}</p>
                <p className="text-sm mt-1">{selectedCenter?.address}</p>
                <p className="text-sm">{selectedCenter?.city}, {selectedCenter?.state} - {selectedCenter?.pincode}</p>
              </div>
              
              <div className="border rounded-md p-4 bg-gray-50">
                <h3 className="font-medium text-sm text-muted-foreground mb-2">Date & Time</h3>
                <p>
                  {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="mt-1">{selectedTimeSlot}</p>
              </div>
              
              <div className="border rounded-md p-4 bg-gray-50">
                <h3 className="font-medium text-sm text-muted-foreground mb-2">Patient Details</h3>
                <p><span className="font-medium">Name:</span> {user?.name}</p>
                <p className="mt-1"><span className="font-medium">Age:</span> {user?.age}</p>
                <p className="mt-1"><span className="font-medium">Gender:</span> {user?.gender}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                By booking this appointment, you agree to the terms and conditions of the vaccination program.
              </p>
              
              <label className="flex items-center space-x-2 cursor-pointer mb-4">
                <input type="checkbox" className="rounded border-gray-300 text-vaxtrack-500 focus:ring-vaxtrack-500" />
                <span className="text-sm">I confirm that all the information provided is accurate</span>
              </label>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Book a Vaccination Appointment</h1>
          <p className="text-muted-foreground mt-1">Follow the steps to schedule your vaccination</p>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div 
                key={stepNumber}
                className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= stepNumber ? 'bg-vaxtrack-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {stepNumber}
              </div>
            ))}
            
            <div className="absolute top-5 h-0.5 w-full bg-gray-200 -z-10"></div>
            <div 
              className="absolute top-5 h-0.5 bg-vaxtrack-500 -z-5 transition-all" 
              style={{ width: `${(step - 1) * 33.33}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between mt-2">
            <span className="text-xs text-muted-foreground">Vaccine</span>
            <span className="text-xs text-muted-foreground">Center</span>
            <span className="text-xs text-muted-foreground">Time Slot</span>
            <span className="text-xs text-muted-foreground">Confirm</span>
          </div>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            {renderStepContent()}
          </CardContent>
          <CardFooter className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={step === 1 || isLoading}
            >
              Previous
            </Button>
            
            {step < 4 ? (
              <Button
                className="bg-vaxtrack-500 hover:bg-vaxtrack-600"
                onClick={handleNext}
                disabled={isLoading}
              >
                Next
              </Button>
            ) : (
              <Button
                className="bg-vaxtrack-500 hover:bg-vaxtrack-600"
                onClick={handleBookAppointment}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent mr-2"></div>
                    Booking...
                  </>
                ) : (
                  'Book Appointment'
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BookAppointmentPage;
