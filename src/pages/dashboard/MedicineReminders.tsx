import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Bell, Plus, Trash2, Clock } from "lucide-react";
import { toast } from "sonner";

interface Reminder {
  id: number; medicine: string; dosage: string; time: string; startDate: string; endDate: string;
}

const MedicineReminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 1, medicine: "Metformin", dosage: "500mg", time: "08:00", startDate: "2026-03-01", endDate: "2026-06-01" },
    { id: 2, medicine: "Vitamin D3", dosage: "1000 IU", time: "09:00", startDate: "2026-02-15", endDate: "2026-05-15" },
    { id: 3, medicine: "Amlodipine", dosage: "5mg", time: "21:00", startDate: "2026-01-01", endDate: "2026-12-31" },
  ]);
  const [form, setForm] = useState({ medicine: "", dosage: "", time: "", startDate: "", endDate: "" });
  const [showForm, setShowForm] = useState(false);

  const addReminder = () => {
    if (!form.medicine || !form.time) { toast.error("Fill medicine and time"); return; }
    setReminders(r => [...r, { ...form, id: Date.now() }]);
    setForm({ medicine: "", dosage: "", time: "", startDate: "", endDate: "" });
    setShowForm(false);
    toast.success("Reminder added!");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Medicine Reminders</h1>
          <p className="text-sm text-muted-foreground">Never miss a dose</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2 hero-gradient text-primary-foreground">
          <Plus className="h-4 w-4" /> Add Reminder
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardContent className="p-5 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label className="text-foreground">Medicine Name</Label><Input value={form.medicine} onChange={e => setForm(f => ({ ...f, medicine: e.target.value }))} placeholder="e.g. Metformin" /></div>
              <div><Label className="text-foreground">Dosage</Label><Input value={form.dosage} onChange={e => setForm(f => ({ ...f, dosage: e.target.value }))} placeholder="e.g. 500mg" /></div>
              <div><Label className="text-foreground">Time</Label><Input type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} /></div>
              <div><Label className="text-foreground">Start Date</Label><Input type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} /></div>
              <div><Label className="text-foreground">End Date</Label><Input type="date" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} /></div>
            </div>
            <Button onClick={addReminder}>Save Reminder</Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {reminders.map(r => (
          <Card key={r.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">{r.medicine} — {r.dosage}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{r.time} • {r.startDate} to {r.endDate}</p>
                </div>
              </div>
              <Button size="icon" variant="ghost" onClick={() => { setReminders(rs => rs.filter(x => x.id !== r.id)); toast.info("Reminder removed"); }}>
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MedicineReminders;
