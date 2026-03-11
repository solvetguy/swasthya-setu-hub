import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, QrCode } from "lucide-react";

const emergencyData = {
  name: "Rahul Sharma",
  bloodGroup: "B+",
  allergies: "Penicillin, Dust",
  chronicDiseases: "Type 2 Diabetes",
  emergencyContact: "+91 98765 43210",
  emergencyName: "Priya Sharma",
};

const EmergencyQR = () => {
  const qrValue = JSON.stringify(emergencyData);

  const handleDownload = () => {
    const svg = document.getElementById("emergency-qr");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = 300; canvas.height = 300;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      const a = document.createElement("a");
      a.download = "emergency-qr.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Emergency QR Code</h1>
        <p className="text-sm text-muted-foreground">Your critical health info accessible via QR scan</p>
      </div>

      <Card>
        <CardContent className="p-8 flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center mb-6">
            <QrCode className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="p-4 bg-card rounded-2xl border border-border shadow-[var(--card-shadow)] mb-6">
            <QRCodeSVG id="emergency-qr" value={qrValue} size={220} level="H" />
          </div>
          <Button onClick={handleDownload} className="gap-2 hero-gradient text-primary-foreground">
            <Download className="h-4 w-4" /> Download QR Code
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5 space-y-3">
          <h3 className="font-heading font-semibold text-sm text-foreground">Emergency Information</h3>
          {Object.entries(emergencyData).map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm">
              <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
              <span className="font-medium text-foreground">{value}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyQR;
