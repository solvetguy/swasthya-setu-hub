import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Stethoscope, Building2, Calendar, Pill, FileText, ShieldCheck,
  Clock, CheckCircle2, AlertTriangle, ChevronDown, ChevronUp,
  MessageSquare, Upload, Plus, BadgeCheck, Activity, Search,
  UserPlus, Eye, EyeOff, Link2, Shield, X, Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";

/* ─── Types ─── */
interface DoctorNote {
  id: string;
  date: string;
  content: string;
  type: "observation" | "follow-up" | "diagnosis";
}

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  hospital: string;
  hospitalVerified: boolean;
  doctorVerified: boolean;
  licenseId?: string;
  yearsExperience: number;
  avatarInitials: string;
  connected: boolean;
  pendingRequest?: "sent" | "received";
  permissions: {
    healthProfile: boolean;
    medicalReports: boolean;
    prescriptions: boolean;
    familySummary: boolean;
  };
  accessExpiry?: string;
  consultations: Consultation[];
}

interface Consultation {
  id: string;
  date: string;
  diagnosis: string;
  medicines: string[];
  prescriptionFiles: string[];
  status: "ongoing" | "completed" | "follow-up";
  notes: DoctorNote[];
}

/* ─── Mock data ─── */
const initialDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Ananya Sharma",
    specialization: "Cardiologist",
    hospital: "Apollo Hospital, Delhi",
    hospitalVerified: true,
    doctorVerified: true,
    licenseId: "MCI-78432",
    yearsExperience: 14,
    avatarInitials: "AS",
    connected: true,
    permissions: { healthProfile: true, medicalReports: true, prescriptions: true, familySummary: false },
    accessExpiry: "2026-06-18",
    consultations: [
      {
        id: "c1", date: "2026-02-18",
        diagnosis: "Mild hypertension — Stage 1. Advised lifestyle changes and medication.",
        medicines: ["Amlodipine 5mg", "Aspirin 75mg"],
        prescriptionFiles: ["prescription_feb2026.pdf"],
        status: "ongoing",
        notes: [
          { id: "n1", date: "2026-02-18", content: "BP recorded at 148/92. Started low-dose Amlodipine.", type: "observation" },
          { id: "n2", date: "2026-03-04", content: "Follow-up in 4 weeks to reassess BP levels.", type: "follow-up" },
        ],
      },
      {
        id: "c1b", date: "2025-09-10",
        diagnosis: "Routine cardiac checkup. ECG normal.",
        medicines: [],
        prescriptionFiles: [],
        status: "completed",
        notes: [{ id: "n1b", date: "2025-09-10", content: "All parameters normal. Annual follow-up advised.", type: "observation" }],
      },
    ],
  },
  {
    id: "2",
    name: "Dr. Rajesh Mehta",
    specialization: "Orthopedic Surgeon",
    hospital: "Fortis Hospital, Mumbai",
    hospitalVerified: true,
    doctorVerified: true,
    licenseId: "MCI-56219",
    yearsExperience: 20,
    avatarInitials: "RM",
    connected: true,
    permissions: { healthProfile: true, medicalReports: true, prescriptions: true, familySummary: true },
    accessExpiry: "2026-05-01",
    consultations: [
      {
        id: "c2", date: "2025-11-05",
        diagnosis: "Lumbar disc herniation (L4-L5). Conservative treatment recommended.",
        medicines: ["Diclofenac 50mg", "Thiocolchicoside 8mg", "Calcium + Vitamin D3"],
        prescriptionFiles: ["mri_report_nov2025.pdf", "prescription_nov2025.pdf"],
        status: "completed",
        notes: [
          { id: "n3", date: "2025-11-05", content: "MRI confirms mild disc bulge at L4-L5. No surgical intervention needed.", type: "diagnosis" },
          { id: "n4", date: "2025-12-20", content: "Patient reports significant improvement. Discharged from active care.", type: "observation" },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Dr. Priya Nair",
    specialization: "Dermatologist",
    hospital: "Max Healthcare, Bangalore",
    hospitalVerified: true,
    doctorVerified: false,
    yearsExperience: 8,
    avatarInitials: "PN",
    connected: true,
    permissions: { healthProfile: true, medicalReports: false, prescriptions: true, familySummary: false },
    consultations: [
      {
        id: "c3", date: "2026-01-12",
        diagnosis: "Chronic eczema on forearms. Topical corticosteroid therapy initiated.",
        medicines: ["Mometasone Furoate cream", "Cetirizine 10mg"],
        prescriptionFiles: ["prescription_jan2026.pdf"],
        status: "follow-up",
        notes: [
          { id: "n5", date: "2026-01-12", content: "Moderate eczema flare. Prescribed topical steroid for 2 weeks.", type: "observation" },
          { id: "n6", date: "2026-02-10", content: "Follow-up required to assess steroid response.", type: "follow-up" },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Dr. Vikram Desai",
    specialization: "General Physician",
    hospital: "City Clinic, Pune",
    hospitalVerified: false,
    doctorVerified: true,
    licenseId: "MCI-91023",
    yearsExperience: 12,
    avatarInitials: "VD",
    connected: false,
    pendingRequest: "received",
    permissions: { healthProfile: false, medicalReports: false, prescriptions: false, familySummary: false },
    consultations: [
      {
        id: "c4", date: "2025-08-22",
        diagnosis: "Seasonal viral fever with throat infection.",
        medicines: ["Paracetamol 500mg", "Azithromycin 500mg", "Cough Syrup"],
        prescriptionFiles: [],
        status: "completed",
        notes: [{ id: "n7", date: "2025-08-22", content: "Fever 101°F. Started antibiotics for 3 days.", type: "diagnosis" }],
      },
    ],
  },
  {
    id: "5",
    name: "Dr. Sunita Kapoor",
    specialization: "Gynecologist",
    hospital: "Medanta Hospital, Gurgaon",
    hospitalVerified: true,
    doctorVerified: true,
    licenseId: "MCI-44891",
    yearsExperience: 18,
    avatarInitials: "SK",
    connected: false,
    permissions: { healthProfile: false, medicalReports: false, prescriptions: false, familySummary: false },
    consultations: [],
  },
];

/* ─── Status helpers ─── */
const statusConfig: Record<Consultation["status"], { label: string; icon: React.ReactNode; className: string }> = {
  ongoing: { label: "Ongoing", icon: <Clock className="h-3 w-3" />, className: "bg-primary/15 text-primary border-primary/30" },
  completed: { label: "Completed", icon: <CheckCircle2 className="h-3 w-3" />, className: "bg-accent/15 text-accent border-accent/30" },
  "follow-up": { label: "Follow-up", icon: <AlertTriangle className="h-3 w-3" />, className: "bg-[hsl(38_92%_50%)]/15 text-[hsl(38_92%_40%)] border-[hsl(38_92%_50%)]/30" },
};

const noteTypeColors: Record<DoctorNote["type"], string> = {
  observation: "bg-secondary text-secondary-foreground",
  "follow-up": "bg-primary/10 text-primary",
  diagnosis: "bg-accent/10 text-accent",
};

/* ─── Component ─── */
const DoctorNetwork = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"connected" | "requests" | "discover" | "timeline">("connected");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [permissionsDoctor, setPermissionsDoctor] = useState<Doctor | null>(null);
  const [expandedConsultation, setExpandedConsultation] = useState<string | null>(null);
  const [newNote, setNewNote] = useState("");

  const connected = doctors.filter(d => d.connected);
  const requests = doctors.filter(d => d.pendingRequest === "received");
  const discoverable = doctors.filter(d => !d.connected && !d.pendingRequest);

  const filtered = (list: Doctor[]) =>
    list.filter(d =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization.toLowerCase().includes(search.toLowerCase()) ||
      d.hospital.toLowerCase().includes(search.toLowerCase())
    );

  const allConsultations = doctors
    .filter(d => d.connected)
    .flatMap(d => d.consultations.map(c => ({ ...c, doctorName: d.name, specialization: d.specialization, avatarInitials: d.avatarInitials })))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const sendRequest = (id: string) => {
    setDoctors(ds => ds.map(d => d.id === id ? { ...d, pendingRequest: "sent" as const } : d));
    toast.success("Connection request sent");
  };

  const acceptRequest = (id: string) => {
    setDoctors(ds => ds.map(d => d.id === id ? { ...d, connected: true, pendingRequest: undefined, permissions: { healthProfile: true, medicalReports: false, prescriptions: false, familySummary: false } } : d));
    toast.success("Doctor connected");
  };

  const rejectRequest = (id: string) => {
    setDoctors(ds => ds.map(d => d.id === id ? { ...d, pendingRequest: undefined } : d));
    toast.info("Request rejected");
  };

  const revokeAccess = (id: string) => {
    setDoctors(ds => ds.map(d => d.id === id ? { ...d, connected: false, permissions: { healthProfile: false, medicalReports: false, prescriptions: false, familySummary: false } } : d));
    toast.info("Access revoked");
  };

  const togglePermission = (doctorId: string, key: keyof Doctor["permissions"]) => {
    setDoctors(ds => ds.map(d => d.id === doctorId ? { ...d, permissions: { ...d.permissions, [key]: !d.permissions[key] } } : d));
    setPermissionsDoctor(prev => prev && prev.id === doctorId ? { ...prev, permissions: { ...prev.permissions, [key]: !prev.permissions[key] } } : prev);
  };

  const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  /* ─── Doctor Profile Card ─── */
  const DoctorCard = ({ d, showActions }: { d: Doctor; showActions: "connected" | "request" | "discover" }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
      <Card className="hover:shadow-[var(--card-shadow-hover)] transition-all group">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-sm shrink-0 group-hover:bg-primary/20 transition-colors">
              {d.avatarInitials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-heading font-semibold text-foreground text-sm">{d.name}</h3>
                {d.doctorVerified && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-primary">
                    <BadgeCheck className="h-3.5 w-3.5" /> Verified
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground mt-1">
                <span className="flex items-center gap-1"><Activity className="h-3 w-3" />{d.specialization}</span>
                <span className="flex items-center gap-1">
                  <Building2 className="h-3 w-3" />{d.hospital}
                  {d.hospitalVerified && <ShieldCheck className="h-3 w-3 text-accent" />}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                <span>{d.yearsExperience} yrs exp.</span>
                {d.licenseId && <span className="text-muted-foreground/70">License: {d.licenseId}</span>}
              </div>

              {/* Connected info */}
              {showActions === "connected" && d.consultations.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-[10px] border-border gap-1">
                    <Calendar className="h-3 w-3" /> Last: {fmtDate(d.consultations[0].date)}
                  </Badge>
                  {(() => {
                    const latest = d.consultations[0];
                    const sc = statusConfig[latest.status];
                    return <Badge variant="outline" className={`${sc.className} text-[10px] gap-1 border`}>{sc.icon}{sc.label}</Badge>;
                  })()}
                </div>
              )}

              {/* Actions */}
              <div className="mt-3 flex flex-wrap gap-2">
                {showActions === "connected" && (
                  <>
                    <Button size="sm" variant="outline" className="text-xs h-7 gap-1" onClick={() => setSelectedDoctor(d)}>
                      <Eye className="h-3 w-3" /> View Profile
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs h-7 gap-1" onClick={() => setPermissionsDoctor(d)}>
                      <Shield className="h-3 w-3" /> Permissions
                    </Button>
                    <Button size="sm" variant="ghost" className="text-xs h-7 gap-1 text-destructive hover:text-destructive" onClick={() => revokeAccess(d.id)}>
                      <X className="h-3 w-3" /> Revoke
                    </Button>
                  </>
                )}
                {showActions === "request" && (
                  <>
                    <Button size="sm" className="text-xs h-7 gap-1" onClick={() => acceptRequest(d.id)}>
                      <CheckCircle2 className="h-3 w-3" /> Accept
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs h-7 gap-1" onClick={() => rejectRequest(d.id)}>
                      <X className="h-3 w-3" /> Reject
                    </Button>
                  </>
                )}
                {showActions === "discover" && (
                  <Button size="sm" className="text-xs h-7 gap-1" onClick={() => sendRequest(d.id)}>
                    <UserPlus className="h-3 w-3" /> Connect
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
          <Stethoscope className="h-6 w-6 text-primary" /> Doctor Network
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Manage doctor connections, permissions, and treatment history.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Connected", value: connected.length, icon: <Stethoscope className="h-4 w-4 text-primary" /> },
          { label: "Pending", value: requests.length, icon: <Clock className="h-4 w-4 text-primary" /> },
          { label: "Consultations", value: allConsultations.length, icon: <FileText className="h-4 w-4 text-accent" /> },
          { label: "Active Treatments", value: allConsultations.filter(c => c.status === "ongoing").length, icon: <Activity className="h-4 w-4 text-primary" /> },
        ].map(s => (
          <Card key={s.label} className="shadow-none">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">{s.icon}</div>
              <div>
                <p className="text-xl font-heading font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by name, specialization, or hospital…" className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={v => setTab(v as typeof tab)}>
        <TabsList>
          <TabsTrigger value="connected">Connected ({connected.length})</TabsTrigger>
          <TabsTrigger value="requests">Requests {requests.length > 0 && <Badge className="ml-1.5 h-5 w-5 p-0 text-[10px] justify-center" variant="default">{requests.length}</Badge>}</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        {/* Connected */}
        <TabsContent value="connected" className="mt-4">
          {filtered(connected).length === 0 ? (
            <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">No connected doctors found.</CardContent></Card>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {filtered(connected).map(d => <DoctorCard key={d.id} d={d} showActions="connected" />)}
            </div>
          )}
        </TabsContent>

        {/* Requests */}
        <TabsContent value="requests" className="mt-4">
          {requests.length === 0 ? (
            <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">No pending requests.</CardContent></Card>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {requests.map(d => <DoctorCard key={d.id} d={d} showActions="request" />)}
            </div>
          )}
        </TabsContent>

        {/* Discover */}
        <TabsContent value="discover" className="mt-4">
          {filtered(discoverable).length === 0 ? (
            <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">No doctors to discover.</CardContent></Card>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {filtered(discoverable).map(d => <DoctorCard key={d.id} d={d} showActions="discover" />)}
            </div>
          )}
        </TabsContent>

        {/* Timeline */}
        <TabsContent value="timeline" className="mt-4">
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border hidden sm:block" />
            <div className="space-y-4">
              {allConsultations.length === 0 ? (
                <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">No consultations yet.</CardContent></Card>
              ) : (
                allConsultations.map(c => {
                  const sc = statusConfig[c.status];
                  const expanded = expandedConsultation === c.id;
                  return (
                    <motion.div key={c.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="relative sm:pl-12">
                      <div className="absolute left-[13px] top-5 h-3.5 w-3.5 rounded-full border-2 border-primary bg-card hidden sm:block" />
                      <Card className="overflow-hidden hover:shadow-md transition-shadow">
                        <button type="button" className="w-full text-left" onClick={() => setExpandedConsultation(expanded ? null : c.id)}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-xs shrink-0">
                                  {c.avatarInitials}
                                </div>
                                <div>
                                  <p className="font-heading font-semibold text-foreground text-sm">{c.doctorName}</p>
                                  <p className="text-xs text-muted-foreground">{c.specialization} • {fmtDate(c.date)}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <Badge variant="outline" className={`${sc.className} gap-1 text-[10px] border`}>{sc.icon}{sc.label}</Badge>
                                {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{c.diagnosis}</p>
                          </CardContent>
                        </button>
                        <AnimatePresence>
                          {expanded && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                              <CardContent className="pt-0 space-y-4 border-t border-border mt-0 pt-4">
                                {c.medicines.length > 0 && (
                                  <div>
                                    <p className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1"><Pill className="h-3 w-3" /> Medicines</p>
                                    <div className="flex flex-wrap gap-1.5">{c.medicines.map(m => <Badge key={m} variant="secondary" className="text-xs font-normal">{m}</Badge>)}</div>
                                  </div>
                                )}
                                {c.prescriptionFiles.length > 0 && (
                                  <div>
                                    <p className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1"><FileText className="h-3 w-3" /> Files</p>
                                    <div className="flex flex-wrap gap-1.5">{c.prescriptionFiles.map(f => (
                                      <span key={f} className="flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-xs text-foreground"><FileText className="h-3 w-3 text-primary" />{f}</span>
                                    ))}</div>
                                  </div>
                                )}
                                <div>
                                  <p className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1"><MessageSquare className="h-3 w-3" /> Notes</p>
                                  <div className="space-y-1.5">
                                    {c.notes.map(n => (
                                      <div key={n.id} className="flex gap-2 items-start">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                        <div>
                                          <span className="text-[10px] text-muted-foreground">{fmtDate(n.date)}</span>
                                          <Badge variant="outline" className={`${noteTypeColors[n.type]} text-[10px] px-1 py-0 border-0 ml-1.5`}>{n.type}</Badge>
                                          <p className="text-xs text-foreground mt-0.5">{n.content}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </CardContent>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Card>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Doctor Profile Dialog */}
      <Dialog open={!!selectedDoctor} onOpenChange={() => setSelectedDoctor(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          {selectedDoctor && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-lg">
                    {selectedDoctor.avatarInitials}
                  </div>
                  <div>
                    <DialogTitle className="flex items-center gap-2">
                      {selectedDoctor.name}
                      {selectedDoctor.doctorVerified && <BadgeCheck className="h-4 w-4 text-primary" />}
                    </DialogTitle>
                    <DialogDescription>{selectedDoctor.specialization} • {selectedDoctor.hospital}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-secondary">
                    <p className="text-xs text-muted-foreground">Experience</p>
                    <p className="text-sm font-semibold text-foreground">{selectedDoctor.yearsExperience} years</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary">
                    <p className="text-xs text-muted-foreground">Consultations</p>
                    <p className="text-sm font-semibold text-foreground">{selectedDoctor.consultations.length}</p>
                  </div>
                  {selectedDoctor.licenseId && (
                    <div className="p-3 rounded-lg bg-secondary">
                      <p className="text-xs text-muted-foreground">License ID</p>
                      <p className="text-sm font-semibold text-foreground">{selectedDoctor.licenseId}</p>
                    </div>
                  )}
                  {selectedDoctor.accessExpiry && (
                    <div className="p-3 rounded-lg bg-secondary">
                      <p className="text-xs text-muted-foreground">Access Expires</p>
                      <p className="text-sm font-semibold text-foreground">{fmtDate(selectedDoctor.accessExpiry)}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedDoctor.doctorVerified && (
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 gap-1 text-xs"><BadgeCheck className="h-3 w-3" /> Verified Doctor</Badge>
                  )}
                  {selectedDoctor.hospitalVerified && (
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30 gap-1 text-xs"><ShieldCheck className="h-3 w-3" /> Verified Hospital</Badge>
                  )}
                </div>
                {/* Prescriptions */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Recent Prescriptions</p>
                  {selectedDoctor.consultations.flatMap(c => c.prescriptionFiles).length === 0 ? (
                    <p className="text-xs text-muted-foreground">No prescriptions on file.</p>
                  ) : (
                    <div className="space-y-1.5">
                      {selectedDoctor.consultations.map(c => c.prescriptionFiles.map(f => (
                        <div key={f} className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs">
                          <FileText className="h-3.5 w-3.5 text-primary" />
                          <span className="text-foreground flex-1">{f}</span>
                          <span className="text-muted-foreground">{fmtDate(c.date)}</span>
                        </div>
                      )))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Permissions Dialog */}
      <Dialog open={!!permissionsDoctor} onOpenChange={() => setPermissionsDoctor(null)}>
        <DialogContent className="max-w-sm">
          {permissionsDoctor && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" /> Access Permissions</DialogTitle>
                <DialogDescription>Control what {permissionsDoctor.name} can access.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                {([
                  { key: "healthProfile" as const, label: "Health Profile", desc: "Basic health information" },
                  { key: "medicalReports" as const, label: "Medical Reports", desc: "Lab results and scans" },
                  { key: "prescriptions" as const, label: "Prescriptions", desc: "Medication history" },
                  { key: "familySummary" as const, label: "Family Health Summary", desc: "Family medical conditions" },
                ]).map(p => (
                  <div key={p.key} className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm text-foreground">{p.label}</Label>
                      <p className="text-xs text-muted-foreground">{p.desc}</p>
                    </div>
                    <Switch
                      checked={permissionsDoctor.permissions[p.key]}
                      onCheckedChange={() => togglePermission(permissionsDoctor.id, p.key)}
                    />
                  </div>
                ))}
                {permissionsDoctor.accessExpiry && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">Access expires: <span className="text-foreground font-medium">{fmtDate(permissionsDoctor.accessExpiry)}</span></p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorNetwork;
