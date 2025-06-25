import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  TestTube, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  User,
  Phone,
  Mail
} from 'lucide-react';

interface LabTest {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  preparationRequired: boolean;
  preparations?: string[];
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const BookTest: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [selectedTest, setSelectedTest] = useState<LabTest | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const labTests: LabTest[] = [
    {
      id: '1',
      name: 'Complete Blood Count (CBC)',
      description: 'Comprehensive blood analysis including RBC, WBC, and platelets count',
      price: 350,
      duration: '24 hours',
      preparationRequired: false,
    },
    {
      id: '2',
      name: 'Blood Sugar (Fasting)',
      description: 'Fasting glucose test to check for diabetes and blood sugar levels',
      price: 120,
      duration: '4 hours',
      preparationRequired: true,
      preparations: [
        'Fast for 8-12 hours before the test',
        'Only water is allowed during fasting',
        'Take medications as prescribed unless advised otherwise'
      ],
    },
    {
      id: '3',
      name: 'Lipid Profile',
      description: 'Cholesterol and triglyceride levels for heart health assessment',
      price: 450,
      duration: '24 hours',
      preparationRequired: true,
      preparations: [
        'Fast for 9-12 hours before the test',
        'Avoid alcohol 24 hours before the test',
        'Continue regular medications unless advised otherwise'
      ],
    },
    {
      id: '4',
      name: 'Thyroid Profile (TSH, T3, T4)',
      description: 'Complete thyroid function test to evaluate hormone levels',
      price: 650,
      duration: '48 hours',
      preparationRequired: false,
    },
    {
      id: '5',
      name: 'Liver Function Test (LFT)',
      description: 'Comprehensive liver enzyme panel to assess liver health',
      price: 550,
      duration: '24 hours',
      preparationRequired: true,
      preparations: [
        'Fast for 8-12 hours before the test',
        'Avoid alcohol 48 hours before the test',
        'Inform about any medications you are taking'
      ],
    },
    {
      id: '6',
      name: 'Kidney Function Test (KFT)',
      description: 'Creatinine and urea levels to evaluate kidney function',
      price: 400,
      duration: '24 hours',
      preparationRequired: false,
    },
  ];

  const locations = [
    { id: 'connaught-place', name: 'Adarsh Krutika', address: 'molacha odha, Satara, Satara' },
    { id: 'karol-bagh', name: 'Patil Clinic', address: 'forest colony, shahu Nagar, Satara' },
    { id: 'lajpat-nagar', name: 'Shinde Laboratory', address: 'wadhe , Ashok Nagar, Satara' },
  ];

  const timeSlots: TimeSlot[] = [
    { time: '8:00 AM', available: true },
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '11:00 AM', available: true },
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: true },
    { time: '4:00 PM', available: false },
    { time: '5:00 PM', available: true },
  ];

  useEffect(() => {
    if (testId) {
      const test = labTests.find(t => t.id === testId);
      setSelectedTest(test || null);
    }
  }, [testId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Save booking to localStorage (mock backend)
    const bookings = JSON.parse(localStorage.getItem('healthPortalBookings') || '[]');
    const newBooking = {
      id: Date.now().toString(),
      userId: user?.id,
      testId: selectedTest?.id,
      testName: selectedTest?.name,
      date: selectedDate,
      time: selectedTime,
      location: selectedLocation,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
    };
    bookings.push(newBooking);
    localStorage.setItem('healthPortalBookings', JSON.stringify(bookings));

    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const handleBackToCatalog = () => {
    navigate('/tests');
  };

  const handleViewDashboard = () => {
    navigate('/dashboard');
  };

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (showSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your appointment for <strong>{selectedTest?.name}</strong> has been successfully scheduled for{' '}
            <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>.
          </p>
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-6">
            <p className="text-sky-800 text-sm">
              A confirmation SMS has been sent to <strong>{user?.phone}</strong> with all the details 
              and any preparation instructions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleViewDashboard}
              className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Go to Dashboard
            </button>
            <button
              onClick={handleBackToCatalog}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Book Another Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedTest) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <TestTube className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a test to book</h3>
          <p className="text-gray-600 mb-6">Browse our test catalog to find the test you need.</p>
          <button
            onClick={handleBackToCatalog}
            className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center mx-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Browse Test Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={handleBackToCatalog}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Test Catalog
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Lab Test</h1>
        <p className="text-gray-600">Schedule your appointment for {selectedTest.name}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Test Information */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
            <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
              <TestTube className="h-6 w-6 text-sky-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedTest.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{selectedTest.description}</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold text-gray-900">₹{selectedTest.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Results in:</span>
                <span className="font-semibold text-gray-900">{selectedTest.duration}</span>
              </div>
            </div>

            {selectedTest.preparationRequired && selectedTest.preparations && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <AlertCircle className="h-5 w-5 text-amber-600 mr-2" />
                  <span className="font-medium text-amber-800">Preparation Required</span>
                </div>
                <ul className="text-sm text-amber-700 space-y-1">
                  {selectedTest.preparations.map((prep, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 mr-2 flex-shrink-0" />
                      {prep}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Appointment Details</h2>

            {/* Patient Information */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Patient Information</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{user?.name}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{user?.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{user?.phone}</span>
                </div>
              </div>
            </div>

            {/* Date Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={getMinDate()}
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            {/* Time Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-4 w-4 inline mr-1" />
                Select Time
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                      selectedTime === slot.time
                        ? 'bg-sky-500 text-white border-sky-500'
                        : slot.available
                        ? 'bg-white text-gray-700 border-gray-300 hover:border-sky-300 hover:bg-sky-50'
                        : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-1" />
                Select Location
              </label>
              <div className="space-y-3">
                {locations.map((location) => (
                  <label
                    key={location.id}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedLocation === location.id
                        ? 'border-sky-500 bg-sky-50'
                        : 'border-gray-300 hover:border-sky-300 hover:bg-sky-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="location"
                      value={location.id}
                      checked={selectedLocation === location.id}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                      selectedLocation === location.id
                        ? 'border-sky-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedLocation === location.id && (
                        <div className="w-2 h-2 bg-sky-500 rounded-full" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{location.name}</div>
                      <div className="text-sm text-gray-600">{location.address}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!selectedDate || !selectedTime || !selectedLocation || isSubmitting}
              className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              {isSubmitting ? 'Booking Appointment...' : `Book Appointment - ₹${selectedTest.price}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookTest;