import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Stethoscope, Building2, Calendar, Pill, FileText, ShieldCheck,
  Clock, CheckCircle2, AlertTriangle, ChevronDown, ChevronUp,
  MessageSquare, Upload, Plus, BadgeCheck, Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

/* ─── Types ─── */
interface DoctorNote {
  id: string;
  date: string;
  content: string;
  type: "observation" | "follow-up" | "diagnosis";
}

interface Treatment {
  id: string;
  doctorName: string;
  specialization: string;
  hospital: string;
  hospitalVerified: boolean;
  doctorVerified: boolean;
  licenseId?: string;
  consultationDate: string;
  diagnosis: string;
  medicines: string[];
  prescriptionFiles: string[];
  status: "ongoing" | "completed" | "follow-up";
  notes: DoctorNote[];
  avatarInitials: string;
}

/* ─── Mock data ─── */
const treatments: Treatment[] = [
  {
    id: "1",
    doctorName: "Dr. Ananya Sharma",
    specialization: "Cardiologist",
    hospital: "Apollo Hospital, Delhi",
    hospitalVerified: true,
    doctorVerified: true,
    licenseId: "MCI-78432",
    consultationDate: "2026-02-18",
    diagnosis: "Mild hypertension — Stage 1. Advised lifestyle changes and medication.",
    medicines: ["Amlodipine 5mg", "Aspirin 75mg"],
    prescriptionFiles: ["prescription_feb2026.pdf"],
    status: "ongoing",
    notes: [
      { id: "n1", date: "2026-02-18", content: "BP recorded at 148/92. Started low-dose Amlodipine.", type: "observation" },
      { id: "n2", date: "2026-03-04", content: "Follow-up in 4 weeks to reassess BP levels.", type: "follow-up" },
    ],
    avatarInitials: "AS",
  },
  {
    id: "2",
    doctorName: "Dr. Rajesh Mehta",
    specialization: "Orthopedic Surgeon",
    hospital: "Fortis Hospital, Mumbai",
    hospitalVerified: true,
    doctorVerified: true,
    licenseId: "MCI-56219",
    consultationDate: "2025-11-05",
    diagnosis: "Lumbar disc herniation (L4-L5). Conservative treatment recommended.",
    medicines: ["Diclofenac 50mg", "Thiocolchicoside 8mg", "Calcium + Vitamin D3"],
    prescriptionFiles: ["mri_report_nov2025.pdf", "prescription_nov2025.pdf"],
    status: "completed",
    notes: [
      { id: "n3", date: "2025-11-05", content: "MRI confirms mild disc bulge at L4-L5. No surgical intervention needed.", type: "diagnosis" },
      { id: "n4", date: "2025-12-20", content: "Patient reports significant improvement. Discharged from active care.", type: "observation" },
    ],
    avatarInitials: "RM",
  },
  {
    id: "3",
    doctorName: "Dr. Priya Nair",
    specialization: "Dermatologist",
    hospital: "Max Healthcare, Bangalore",
    hospitalVerified: true,
    doctorVerified: false,
    consultationDate: "2026-01-12",
    diagnosis: "Chronic eczema on forearms. Topical corticosteroid therapy initiated.",
    medicines: ["Mometasone Furoate cream", "Cetirizine 10mg"],
    prescriptionFiles: ["prescription_jan2026.pdf"],
    status: "follow-up",
    notes: [
      { id: "n5", date: "2026-01-12", content: "Moderate eczema flare. Prescribed topical steroid for 2 weeks.", type: "observation" },
      { id: "n6", date: "2026-02-10", content: "Follow-up required to assess steroid response and switch to maintenance therapy.", type: "follow-up" },
    ],
    avatarInitials: "PN",
  },
  {
    id: "4",
    doctorName: "Dr. Vikram Desai",
    specialization: "General Physician",
    hospital: "City Clinic, Pune",
    hospitalVerified: false,
    doctorVerified: true,
    licenseId: "MCI-91023",
    consultationDate: "2025-08-22",
    diagnosis: "Seasonal viral fever with throat infection. Symptomatic treatment given.",
    medicines: ["Paracetamol 500mg", "Azithromycin 500mg", "Cough Syrup"],
    prescriptionFiles: [],
    status: "completed",
    notes: [
      { id: "n7", date: "2025-08-22", content: "Fever 101°F. Throat congestion. Started antibiotics for 3 days.", type: "diagnosis" },
    ],
    avatarInitials: "VD",
  },
];

/* ─── Status helpers ─── */
const statusConfig: Record<Treatment["status"], { label: string; icon: React.ReactNode; className: string }> = {
  ongoing: {
    label: "Ongoing Treatment",
    icon: <Clock className="h-3.5 w-3.5" />,
    className: "bg-primary/15 text-primary border-primary/30",
  },
  completed: {
    label: "Completed",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    className: "bg-accent/15 text-accent border-accent/30",
  },
  "follow-up": {
    label: "Follow-up Required",
    icon: <AlertTriangle className="h-3.5 w-3.5" />,
    className: "bg-[hsl(38_92%_50%)]/15 text-[hsl(38_92%_40%)] border-[hsl(38_92%_50%)]/30",
  },
};

const noteTypeColors: Record<DoctorNote["type"], string> = {
  observation: "bg-secondary text-secondary-foreground",
  "follow-up": "bg-primary/10 text-primary",
  diagnosis: "bg-accent/10 text-accent",
};

