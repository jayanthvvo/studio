"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMilestonesByStudent } from "@/lib/data";
import { Milestone } from "@/lib/types";
import { useState, useEffect } from "react";
import { CheckCircle, Clock, Circle } from 'lucide-react';
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const statusInfo = {
  Complete: { icon: CheckCircle, color: 'text-green-500' },
  Pending: { icon: Clock, color: 'text-yellow-500' },
  Upcoming: { icon: Circle, color: 'text-muted-foreground' },
};

export default function TimelinePage() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const studentName = "Alice Johnson"; // Hardcoded for this example

  useEffect(() => {
    setMilestones(getMilestonesByStudent(studentName));
  }, []);

  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4">
          <Image
            src="https://picsum.photos/seed/1/100/100"
            alt={studentName}
            width={64}
            height={64}
            className="rounded-full"
            data-ai-hint="student portrait"
          />
          <div>
            <h1 className="text-3xl font-bold font-headline">Dissertation Timeline</h1>
            <p className="text-muted-foreground">For {studentName}</p>
          </div>
        </div>

      <Card>
        <CardHeader>
          <CardTitle>Milestones</CardTitle>
          <CardDescription>
            A complete timeline of the dissertation process.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative pl-6">
            {/* Vertical line */}
            <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-border"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone) => {
                 const StatusIcon = statusInfo[milestone.status].icon;
                 const statusColor = statusInfo[milestone.status].color;

                return (
                  <div key={milestone.id} className="relative flex items-start">
                    {/* Status Icon */}
                    <div className="absolute left-0 top-1 flex items-center justify-center -translate-x-1/2">
                        <div className={cn("h-6 w-6 rounded-full bg-background flex items-center justify-center", milestone.status === 'Complete' ? 'text-primary' : 'text-muted-foreground')}>
                            <StatusIcon className={cn("h-8 w-8 p-1 rounded-full bg-background", statusColor)} />
                        </div>
                    </div>
                    
                    <div className="ml-12 w-full">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-lg">{milestone.title}</p>
                                <p className="text-sm text-muted-foreground">Due: {milestone.dueDate}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                {milestone.submissionId ? (
                                    <Button variant="outline" size="sm">View Submission</Button>
                                ) : (
                                    <Button variant="secondary" size="sm" disabled>No Submission</Button>
                                )}
                                {milestone.status === 'Pending' && <Button size="sm">Set Due Date</Button>}
                            </div>
                        </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
