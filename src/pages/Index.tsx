import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { LoadingDots } from "@/components/LoadingDots";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "Welcome! I'm an AI assistant powered by XAI. How can I help you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    setMessages((prev) => [...prev, { role: "user", content }]);
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simulate AI response
      const response = "This is a simulated response. Replace this with actual API integration.";
      
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-background">
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            {...message}
            animate={index === messages.length - 1}
          />
        ))}
        {isLoading && (
          <div className="bg-chat-assistant w-fit p-4 rounded-lg">
            <LoadingDots />
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>
      <ChatInput onSend={handleSendMessage} disabled={isLoading} />
    </div>
  );
};

export default Index;