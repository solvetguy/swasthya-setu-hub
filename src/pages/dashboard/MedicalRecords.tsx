import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileText, Search, Download, Eye, Calendar, Building } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockRecords = [
  { id: 1, name: "Complete Blood Count", type: "Blood Test", hospital: "City Hospital", date: "2026-03-05", file: "cbc_report.pdf" },
  { id: 2, name: "Chest X-Ray", type: "Scan", hospital: "Apollo Clinic", date: "2026-02-20", file: "xray.jpg" },
  { id: 3, name: "Diabetes Follow-up", type: "Prescription", hospital: "HealthFirst", date: "2026-02-10", file: "prescription.pdf" },
  { id: 4, name: "ECG Report", type: "Diagnosis", hospital: "Max Hospital", date: "2026-01-15", file: "ecg.pdf" },
  { id: 5, name: "Thyroid Panel", type: "Blood Test", hospital: "City Hospital", date: "2025-12-20", file: "thyroid.pdf" },
  { id: 6, name: "MRI Brain", type: "Scan", hospital: "Fortis", date: "2025-11-10", file: "mri.pdf" },
];

const MedicalRecords = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const filtered = mockRecords
    .filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.hospital.toLowerCase().includes(search.toLowerCase()))
    .filter(r => typeFilter === "all" || r.type === typeFilter)
    .sort((a, b) => sortBy === "date" ? b.date.localeCompare(a.date) : sortBy === "type" ? a.type.localeCompare(b.type) : a.hospital.localeCompare(b.hospital));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Medical Records</h1>
        <p className="text-sm text-muted-foreground">View and manage all your medical reports</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search records..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[150px]"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Blood Test">Blood Test</SelectItem>
            <SelectItem value="Prescription">Prescription</SelectItem>
            <SelectItem value="Scan">Scan</SelectItem>
            <SelectItem value="Diagnosis">Diagnosis</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[150px]"><SelectValue placeholder="Sort" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="type">Type</SelectItem>
            <SelectItem value="hospital">Hospital</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(r => (
          <Card key={r.id} className="hover:shadow-[var(--card-shadow-hover)] transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{r.type}</span>
              </div>
              <h3 className="font-heading font-semibold text-sm mb-2 text-foreground">{r.name}</h3>
              <div className="space-y-1 mb-4">
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Building className="h-3 w-3" />{r.hospital}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" />{r.date}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 gap-1"><Eye className="h-3 w-3" />View</Button>
                <Button size="sm" variant="outline" className="flex-1 gap-1"><Download className="h-3 w-3" />Download</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MedicalRecords;
