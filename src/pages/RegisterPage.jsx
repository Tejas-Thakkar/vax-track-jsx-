
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: 'Male',
    idType: 'Aadhaar',
    idNumber: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const setSelectValue = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.age.trim()) newErrors.age = 'Age is required';
    else if (isNaN(formData.age) || parseInt(formData.age) < 1 || parseInt(formData.age) > 120) {
      newErrors.age = 'Please enter a valid age (1-120)';
    }
    
    if (!formData.idNumber.trim()) newErrors.idNumber = 'ID number is required';
    else if (formData.idType === 'Aadhaar' && formData.idNumber.length !== 12) {
      newErrors.idNumber = 'Aadhaar number must be 12 digits';
    } else if (formData.idType === 'PAN' && formData.idNumber.length !== 10) {
      newErrors.idNumber = 'PAN number must be 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const result = await register(formData);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setErrors({ submit: result.error || 'Failed to register' });
      }
    } catch (err) {
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mb-12">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Register for Vaccination</CardTitle>
          <CardDescription className="text-center">
            Create an account to book and manage your vaccination appointments
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {errors.submit && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {errors.submit}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              
              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              
              {/* Age */}
              <div className="space-y-2">
                <Label htmlFor="age">Age <span className="text-red-500">*</span></Label>
                <Input
                  id="age"
                  name="age"
                  type="text"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  className={errors.age ? "border-red-500" : ""}
                />
                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
              </div>
              
              {/* Gender */}
              <div className="space-y-2">
                <Label>Gender <span className="text-red-500">*</span></Label>
                <RadioGroup
                  name="gender"
                  value={formData.gender}
                  onValueChange={(value) => setSelectValue('gender', value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Male" id="gender-male" />
                    <Label htmlFor="gender-male" className="cursor-pointer">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Female" id="gender-female" />
                    <Label htmlFor="gender-female" className="cursor-pointer">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Other" id="gender-other" />
                    <Label htmlFor="gender-other" className="cursor-pointer">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {/* ID Type */}
              <div className="space-y-2">
                <Label htmlFor="idType">ID Proof Type <span className="text-red-500">*</span></Label>
                <Select 
                  name="idType"
                  value={formData.idType}
                  onValueChange={(value) => setSelectValue('idType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aadhaar">Aadhaar Card</SelectItem>
                    <SelectItem value="PAN">PAN Card</SelectItem>
                    <SelectItem value="Driving">Driving License</SelectItem>
                    <SelectItem value="Voter">Voter ID</SelectItem>
                    <SelectItem value="Passport">Passport</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* ID Number */}
              <div className="space-y-2">
                <Label htmlFor="idNumber">ID Number <span className="text-red-500">*</span></Label>
                <Input
                  id="idNumber"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  placeholder={`Enter your ${formData.idType} number`}
                  className={errors.idNumber ? "border-red-500" : ""}
                />
                {errors.idNumber && <p className="text-red-500 text-xs mt-1">{errors.idNumber}</p>}
              </div>
              
              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              
              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
            
            <div className="text-sm text-gray-500 mt-4">
              <p>By registering, you agree to the VaxTrack <Link to="/terms-of-service" className="text-vaxtrack-500 hover:underline">Terms of Service</Link> and <Link to="/privacy-policy" className="text-vaxtrack-500 hover:underline">Privacy Policy</Link>.</p>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-vaxtrack-500 hover:bg-vaxtrack-600" 
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-vaxtrack-500 hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;
