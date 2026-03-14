import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Users, Plus, User, Trash2, Heart, Droplets, AlertCircle,
  Phone, Edit2, ArrowRight, ShieldCheck, Activity, Brain,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

/* ─── Types ─── */
interface FamilyMember {
  id: number;
  name: string;
  relation: string;
  age: string;
  bloodGroup: string;
  allergies: string;
  chronicDiseases: string;
  emergencyContact: string;
  conditions: string[];
  doctorAccessEnabled: boolean;
}

interface HealthInsight {
  id: string;
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
  icon: React.ReactNode;
}

/* ─── Mock data ─── */
const initialMembers: FamilyMember[] = [
  {
    id: 1, name: "Priya Sharma", relation: "Spouse", age: "30", bloodGroup: "A+",
    allergies: "Penicillin", chronicDiseases: "None", emergencyContact: "+91 98765 43210",
    conditions: ["Mild Asthma"], doctorAccessEnabled: true,
  },
  {
    id: 2, name: "Aarav Sharma", relation: "Son", age: "8", bloodGroup: "B+",
    allergies: "None", chronicDiseases: "None", emergencyContact: "+91 98765 43210",
    conditions: [], doctorAccessEnabled: false,
  },
  {
    id: 3, name: "Meera Sharma", relation: "Mother", age: "60", bloodGroup: "O+",
    allergies: "Sulfa drugs", chronicDiseases: "Type 2 Diabetes, Hypertension", emergencyContact: "+91 91234 56789",
    conditions: ["Type 2 Diabetes", "Hypertension"], doctorAccessEnabled: true,
  },
];

const familyInsights: HealthInsight[] = [
  { id: "1", title: "Diabetes Risk", description: "Family history of Type 2 Diabetes detected (Mother). Regular screening recommended for all members.", severity: "high", icon: <Activity className="h-5 w-5" /> },
  { id: "2", title: "Hypertension History", description: "Hypertension present in family. Lifestyle monitoring advised for members above 30.", severity: "medium", icon: <Heart className="h-5 w-5" /> },
  { id: "3", title: "Blood Group Compatibility", description: "Family has mixed blood groups (A+, B+, O+). Important for emergency transfusion planning.", severity: "low", icon: <Droplets className="h-5 w-5" /> },
  { id: "4", title: "Allergy Awareness", description: "Multiple drug allergies detected (Penicillin, Sulfa). Ensure all treating doctors are informed.", severity: "medium", icon: <AlertCircle className="h-5 w-5" /> },
];

const severityColors: Record<HealthInsight["severity"], string> = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-[hsl(38_92%_50%)]/10 text-[hsl(38_92%_40%)] border-[hsl(38_92%_50%)]/20",
  low: "bg-accent/10 text-accent border-accent/20",
};

const emptyForm = { name: "", relation: "", age: "", bloodGroup: "", allergies: "", chronicDiseases: "", emergencyContact: "" };

