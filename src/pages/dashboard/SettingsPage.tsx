import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const SettingsPage = () => (
  <div className="space-y-6 max-w-2xl">
    <div>
      <h1 className="text-2xl font-heading font-bold text-foreground">Settings</h1>
      <p className="text-sm text-muted-foreground">Manage your account preferences</p>
    </div>

    <Card>
      <CardHeader><CardTitle className="text-sm">Account</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div><Label className="text-foreground">Email</Label><Input value="rahul@example.com" readOnly className="bg-muted" /></div>
        <div><Label className="text-foreground">New Password</Label><Input type="password" placeholder="••••••••" /></div>
        <Button onClick={() => toast.success("Settings saved!")}>Update Account</Button>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle className="text-sm">Notifications</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div><p className="text-sm text-foreground">Medicine Reminders</p><p className="text-xs text-muted-foreground">Get notified for medicine times</p></div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div><p className="text-sm text-foreground">Report Uploads</p><p className="text-xs text-muted-foreground">Confirm when reports are uploaded</p></div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div><p className="text-sm text-foreground">Shared Access Alerts</p><p className="text-xs text-muted-foreground">Alert when someone views your records</p></div>
          <Switch />
        </div>
      </CardContent>
    </Card>
  </div>
);

export default SettingsPage;
