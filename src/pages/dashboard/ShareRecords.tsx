import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Share2, Link2, Clock, X, Copy } from "lucide-react";
import { toast } from "sonner";

interface SharedLink { id: number; doctor: string; expiry: string; link: string; created: string; }

const ShareRecords = () => {
  const [links, setLinks] = useState<SharedLink[]>([
    { id: 1, doctor: "Dr. Anil Gupta", expiry: "24 hours", link: "https://swasthyasetu.com/share/abc123", created: "Mar 10, 2026" },
  ]);
  const [doctor, setDoctor] = useState("");
  const [expiry, setExpiry] = useState("");

  const generate = () => {
    if (!doctor) { toast.error("Enter doctor name"); return; }
    const newLink: SharedLink = {
      id: Date.now(), doctor, expiry: expiry || "24 hours",
      link: `https://swasthyasetu.com/share/${Math.random().toString(36).slice(2, 8)}`,
      created: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setLinks(l => [newLink, ...l]);
    setDoctor(""); setExpiry("");
    toast.success("Share link generated!");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Share Records</h1>
        <p className="text-sm text-muted-foreground">Generate temporary access links for doctors</p>
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label className="text-foreground">Doctor Name</Label><Input placeholder="Dr. Name" value={doctor} onChange={e => setDoctor(e.target.value)} /></div>
            <div>
              <Label className="text-foreground">Expiry</Label>
              <Select value={expiry} onValueChange={setExpiry}>
                <SelectTrigger><SelectValue placeholder="Select expiry" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 hour">1 Hour</SelectItem>
                  <SelectItem value="24 hours">24 Hours</SelectItem>
                  <SelectItem value="7 days">7 Days</SelectItem>
                  <SelectItem value="30 days">30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={generate} className="gap-2 hero-gradient text-primary-foreground">
            <Link2 className="h-4 w-4" /> Generate Link
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {links.map(l => (
          <Card key={l.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Share2 className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm text-foreground">{l.doctor}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />Expires in {l.expiry} • {l.created}</p>
                  <p className="text-xs text-primary truncate">{l.link}</p>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button size="icon" variant="ghost" onClick={() => { navigator.clipboard.writeText(l.link); toast.success("Link copied!"); }}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => { setLinks(ls => ls.filter(x => x.id !== l.id)); toast.info("Access revoked"); }}>
                  <X className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShareRecords;
