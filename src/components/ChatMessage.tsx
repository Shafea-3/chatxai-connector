import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  role: "user" | "assistant" | "system";
  animate?: boolean;
}

export const ChatMessage = ({ content, role, animate = true }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "px-4 py-2 rounded-lg max-w-[85%] text-sm leading-relaxed break-words",
        role === "user" && "bg-chat-user ml-auto",
        role === "assistant" && "bg-chat-assistant",
        role === "system" && "bg-muted text-muted-foreground text-xs italic w-full text-center",
        animate && "animate-message-fade-in opacity-0"
      )}
    >
      {content}
    </div>
  );
};