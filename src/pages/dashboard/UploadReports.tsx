import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileUp, X, FileText } from "lucide-react";
import { toast } from "sonner";

const UploadReports = () => {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [hospital, setHospital] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !category) { toast.error("Please add a file and category"); return; }
    toast.success("Report uploaded successfully!");
    setFile(null); setCategory(""); setDate(""); setHospital("");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Upload Reports</h1>
        <p className="text-sm text-muted-foreground">Upload your medical reports securely</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Drop Zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer ${dragOver ? "border-primary bg-secondary" : "border-border"}`}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          {file ? (
            <div className="flex items-center justify-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <button type="button" onClick={e => { e.stopPropagation(); setFile(null); }}>
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          ) : (
            <>
              <FileUp className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Drag & drop your file here or click to browse</p>
              <p className="text-xs text-muted-foreground mt-1">Supports PDF, JPG, PNG</p>
            </>
          )}
          <input id="file-input" type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={e => { if (e.target.files?.[0]) setFile(e.target.files[0]); }} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-foreground">Report Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1"><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Blood Test">Blood Test</SelectItem>
                <SelectItem value="Prescription">Prescription</SelectItem>
                <SelectItem value="Scan">Scan</SelectItem>
                <SelectItem value="Diagnosis">Diagnosis</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-foreground">Report Date</Label>
            <Input type="date" className="mt-1" value={date} onChange={e => setDate(e.target.value)} />
          </div>
        </div>

        <div>
          <Label className="text-foreground">Hospital / Clinic Name</Label>
          <Input placeholder="e.g. City Hospital" className="mt-1" value={hospital} onChange={e => setHospital(e.target.value)} />
        </div>

        <Button type="submit" className="hero-gradient text-primary-foreground gap-2">
          <Upload className="h-4 w-4" /> Upload Report
        </Button>
      </form>
    </div>
  );
};

export default UploadReports;
