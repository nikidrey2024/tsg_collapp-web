import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Bell } from "lucide-react";

export default function StudentDashboardPage() {
  const statsData = [
    { title: "TOTAL APPLICATIONS", value: "2", bgColor: "bg-gray-300" },
    { title: "ACCEPTED", value: "1", bgColor: "bg-green-400" },
    { title: "UNDER REVIEW", value: "1", bgColor: "bg-yellow-400" },
    { title: "AVAILABLE COLLEGES", value: "3", bgColor: "bg-gray-300" },
  ];

  const recentApplications = [
    {
      university: "Ateneo de Manila University",
      program: "Business Administration",
      status: "Under Review",
      statusColor: "bg-yellow-400"
    },
    {
      university: "De La Salle University",
      program: "Industrial Engineering",
      status: "Accepted",
      statusColor: "bg-green-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">COLLAPP</h1>
        <div className="flex items-center gap-4">
          <Bell className="h-5 w-5 text-gray-600" />
          <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </div>

      <div className="p-6 max-w-md mx-auto">
        {/* Dashboard Title */}
        <h2 className="text-2xl font-bold mb-6">STUDENT DASHBOARD</h2>

        {/* Stats Cards */}
        <div className="space-y-4 mb-8">
          {statsData.map((stat, index) => (
            <Card key={index} className={`${stat.bgColor} border-0 shadow-sm`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                      {stat.title}
                    </p>
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {stat.value}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Applications Section */}
        <Card className="bg-white border shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">RECENT APPLICATIONS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentApplications.map((application, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {application.university}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {application.program}
                    </p>
                  </div>
                  <div className="ml-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${application.statusColor}`}>
                      {application.status === "Accepted" && "✓ "}
                      {application.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Back to Homepage Link */}
        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-blue-600 hover:underline">
            ← Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}