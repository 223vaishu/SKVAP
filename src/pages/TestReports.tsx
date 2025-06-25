import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  TestTube, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Eye,
  Search,
  Filter
} from 'lucide-react';

interface TestReport {
  id: string;
  testName: string;
  date: string;
  status: 'completed' | 'pending' | 'in-progress';
  reportUrl?: string;
  doctor: string;
  location: string;
  price: number;
  results?: {
    summary: string;
    findings: Array<{
      parameter: string;
      value: string;
      range: string;
      status: 'normal' | 'high' | 'low';
    }>;
  };
}

const TestReports: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<TestReport | null>(null);

  const testReports: TestReport[] = [
    {
      id: '1',
      testName: 'Complete Blood Count (CBC)',
      date: '2024-01-10',
      status: 'completed',
      doctor: 'Dr. Priya Sharma',
      location: 'Connaught Place Center',
      price: 350,
      results: {
        summary: 'All values within normal range. No significant abnormalities detected.',
        findings: [
          { parameter: 'Hemoglobin', value: '13.8', range: '12.0-15.5 g/dL', status: 'normal' },
          { parameter: 'WBC Count', value: '7.2', range: '4.0-11.0 K/uL', status: 'normal' },
          { parameter: 'Platelet Count', value: '285', range: '150-450 K/uL', status: 'normal' },
        ],
      },
    },
    {
      id: '2',
      testName: 'Blood Sugar (Fasting)',
      date: '2024-01-08',
      status: 'pending',
      doctor: 'Dr. Rajesh Kumar',
      location: 'Karol Bagh Clinic',
      price: 120,
    },
    
  ];

  const filteredReports = testReports.filter(report => {
    const matchesSearch = report.testName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-emerald-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-600" />;
      case 'in-progress':
        return <TestTube className="h-5 w-5 text-sky-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'in-progress':
        return 'bg-sky-100 text-sky-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getParameterStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-emerald-600';
      case 'high':
        return 'text-red-600';
      case 'low':
        return 'text-amber-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleDownloadReport = (reportId: string, testName: string) => {
    // Simulate PDF download
    const element = document.createElement('a');
    element.href = `data:text/plain;charset=utf-8,${encodeURIComponent(`Lab Report for ${testName}\nReport ID: ${reportId}\nGenerated on: ${new Date().toLocaleDateString()}`)}`;
    element.download = `${testName.replace(/\s+/g, '_')}_Report_${reportId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleViewReport = (report: TestReport) => {
    setSelectedReport(report);
  };

  const handleCloseReport = () => {
    setSelectedReport(null);
  };

  if (selectedReport) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg">
          {/* Report Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handleCloseReport}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                ← Back to Reports
              </button>
              <button
                onClick={() => handleDownloadReport(selectedReport.id, selectedReport.testName)}
                className="flex items-center px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors duration-200"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedReport.testName}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Date: {selectedReport.date}</span>
                  <span>Doctor: {selectedReport.doctor}</span>
                  <span>Location: {selectedReport.location}</span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedReport.status)}`}>
                {selectedReport.status.charAt(0).toUpperCase() + selectedReport.status.slice(1)}
              </div>
            </div>
          </div>

          {/* Report Content */}
          <div className="p-6">
            {selectedReport.results ? (
              <>
                {/* Summary */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Summary</h2>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedReport.results.summary}</p>
                </div>

                {/* Test Results */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Results</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Parameter</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Value</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Reference Range</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedReport.results.findings.map((finding, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                              {finding.parameter}
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-gray-700">
                              {finding.value}
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-gray-700">
                              {finding.range}
                            </td>
                            <td className={`border border-gray-300 px-4 py-3 font-medium ${getParameterStatusColor(finding.status)}`}>
                              {finding.status.toUpperCase()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Notes */}
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-900">Important Notes</span>
                  </div>
                  <p className="text-blue-800 text-sm">
                    These results should be interpreted by your healthcare provider. 
                    Please consult with your doctor to discuss these results and any necessary follow-up actions.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Results Pending</h3>
                <p className="text-gray-600">Your test results are being processed and will be available soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Reports</h1>
        <p className="text-gray-600">
          View and download your lab test reports and results.
        </p>
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
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="md:w-48">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{report.testName}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {report.date}
                    </div>
                    <span>{report.doctor}</span>
                    <span>{report.location}</span>
                    <span>₹{report.price}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(report.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {report.status === 'completed' && (
                    <>
                      <button
                        onClick={() => handleViewReport(report)}
                        className="flex items-center px-3 py-2 text-sky-600 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-colors duration-200"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => handleDownloadReport(report.id, report.testName)}
                        className="flex items-center px-3 py-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors duration-200"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default TestReports;