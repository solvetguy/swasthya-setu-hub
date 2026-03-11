import { motion } from "framer-motion";
import { FileText, Bell, QrCode, Activity, Upload, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stats = [
  { label: "Medical Records", value: "12", icon: FileText, color: "text-primary" },
  { label: "Active Reminders", value: "3", icon: Bell, color: "text-accent" },
  { label: "Family Members", value: "4", icon: QrCode, color: "text-primary" },
];

const recentReports = [
  { name: "Blood Test Report", date: "Mar 5, 2026", type: "Blood Test", hospital: "City Hospital" },
  { name: "Chest X-Ray", date: "Feb 20, 2026", type: "Scan", hospital: "Apollo Clinic" },
  { name: "Prescription - Dr. Sharma", date: "Feb 10, 2026", type: "Prescription", hospital: "HealthFirst" },
];

const reminders = [
  { medicine: "Metformin 500mg", time: "8:00 AM", status: "Due" },
  { medicine: "Vitamin D3", time: "9:00 AM", status: "Taken" },
  { medicine: "Amlodipine 5mg", time: "9:00 PM", status: "Upcoming" },
];

const timeline = [
  { action: "Uploaded Blood Test Report", time: "2 hours ago" },
  { action: "Added medicine reminder", time: "Yesterday" },
  { action: "Shared records with Dr. Gupta", time: "3 days ago" },
  { action: "Updated health profile", time: "1 week ago" },
];

const DashboardHome = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard</h1>
      <p className="text-sm text-muted-foreground">Your health overview at a glance</p>
    </div>

    {/* Stats */}
    <div className="grid sm:grid-cols-3 gap-4">
      {stats.map((s, i) => (
        <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      {/* Recent Reports */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-heading">Recent Reports</CardTitle>
          <Link to="/dashboard/records"><Button variant="ghost" size="sm">View All</Button></Link>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentReports.map((r) => (
            <div key={r.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.hospital} • {r.date}</p>
                </div>
              </div>
              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{r.type}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Medicine Reminders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-heading">Medicine Reminders</CardTitle>
          <Link to="/dashboard/reminders"><Button variant="ghost" size="sm">Manage</Button></Link>
        </CardHeader>
        <CardContent className="space-y-3">
          {reminders.map((r) => (
            <div key={r.medicine} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{r.medicine}</p>
                  <p className="text-xs text-muted-foreground">{r.time}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${r.status === "Taken" ? "bg-accent/20 text-accent" : r.status === "Due" ? "bg-destructive/20 text-destructive" : "bg-secondary text-secondary-foreground"}`}>
                {r.status}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Emergency Card */}
      <Card className="border-primary/30">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center shrink-0">
              <QrCode className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-1">Emergency QR Code</h3>
              <p className="text-xs text-muted-foreground mb-3">Generate your emergency QR code for quick access to critical health info.</p>
              <Link to="/dashboard/qr"><Button size="sm" variant="outline">Generate QR</Button></Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Timeline */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-heading">Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeline.map((t, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm text-foreground">{t.action}</p>
                  <p className="text-xs text-muted-foreground">{t.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default DashboardHome;
