import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, TestTube, Clock, ArrowRight } from 'lucide-react';

interface LabTest {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  preparationRequired: boolean;
  featured: boolean;
}

const TestCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const labTests: LabTest[] = [
    {
      id: '1',
      name: 'Complete Blood Count (CBC)',
      description: 'Comprehensive blood analysis including RBC, WBC, and platelets count',
      price: 350,
      duration: '24 hours',
      category: 'blood',
      preparationRequired: false,
      featured: true,
    },
    {
      id: '2',
      name: 'Blood Sugar (Fasting)',
      description: 'Fasting glucose test to check for diabetes and blood sugar levels',
      price: 120,
      duration: '4 hours',
      category: 'diabetes',
      preparationRequired: true,
      featured: true,
    },
    {
      id: '3',
      name: 'Lipid Profile',
      description: 'Cholesterol and triglyceride levels for heart health assessment',
      price: 450,
      duration: '24 hours',
      category: 'cardiovascular',
      preparationRequired: true,
      featured: true,
    },
    {
      id: '4',
      name: 'Thyroid Profile (TSH, T3, T4)',
      description: 'Complete thyroid function test to evaluate hormone levels',
      price: 650,
      duration: '48 hours',
      category: 'hormonal',
      preparationRequired: false,
      featured: false,
    },
    {
      id: '5',
      name: 'Liver Function Test (LFT)',
      description: 'Comprehensive liver enzyme panel to assess liver health',
      price: 550,
      duration: '24 hours',
      category: 'liver',
      preparationRequired: true,
      featured: false,
    },
    {
      id: '6',
      name: 'Kidney Function Test (KFT)',
      description: 'Creatinine and urea levels to evaluate kidney function',
      price: 400,
      duration: '24 hours',
      category: 'kidney',
      preparationRequired: false,
      featured: false,
    },
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'blood', label: 'Blood Tests' },
    { value: 'cardiovascular', label: 'Heart Health' },
    { value: 'hormonal', label: 'Hormonal' },
    { value: 'diabetes', label: 'Diabetes' },
    { value: 'liver', label: 'Liver' },
    { value: 'kidney', label: 'Kidney' },
  ];

  const filteredTests = labTests
    .filter(test => {
      const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          test.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const featuredTests = labTests.filter(test => test.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lab Test Catalog</h1>
        <p className="text-gray-600">
          Browse our comprehensive collection of laboratory tests and book your appointment today.
        </p>
      </div>

      {/* Featured Tests */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Popular Tests</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTests.map((test) => (
            <div key={test.id} className="bg-gradient-to-br from-sky-500 to-cyan-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <TestTube className="h-8 w-8" />
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                  Popular
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{test.name}</h3>
              <p className="text-sky-100 text-sm mb-4 line-clamp-2">{test.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">₹{test.price}</span>
                <Link
                  to={`/book-test/${test.id}`}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center"
                >
                  Book Now <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="md:w-64">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 appearance-none bg-white"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort */}
          <div className="md:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 appearance-none bg-white"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </div>
      </div>

      {/* Test Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map((test) => (
          <div key={test.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                <TestTube className="h-6 w-6 text-sky-600" />
              </div>
              {test.preparationRequired && (
                <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                  Fasting Required
                </span>
              )}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{test.name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{test.description}</p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {test.duration}
              </div>
              <div className="flex items-center text-gray-900 font-semibold">
                <span className="text-lg">₹{test.price}</span>
              </div>
            </div>

            <Link
              to={`/book-test/${test.id}`}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
            >
              Book Test <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredTests.length === 0 && (
        <div className="text-center py-12">
          <TestTube className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tests found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default TestCatalog;