import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FileText, Download, Calendar, BookOpen, Filter } from "lucide-react";

interface PYQ {
  id: string;
  subject: string;
  year: number;
  semester: string;
  examType: string;
  department: string;
}

const pyqsData: PYQ[] = [
  { id: "1", subject: "Data Structures", year: 2024, semester: "3rd", examType: "End Sem", department: "CSE" },
  { id: "2", subject: "Digital Electronics", year: 2024, semester: "3rd", examType: "Mid Sem", department: "ECE" },
  { id: "3", subject: "Engineering Mathematics III", year: 2024, semester: "3rd", examType: "End Sem", department: "All" },
  { id: "4", subject: "Database Management System", year: 2023, semester: "4th", examType: "End Sem", department: "CSE" },
  { id: "5", subject: "Computer Networks", year: 2023, semester: "5th", examType: "End Sem", department: "CSE" },
  { id: "6", subject: "Operating Systems", year: 2023, semester: "4th", examType: "Mid Sem", department: "CSE" },
  { id: "7", subject: "Signals and Systems", year: 2024, semester: "4th", examType: "End Sem", department: "ECE" },
  { id: "8", subject: "Control Systems", year: 2022, semester: "5th", examType: "End Sem", department: "EE" },
  { id: "9", subject: "Thermodynamics", year: 2023, semester: "3rd", examType: "End Sem", department: "ME" },
  { id: "10", subject: "Fluid Mechanics", year: 2024, semester: "4th", examType: "Mid Sem", department: "CE" },
  { id: "11", subject: "Machine Learning", year: 2024, semester: "6th", examType: "End Sem", department: "CSE" },
  { id: "12", subject: "Artificial Intelligence", year: 2023, semester: "6th", examType: "End Sem", department: "CSE" },
];

const departments = ["All", "CSE", "ECE", "EE", "ME", "CE"];
const years = [2024, 2023, 2022, 2021];
const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
const examTypes = ["All", "Mid Sem", "End Sem"];

const PYQs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedExamType, setSelectedExamType] = useState("All");

  const filteredPYQs = pyqsData.filter((pyq) => {
    const matchesSearch = pyq.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === "All" || pyq.department === selectedDepartment;
    const matchesYear = selectedYear === "all" || pyq.year === parseInt(selectedYear);
    const matchesSemester = selectedSemester === "all" || pyq.semester === selectedSemester;
    const matchesExamType = selectedExamType === "All" || pyq.examType === selectedExamType;
    return matchesSearch && matchesDepartment && matchesYear && matchesSemester && matchesExamType;
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Previous Year Questions</h1>
        <p className="text-muted-foreground mt-1">
          Browse and download previous year question papers organized by subject and year
        </p>
      </motion.div>

      {/* Filters Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Papers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger>
                  <SelectValue placeholder="Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  {semesters.map((sem) => (
                    <SelectItem key={sem} value={sem}>
                      {sem} Sem
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4 flex gap-2">
              {examTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedExamType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedExamType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredPYQs.length} of {pyqsData.length} papers
          </p>
        </div>

        {filteredPYQs.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No papers found</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your filters</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPYQs.map((pyq, index) => (
              <motion.div
                key={pyq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <FileText className="h-5 w-5" />
                      </div>
                      <Badge variant="secondary">{pyq.department}</Badge>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {pyq.subject}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {pyq.year}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <BookOpen className="h-3.5 w-3.5" />
                        {pyq.semester} Sem
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {pyq.examType}
                      </Badge>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PYQs;