/* ─── Component ─── */
const DoctorNetwork = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [newNote, setNewNote] = useState("");
  const [filter, setFilter] = useState<"all" | Treatment["status"]>("all");

  const filtered = filter === "all" ? treatments : treatments.filter((t) => t.status === filter);

  const toggle = (id: string) => setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
          <Stethoscope className="h-6 w-6 text-primary" />
          Doctor Network & Treatment History
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Complete record of your consultations, treatments, and prescriptions across all doctors.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Doctors", value: treatments.length, icon: <Stethoscope className="h-4 w-4 text-primary" /> },
          { label: "Ongoing", value: treatments.filter((t) => t.status === "ongoing").length, icon: <Clock className="h-4 w-4 text-primary" /> },
          { label: "Completed", value: treatments.filter((t) => t.status === "completed").length, icon: <CheckCircle2 className="h-4 w-4 text-accent" /> },
          { label: "Follow-ups", value: treatments.filter((t) => t.status === "follow-up").length, icon: <AlertTriangle className="h-4 w-4 text-[hsl(38_92%_50%)]" /> },
        ].map((s) => (
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

      {/* Filter Tabs */}
      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="follow-up">Follow-up</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Timeline */}
      <div className="relative">
        {/* vertical line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border hidden sm:block" />

        <div className="space-y-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((t) => {
              const expanded = expandedId === t.id;
              const sc = statusConfig[t.status];

              return (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="relative sm:pl-12"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[13px] top-6 h-3.5 w-3.5 rounded-full border-2 border-primary bg-card hidden sm:block" />

                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    {/* Main row */}
                    <button
                      type="button"
                      className="w-full text-left"
                      onClick={() => toggle(t.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                          {/* Avatar */}
                          <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-sm shrink-0">
                            {t.avatarInitials}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <CardTitle className="text-base">{t.doctorName}</CardTitle>
                              {t.doctorVerified && (
                                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                                  <BadgeCheck className="h-4 w-4" /> Verified
                                </span>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                              <span className="flex items-center gap-1"><Activity className="h-3 w-3" />{t.specialization}</span>
                              <span className="flex items-center gap-1">
                                <Building2 className="h-3 w-3" />{t.hospital}
                                {t.hospitalVerified && <ShieldCheck className="h-3 w-3 text-accent" />}
                              </span>
                              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(t.consultationDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <Badge variant="outline" className={`${sc.className} gap-1 text-[11px] border`}>
                              {sc.icon}{sc.label}
                            </Badge>
                            {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                          </div>
                        </div>
                      </CardHeader>
                    </button>

                    <AnimatePresence>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <CardContent className="pt-0 space-y-5">
                            {/* Verification */}
                            {(t.doctorVerified || t.hospitalVerified) && (
                              <div className="flex flex-wrap gap-3 p-3 rounded-lg bg-secondary/60">
                                {t.doctorVerified && (
                                  <span className="flex items-center gap-1.5 text-xs text-secondary-foreground">
                                    <BadgeCheck className="h-4 w-4 text-primary" /> Doctor Verified
                                    {t.licenseId && <span className="text-muted-foreground">• License {t.licenseId}</span>}
                                  </span>
                                )}
                                {t.hospitalVerified && (
                                  <span className="flex items-center gap-1.5 text-xs text-secondary-foreground">
                                    <ShieldCheck className="h-4 w-4 text-accent" /> Hospital Verified
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Diagnosis */}
                            <div>
                              <p className="text-xs font-medium text-muted-foreground mb-1">Diagnosis</p>
                              <p className="text-sm text-foreground">{t.diagnosis}</p>
                            </div>

                            {/* Medicines */}
                            <div>
                              <p className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1"><Pill className="h-3 w-3" /> Prescribed Medicines</p>
                              <div className="flex flex-wrap gap-2">
                                {t.medicines.map((m) => (
                                  <Badge key={m} variant="secondary" className="text-xs font-normal">{m}</Badge>
                                ))}
                              </div>
                            </div>

                            {/* Prescription files */}
                            {t.prescriptionFiles.length > 0 && (
                              <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1"><FileText className="h-3 w-3" /> Prescription Files</p>
                                <div className="flex flex-wrap gap-2">
                                  {t.prescriptionFiles.map((f) => (
                                    <button key={f} className="flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs text-foreground hover:bg-secondary transition-colors">
                                      <FileText className="h-3.5 w-3.5 text-primary" />{f}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Doctor Notes */}
                            <div>
                              <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1"><MessageSquare className="h-3 w-3" /> Doctor Notes</p>
                              <div className="space-y-2">
                                {t.notes.map((n) => (
                                  <div key={n.id} className="flex gap-3 items-start">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-[11px] text-muted-foreground">{new Date(n.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                                        <Badge variant="outline" className={`${noteTypeColors[n.type]} text-[10px] px-1.5 py-0 border-0`}>
                                          {n.type}
                                        </Badge>
                                      </div>
                                      <p className="text-sm text-foreground">{n.content}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Add note */}
                            <div className="border-t border-border pt-4 space-y-3">
                              <p className="text-xs font-medium text-muted-foreground">Add a note or update</p>
                              <Textarea
                                placeholder="Write treatment notes, observations, or follow-up recommendations…"
                                className="min-h-[70px] text-sm"
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                              />
                              <div className="flex flex-wrap gap-2">
                                <Button
                                  size="sm"
                                  className="gap-1.5"
                                  onClick={() => {
                                    if (!newNote.trim()) return;
                                    toast.success("Note added successfully");
                                    setNewNote("");
                                  }}
                                >
                                  <Plus className="h-3.5 w-3.5" /> Add Note
                                </Button>
                                <Button size="sm" variant="outline" className="gap-1.5">
                                  <Upload className="h-3.5 w-3.5" /> Attach File
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DoctorNetwork;
