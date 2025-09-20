
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
import { SheetHeader, SheetTitle } from "../ui/sheet";

interface ChatInterfaceProps {
    perspective: 'student' | 'supervisor';
}

export function ChatInterface({ perspective = 'supervisor' }: ChatInterfaceProps) {
  const [messages, setMessages] = useState(initialMessages);
  const studentAvatar = PlaceHolderImages.find(p => p.id === 'avatar-1')?.imageUrl ?? "https://picsum.photos/seed/1/100/100";
  const supervisorAvatar = PlaceHolderImages.find(p => p.id === 'supervisor-avatar')?.imageUrl ?? "https://picsum.photos/seed/5/100/100";

  const selfSender = perspective;
  const otherParty = perspective === 'supervisor' ? { name: 'Alice Johnson', avatar: studentAvatar, fallback: 'AJ', hint: 'woman portrait' } : { name: 'Dr. Evelyn Reed', avatar: supervisorAvatar, fallback: 'S', hint: 'professor portrait' };

  return (
    <div className="flex flex-col h-full">
      <SheetHeader className="p-4 border-b">
        <div className="flex items-center">
            <Avatar className="h-9 w-9 mr-4">
                <AvatarImage src={otherParty.avatar} alt={otherParty.name} data-ai-hint={otherParty.hint} />
                <AvatarFallback>{otherParty.fallback}</AvatarFallback>
            </Avatar>
            <SheetTitle>{otherParty.name}</SheetTitle>
        </div>
      </SheetHeader>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-end gap-2",
                message.sender === selfSender ? "justify-end" : ""
              )}
            >
              {message.sender !== selfSender && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={otherParty.avatar} alt={otherParty.name} data-ai-hint={otherParty.hint} />
                  <AvatarFallback>{otherParty.fallback}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-[70%] rounded-lg p-3 text-sm",
                  message.sender === selfSender
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p>{message.text}</p>
                <p className={cn("text-xs mt-1 text-right", message.sender === selfSender ? 'text-primary-foreground/70' : 'text-muted-foreground')}>{message.timestamp}</p>
              </div>
              {message.sender === selfSender && (
                <Avatar className="h-8 w-8">
                  {selfSender === 'student' ? (
                    <AvatarImage src={studentAvatar} alt="Student" data-ai-hint="woman portrait" />
                  ) : (
                    <AvatarImage src={supervisorAvatar} alt="Supervisor" data-ai-hint="professor portrait" />
                  )}
                  <AvatarFallback>{selfSender === 'student' ? 'AJ' : 'S'}</AvatarFallback>
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
