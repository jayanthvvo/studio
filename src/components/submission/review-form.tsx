"use client";

import { Submission } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ReviewForm({ submission }: { submission: Submission }) {
  const [feedback, setFeedback] = useState(submission.feedback || "");
  const [grade, setGrade] = useState(submission.grade || "");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd call an API to save this data.
    // For now, we'll just show a toast notification.
    console.log({
      submissionId: submission.id,
      feedback,
      grade,
    });
    toast({
      title: "Review Saved!",
      description: "Your feedback and grade have been saved successfully.",
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="feedback">Feedback</Label>
        <Textarea
          id="feedback"
          placeholder="Provide detailed feedback for the student..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={8}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="grade">Grade</Label>
        <Input
          id="grade"
          placeholder="e.g., A-, B+"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
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
