import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Target,
  Clock,
  ChevronRight,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// Sample data
const subjects = [
  { name: "Mathematics", attendance: 92, required: 75, classes: 45, present: 41, trend: "up" },
  { name: "Physics", attendance: 85, required: 75, classes: 40, present: 34, trend: "down" },
  { name: "Computer Science", attendance: 96, required: 75, classes: 38, present: 36, trend: "up" },
  { name: "English", attendance: 78, required: 75, classes: 30, present: 23, trend: "warning" },
  { name: "Chemistry", attendance: 88, required: 75, classes: 35, present: 31, trend: "up" },
];

const monthlyData = [
  { month: "Aug", attendance: 95 },
  { month: "Sep", attendance: 92 },
  { month: "Oct", attendance: 88 },
  { month: "Nov", attendance: 85 },
  { month: "Dec", attendance: 88 },
];

const weeklyHeatmap = [
  { day: "Mon", week1: 100, week2: 100, week3: 75, week4: 100 },
  { day: "Tue", week1: 100, week2: 75, week3: 100, week4: 100 },
  { day: "Wed", week1: 75, week2: 100, week3: 100, week4: 75 },
  { day: "Thu", week1: 100, week2: 100, week3: 100, week4: 100 },
  { day: "Fri", week1: 100, week2: 50, week3: 100, week4: 100 },
];

const predictions = [
  { subject: "English", current: 78, predicted: 72, daysLeft: 15, message: "Miss 2 more classes and you'll drop below 75%" },
  { subject: "Physics", current: 85, predicted: 82, daysLeft: 15, message: "Good standing, but attendance has been declining" },
];

export default function Attendance() {
  const [overallAttendance] = useState(88);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const getStatusColor = (attendance: number, required: number) => {
    if (attendance >= 90) return "attendance";
    if (attendance >= required) return "lost";
    return "safety";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-attendance" />;
      case "down": return <TrendingDown className="w-4 h-4 text-safety" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-lost" />;
      default: return null;
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-attendance/20 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-attendance" />
            </div>
            Attendance Analytics
          </h1>
          <p className="text-muted-foreground">
            Track your attendance with predictive insights
          </p>
        </div>
        <Button variant="outline">
          <Calendar className="w-4 h-4 mr-2" />
          December 2025
        </Button>
      </motion.div>

      {/* Overview Cards */}
      <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Overall", value: `${overallAttendance}%`, icon: Target, color: "attendance" },
          { label: "Classes Attended", value: "165", icon: CheckCircle, color: "primary" },
          { label: "Classes Missed", value: "23", icon: Clock, color: "complaints" },
          { label: "Goal Progress", value: "On Track", icon: TrendingUp, color: "wellness" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={cn("w-5 h-5", `text-${stat.color}`)} />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <p className={cn("text-2xl font-bold", `text-${stat.color}`)}>{stat.value}</p>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject-wise breakdown */}
        <motion.div variants={fadeInUp} className="lg:col-span-2 glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-foreground mb-6">Subject-wise Attendance</h3>
          
          <div className="space-y-4">
            {subjects.map((subject) => (
              <motion.div
                key={subject.name}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedSubject(selectedSubject === subject.name ? null : subject.name)}
                className={cn(
                  "p-4 rounded-xl border cursor-pointer transition-all",
                  selectedSubject === subject.name 
                    ? "bg-muted border-primary/30" 
                    : "bg-card border-border hover:border-primary/20"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium text-foreground">{subject.name}</h4>
                    {getTrendIcon(subject.trend)}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {subject.present}/{subject.classes} classes
                    </span>
                    <span className={cn(
                      "text-lg font-bold",
                      `text-${getStatusColor(subject.attendance, subject.required)}`
                    )}>
                      {subject.attendance}%
                    </span>
                  </div>
                </div>
                
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${subject.attendance}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={cn(
                      "h-full rounded-full",
                      `bg-${getStatusColor(subject.attendance, subject.required)}`
                    )}
                  />
                  <div 
                    className="absolute top-0 h-full w-0.5 bg-foreground/50"
                    style={{ left: `${subject.required}%` }}
                  />
                </div>
                
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>Required: {subject.required}%</span>
                  <span className={subject.attendance >= subject.required ? "text-attendance" : "text-safety"}>
                    {subject.attendance >= subject.required ? "Above requirement" : "Below requirement"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Trend Chart */}
          <motion.div variants={fadeInUp} className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Trend</h3>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[70, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="attendance"
                    stroke="hsl(var(--attendance))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--attendance))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Predictions */}
          <motion.div variants={fadeInUp} className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-lost" />
              <h3 className="text-lg font-semibold text-foreground">Predictive Warnings</h3>
            </div>

            <div className="space-y-3">
              {predictions.map((pred) => (
                <div
                  key={pred.subject}
                  className="p-3 rounded-xl bg-lost/10 border border-lost/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{pred.subject}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-lost">{pred.current}%</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-safety">{pred.predicted}%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{pred.message}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Goals */}
          <motion.div variants={fadeInUp} className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Attendance Goals</h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Maintain 85%+ overall</span>
                  <span className="text-attendance font-medium">Achieved</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">No subject below 75%</span>
                  <span className="text-attendance font-medium">Achieved</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Perfect week streak</span>
                  <span className="text-muted-foreground font-medium">2/4 weeks</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Heatmap */}
      <motion.div variants={fadeInUp} className="glass-card p-6 rounded-2xl mt-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Weekly Heatmap</h3>
        
        <div className="overflow-x-auto">
          <div className="min-w-[500px]">
            <div className="grid grid-cols-5 gap-2 mb-2">
              <div className="text-sm text-muted-foreground">Day</div>
              <div className="text-sm text-muted-foreground text-center">Week 1</div>
              <div className="text-sm text-muted-foreground text-center">Week 2</div>
              <div className="text-sm text-muted-foreground text-center">Week 3</div>
              <div className="text-sm text-muted-foreground text-center">Week 4</div>
            </div>
            
            {weeklyHeatmap.map((row) => (
              <div key={row.day} className="grid grid-cols-5 gap-2 mb-2">
                <div className="text-sm font-medium text-foreground py-2">{row.day}</div>
                {[row.week1, row.week2, row.week3, row.week4].map((value, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-10 rounded-lg flex items-center justify-center text-sm font-medium",
                      value === 100 && "bg-attendance/30 text-attendance",
                      value === 75 && "bg-lost/30 text-lost",
                      value === 50 && "bg-safety/30 text-safety",
                      value === 0 && "bg-muted text-muted-foreground"
                    )}
                  >
                    {value}%
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-attendance/30" />
            <span>100% (All present)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-lost/30" />
            <span>75% (Partial)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-safety/30" />
            <span>50% or less</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
