import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Calendar, 
  FileText, 
  TestTube, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Heart,
  Activity,
  Shield
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data for recent activities and upcoming appointments
  const recentTests = [
    { name: 'Complete Blood Count', date: '2024-01-10', status: 'completed' },
    { name: 'Blood Sugar (Fasting)', date: '2024-01-08', status: 'pending' },
  ];

  const upcomingAppointments = [
    { name: 'Lipid Profile', date: '2024-01-25', time: '10:00 AM' },
  ];

  const quickActions = [
    {
      title: 'Browse Lab Tests',
      description: 'Explore our comprehensive catalog of lab tests',
      icon: TestTube,
      link: '/tests',
      color: 'bg-emerald-500 hover:bg-emerald-600',
    },
    {
      title: 'Book a Test',
      description: 'Schedule your next lab test appointment',
      icon: Calendar,
      link: '/book-test',
      color: 'bg-sky-500 hover:bg-sky-600',
    },
    {
      title: 'View Reports',
      description: 'Access and download your test reports',
      icon: FileText,
      link: '/reports',
      color: 'bg-purple-500 hover:bg-purple-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Here's an overview of your health journey and recent activities.
        </p>
      </div>

      {/* Health Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed Tests</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Results</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-sky-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Upcoming Tests</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center transition-colors duration-200`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-gray-600 text-sm">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity and Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tests */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Tests</h2>
            <Link 
              to="/reports" 
              className="text-sky-600 hover:text-sky-700 text-sm font-medium flex items-center"
            >
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentTests.map((test, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    test.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-900">{test.name}</p>
                    <p className="text-sm text-gray-600">{test.date}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  test.status === 'completed' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {test.status === 'completed' ? 'Completed' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
            <Link 
              to="/book-test" 
              className="text-sky-600 hover:text-sky-700 text-sm font-medium flex items-center"
            >
              Book new <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-sky-50 rounded-lg border border-sky-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mr-4">
                    <TestTube className="h-6 w-6 text-sky-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{appointment.name}</p>
                    <p className="text-sm text-gray-600">{appointment.date} at {appointment.time}</p>
                  </div>
                </div>
                <Calendar className="h-5 w-5 text-sky-600" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Health Tips Section */}
      <div className="mt-8 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-xl p-6 text-white">
        <div className="flex items-center mb-4">
          <Heart className="h-6 w-6 mr-2" />
          <h2 className="text-xl font-semibold">Health Tip of the Day</h2>
        </div>
        <p className="text-sky-100 mb-4">
          Regular health screenings can help detect potential health issues early. 
          Consider scheduling routine check-ups to maintain optimal health.
        </p>
        <Link 
          to="/tests" 
          className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-white font-medium transition-all duration-200"
        >
          Explore Tests <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;