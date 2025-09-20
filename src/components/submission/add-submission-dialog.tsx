"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Submission } from "@/lib/types";

type AddSubmissionDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAddSubmission: (newSubmission: Omit<Submission, 'id' | 'status' | 'grade' | 'submittedAt' | 'feedback' | 'student'> & { student: { name: string, avatarUrl: string } }) => void;
};

export function AddSubmissionDialog({
  isOpen,
  onOpenChange,
  onAddSubmission,
}: AddSubmissionDialogProps) {
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newSubmission = {
      title: formData.get("title") as string,
      student: {
        name: formData.get("studentName") as string,
        avatarUrl: `https://picsum.photos/seed/${Math.random()}/100/100`,
      },
      deadline: formData.get("deadline") as string,
      content: formData.get("content") as string,
    };
    onAddSubmission(newSubmission);
  };


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
            <DialogHeader>
            <DialogTitle>Add New Submission</DialogTitle>
            <DialogDescription>
                Enter the details for the new dissertation submission.
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                Title
                </Label>
                <Input id="title" name="title" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="studentName" className="text-right">
                Student Name
                </Label>
                <Input id="studentName" name="studentName" className="col-span-3" required />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deadline" className="text-right">
                Deadline
                </Label>
                <Input id="deadline" name="deadline" type="date" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                Content
                </Label>
                <Textarea id="content" name="content" className="col-span-3" rows={5} required />
            </div>
            </div>
            <DialogFooter>
            <Button type="submit">Add Submission</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
