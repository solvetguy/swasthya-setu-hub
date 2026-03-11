import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Users, Plus, User, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface FamilyMember { id: number; name: string; relation: string; age: string; bloodGroup: string; }

const FamilyProfiles = () => {
  const [members, setMembers] = useState<FamilyMember[]>([
    { id: 1, name: "Priya Sharma", relation: "Spouse", age: "30", bloodGroup: "A+" },
    { id: 2, name: "Aarav Sharma", relation: "Son", age: "8", bloodGroup: "B+" },
    { id: 3, name: "Meera Sharma", relation: "Mother", age: "60", bloodGroup: "O+" },
  ]);
  const [form, setForm] = useState({ name: "", relation: "", age: "", bloodGroup: "" });
  const [showForm, setShowForm] = useState(false);

  const add = () => {
    if (!form.name || !form.relation) { toast.error("Fill name and relation"); return; }
    setMembers(m => [...m, { ...form, id: Date.now() }]);
    setForm({ name: "", relation: "", age: "", bloodGroup: "" });
    setShowForm(false);
    toast.success("Family member added!");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Family Profiles</h1>
          <p className="text-sm text-muted-foreground">Manage health records for your family</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2 hero-gradient text-primary-foreground">
          <Plus className="h-4 w-4" /> Add Member
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardContent className="p-5 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label className="text-foreground">Name</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
              <div><Label className="text-foreground">Relation</Label><Input value={form.relation} onChange={e => setForm(f => ({ ...f, relation: e.target.value }))} placeholder="e.g. Son, Mother" /></div>
              <div><Label className="text-foreground">Age</Label><Input value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} /></div>
              <div><Label className="text-foreground">Blood Group</Label><Input value={form.bloodGroup} onChange={e => setForm(f => ({ ...f, bloodGroup: e.target.value }))} /></div>
            </div>
            <Button onClick={add}>Save Member</Button>
          </CardContent>
        </Card>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map(m => (
          <Card key={m.id} className="hover:shadow-[var(--card-shadow-hover)] transition-all">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <Button size="icon" variant="ghost" onClick={() => { setMembers(ms => ms.filter(x => x.id !== m.id)); toast.info("Member removed"); }}>
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
              <h3 className="font-heading font-semibold text-foreground">{m.name}</h3>
              <p className="text-xs text-muted-foreground">{m.relation} • Age {m.age} • {m.bloodGroup}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FamilyProfiles;
