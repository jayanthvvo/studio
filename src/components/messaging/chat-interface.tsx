"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { messages as initialMessages } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Separator } from "../ui/separator";

export function ChatInterface() {
  const [messages, setMessages] = useState(initialMessages);
  const studentAvatar = PlaceHolderImages.find(p => p.id === 'avatar-1')?.imageUrl ?? "https://picsum.photos/seed/1/100/100";
  const supervisorAvatar = PlaceHolderImages.find(p => p.id === 'supervisor-avatar')?.imageUrl ?? "https://picsum.photos/seed/5/100/100";

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b">
        <Avatar className="h-9 w-9 mr-4">
          <AvatarImage src={studentAvatar} alt="Alice Johnson" data-ai-hint="woman portrait" />
          <AvatarFallback>AJ</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold">Alice Johnson</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-end gap-2",
                message.sender === "supervisor" ? "justify-end" : ""
              )}
            >
              {message.sender === "student" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={studentAvatar} alt="Student" data-ai-hint="woman portrait" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-[70%] rounded-lg p-3 text-sm",
                  message.sender === "supervisor"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p>{message.text}</p>
                <p className={cn("text-xs mt-1 text-right", message.sender === 'supervisor' ? 'text-primary-foreground/70' : 'text-muted-foreground')}>{message.timestamp}</p>
              </div>
              {message.sender === "supervisor" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={supervisorAvatar} alt="Supervisor" data-ai-hint="professor portrait" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-background">
        <form className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <SendHorizonal className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