/* ─── Component ─── */
const FamilyProfiles = () => {
  const [members, setMembers] = useState<FamilyMember[]>(initialMembers);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [tab, setTab] = useState<"profiles" | "insights">("profiles");

  const add = () => {
    if (!form.name || !form.relation) { toast.error("Name and relation are required"); return; }
    setMembers(m => [...m, {
      ...form, id: Date.now(),
      conditions: form.chronicDiseases ? form.chronicDiseases.split(",").map(s => s.trim()).filter(Boolean) : [],
      doctorAccessEnabled: false,
    }]);
    setForm(emptyForm);
    setShowForm(false);
    toast.success("Family member added!");
  };

  const removeMember = (id: number) => {
    setMembers(ms => ms.filter(x => x.id !== id));
    toast.info("Member removed");
  };

  const toggleDoctorAccess = (id: number) => {
    setMembers(ms => ms.map(m => m.id === id ? { ...m, doctorAccessEnabled: !m.doctorAccessEnabled } : m));
    toast.success("Doctor access updated");
  };

  const relationColors: Record<string, string> = {
    Spouse: "bg-primary/10 text-primary",
    Son: "bg-accent/10 text-accent",
    Daughter: "bg-accent/10 text-accent",
    Mother: "bg-[hsl(38_92%_50%)]/10 text-[hsl(38_92%_40%)]",
    Father: "bg-[hsl(38_92%_50%)]/10 text-[hsl(38_92%_40%)]",
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" /> Family Health Network
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Manage health profiles and records for your family members.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2 hero-gradient text-primary-foreground">
          <Plus className="h-4 w-4" /> Add Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Family Members", value: members.length, icon: <Users className="h-4 w-4 text-primary" /> },
          { label: "With Conditions", value: members.filter(m => m.conditions.length > 0).length, icon: <AlertCircle className="h-4 w-4 text-[hsl(38_92%_50%)]" /> },
          { label: "Doctor Access On", value: members.filter(m => m.doctorAccessEnabled).length, icon: <ShieldCheck className="h-4 w-4 text-accent" /> },
          { label: "Health Insights", value: familyInsights.length, icon: <Brain className="h-4 w-4 text-primary" /> },
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

      {/* Tab toggle */}
      <div className="flex gap-2">
        <Button size="sm" variant={tab === "profiles" ? "default" : "outline"} onClick={() => setTab("profiles")}>
          <User className="h-3.5 w-3.5 mr-1.5" /> Profiles
        </Button>
        <Button size="sm" variant={tab === "insights" ? "default" : "outline"} onClick={() => setTab("insights")}>
          <Brain className="h-3.5 w-3.5 mr-1.5" /> Health Insights
        </Button>
      </div>

      {/* Add form */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <Card>
              <CardContent className="p-5 space-y-4">
                <h3 className="font-heading font-semibold text-foreground text-sm">Add Family Member</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><Label className="text-foreground text-xs">Name *</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" /></div>
                  <div>
                    <Label className="text-foreground text-xs">Relationship *</Label>
                    <Select value={form.relation} onValueChange={v => setForm(f => ({ ...f, relation: v }))}>
                      <SelectTrigger><SelectValue placeholder="Select relation" /></SelectTrigger>
                      <SelectContent>
                        {["Spouse", "Father", "Mother", "Son", "Daughter", "Sibling", "Other"].map(r => (
                          <SelectItem key={r} value={r}>{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div><Label className="text-foreground text-xs">Age</Label><Input value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} placeholder="Age" /></div>
                  <div><Label className="text-foreground text-xs">Blood Group</Label><Input value={form.bloodGroup} onChange={e => setForm(f => ({ ...f, bloodGroup: e.target.value }))} placeholder="e.g. A+" /></div>
                  <div><Label className="text-foreground text-xs">Allergies</Label><Input value={form.allergies} onChange={e => setForm(f => ({ ...f, allergies: e.target.value }))} placeholder="e.g. Penicillin" /></div>
                  <div><Label className="text-foreground text-xs">Chronic Diseases</Label><Input value={form.chronicDiseases} onChange={e => setForm(f => ({ ...f, chronicDiseases: e.target.value }))} placeholder="Comma separated" /></div>
                  <div className="sm:col-span-2"><Label className="text-foreground text-xs">Emergency Contact</Label><Input value={form.emergencyContact} onChange={e => setForm(f => ({ ...f, emergencyContact: e.target.value }))} placeholder="+91 XXXXX XXXXX" /></div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={add}>Save Member</Button>
                  <Button variant="outline" onClick={() => { setShowForm(false); setForm(emptyForm); }}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profiles */}
      {tab === "profiles" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {members.map(m => (
              <motion.div key={m.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}>
                <Card className="hover:shadow-[var(--card-shadow-hover)] transition-all group h-full">
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-foreground text-sm">{m.name}</h3>
                          <Badge variant="outline" className={`${relationColors[m.relation] || "bg-secondary text-secondary-foreground"} text-[10px] border-0 mt-0.5`}>
                            {m.relation}
                          </Badge>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => removeMember(m.id)}>
                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div className="p-2 rounded-md bg-secondary">
                        <span className="text-muted-foreground">Age</span>
                        <p className="font-semibold text-foreground">{m.age || "—"}</p>
                      </div>
                      <div className="p-2 rounded-md bg-secondary">
                        <span className="text-muted-foreground">Blood</span>
                        <p className="font-semibold text-foreground">{m.bloodGroup || "—"}</p>
                      </div>
                    </div>

                    {m.conditions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {m.conditions.map(c => (
                          <Badge key={c} variant="outline" className="text-[10px] bg-destructive/5 text-destructive border-destructive/20">{c}</Badge>
                        ))}
                      </div>
                    )}

                    {m.allergies && m.allergies !== "None" && (
                      <p className="text-[11px] text-muted-foreground mb-3 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 text-destructive" /> Allergies: {m.allergies}
                      </p>
                    )}

                    {/* Doctor access toggle */}
                    <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-medium text-foreground">Doctor Access</p>
                        <p className="text-[10px] text-muted-foreground">Share with connected doctors</p>
                      </div>
                      <Switch checked={m.doctorAccessEnabled} onCheckedChange={() => toggleDoctorAccess(m.id)} />
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="text-xs flex-1 h-7" onClick={() => setSelectedMember(m)}>
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs h-7 gap-1">
                        <ArrowRight className="h-3 w-3" /> Switch
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Health Insights */}
      {tab === "insights" && (
        <div className="grid sm:grid-cols-2 gap-4">
          {familyInsights.map((insight, i) => (
            <motion.div key={insight.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className={`border ${severityColors[insight.severity]} hover:shadow-md transition-all`}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-card flex items-center justify-center shrink-0 shadow-sm">
                      {insight.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-heading font-semibold text-sm">{insight.title}</h3>
                        <Badge variant="outline" className={`${severityColors[insight.severity]} text-[10px] border px-1.5`}>
                          {insight.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{insight.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Member Detail Dialog */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="max-w-md">
          {selectedMember && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User className="h-7 w-7" />
                  </div>
                  <div>
                    <DialogTitle>{selectedMember.name}</DialogTitle>
                    <DialogDescription>{selectedMember.relation} • Age {selectedMember.age}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-3 mt-2">
                {[
                  { label: "Blood Group", value: selectedMember.bloodGroup },
                  { label: "Allergies", value: selectedMember.allergies || "None" },
                  { label: "Chronic Diseases", value: selectedMember.chronicDiseases || "None" },
                  { label: "Emergency Contact", value: selectedMember.emergencyContact || "Not set" },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center p-3 rounded-lg bg-secondary">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-medium text-foreground">{item.value}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                  <span className="text-xs text-muted-foreground">Doctor Access</span>
                  <Badge variant="outline" className={selectedMember.doctorAccessEnabled ? "bg-accent/10 text-accent border-accent/20" : "bg-muted text-muted-foreground"}>
                    {selectedMember.doctorAccessEnabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FamilyProfiles;
