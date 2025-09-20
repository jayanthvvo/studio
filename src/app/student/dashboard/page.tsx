"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { submissions as initialSubmissions } from "@/lib/data";
import { StudentSubmissionsTable } from "@/components/student/submissions-table";
import { useState } from "react";
import type { Submission } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function StudentDashboardPage() {
  // For this example, we'll filter submissions for a specific student.
  // In a real app, this would be based on the logged-in user.
  const [submissions, setSubmissions] = useState<Submission[]>(
    initialSubmissions.filter((s) => s.student.name === "Alice Johnson")
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold font-headline">My Submissions</h1>
          <p className="text-muted-foreground">
            Track and manage your dissertation drafts.
          </p>
        </div>
        <Button asChild>
          <Link href="/student/submissions/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Submission
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Submissions</CardTitle>
          <CardDescription>
            An overview of your dissertation drafts and proposals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StudentSubmissionsTable submissions={submissions} />
        </CardContent>
      </Card>
    </div>
  );
}
