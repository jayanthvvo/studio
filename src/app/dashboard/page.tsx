"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { submissions as initialSubmissions } from "@/lib/data";
import { SubmissionsTable } from "@/components/dashboard/submissions-table";
import { AddSubmissionDialog } from "@/components/submission/add-submission-dialog";
import { useState } from "react";
import type { Submission } from "@/lib/types";

export default function Dashboard() {
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);

  const handleAddSubmission = (newSubmission: Omit<Submission, 'id' | 'status' | 'grade' | 'submittedAt' | 'feedback' >) => {
    const newSubmissionWithDefaults: Submission = {
      ...newSubmission,
      id: (submissions.length + 1).toString(),
      status: 'Pending',
      grade: null,
      submittedAt: new Date().toISOString().split('T')[0],
      feedback: null,
    };
    setSubmissions(prev => [newSubmissionWithDefaults, ...prev]);
    setAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold font-headline">Submissions Dashboard</h1>
          <p className="text-muted-foreground">Track and manage all student dissertations.</p>
        </div>
        <Button onClick={() => setAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Submission
        </Button>
      </div>

      <AddSubmissionDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAddSubmission={handleAddSubmission}
      />

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
