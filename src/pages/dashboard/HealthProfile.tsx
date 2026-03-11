import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User, Droplets, AlertTriangle, Phone, MapPin, Stethoscope } from "lucide-react";

const HealthProfile = () => {
  const [profile, setProfile] = useState({
    name: "Rahul Sharma", age: "32", bloodGroup: "B+",
    allergies: "Penicillin, Dust", chronicDiseases: "Type 2 Diabetes",
    emergencyContact: "+91 98765 43210", emergencyName: "Priya Sharma",
    address: "Mumbai, Maharashtra", doctorName: "Dr. Anil Gupta",
    doctorPhone: "+91 98765 12345",
  });

  const update = (k: string, v: string) => setProfile(p => ({ ...p, [k]: v }));

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Health Profile</h1>
        <p className="text-sm text-muted-foreground">Manage your personal health information</p>
      </div>

      {/* Profile Summary Card */}
      <Card className="hero-gradient text-primary-foreground">
        <CardContent className="p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <User className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold">{profile.name}</h2>
            <p className="text-sm opacity-80">Age: {profile.age} • Blood Group: {profile.bloodGroup}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm flex items-center gap-2"><User className="h-4 w-4 text-primary" />Personal Info</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div><Label className="text-foreground">Full Name</Label><Input value={profile.name} onChange={e => update("name", e.target.value)} /></div>
            <div><Label className="text-foreground">Age</Label><Input value={profile.age} onChange={e => update("age", e.target.value)} /></div>
            <div><Label className="text-foreground">Blood Group</Label><Input value={profile.bloodGroup} onChange={e => update("bloodGroup", e.target.value)} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-primary" />Medical Info</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div><Label className="text-foreground">Allergies</Label><Input value={profile.allergies} onChange={e => update("allergies", e.target.value)} /></div>
            <div><Label className="text-foreground">Chronic Diseases</Label><Input value={profile.chronicDiseases} onChange={e => update("chronicDiseases", e.target.value)} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm flex items-center gap-2"><Phone className="h-4 w-4 text-primary" />Emergency Contact</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div><Label className="text-foreground">Contact Name</Label><Input value={profile.emergencyName} onChange={e => update("emergencyName", e.target.value)} /></div>
            <div><Label className="text-foreground">Phone</Label><Input value={profile.emergencyContact} onChange={e => update("emergencyContact", e.target.value)} /></div>
            <div><Label className="text-foreground">Address</Label><Input value={profile.address} onChange={e => update("address", e.target.value)} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm flex items-center gap-2"><Stethoscope className="h-4 w-4 text-primary" />Doctor Details</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div><Label className="text-foreground">Doctor Name</Label><Input value={profile.doctorName} onChange={e => update("doctorName", e.target.value)} /></div>
            <div><Label className="text-foreground">Doctor Phone</Label><Input value={profile.doctorPhone} onChange={e => update("doctorPhone", e.target.value)} /></div>
          </CardContent>
        </Card>
      </div>

      <Button className="hero-gradient text-primary-foreground" onClick={() => toast.success("Profile saved!")}>Save Profile</Button>
    </div>
  );
};

export default HealthProfile;
