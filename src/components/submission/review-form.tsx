"use client";

import { Submission } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";

export default function ReviewForm({ submission }: { submission: Submission }) {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="feedback">Feedback</Label>
        <Textarea
          id="feedback"
          placeholder="Provide detailed feedback for the student..."
          defaultValue={submission.feedback || ""}
          rows={8}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="grade">Grade</Label>
        <Input
          id="grade"
          placeholder="e.g., A-, B+"
          defaultValue={submission.grade || ""}
          className="max-w-xs"
        />
      </div>
      <Button type="submit">
        <Save className="mr-2 h-4 w-4" />
        Save Review
      </Button>
    </form>
  );
}
