import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { submissions } from "@/lib/data";
import { SubmissionsTable } from "@/components/dashboard/submissions-table";

export default function Dashboard() {
  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold font-headline">Submissions Dashboard</h1>
            <p className="text-muted-foreground">Track and manage all student dissertations.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Submission
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
          <CardDescription>
            An overview of the latest dissertation drafts and proposals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SubmissionsTable submissions={submissions} />
        </CardContent>
      </Card>
    </div>
  );
}
