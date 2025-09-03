import { QueueList } from "@/components/QueueList";
import { ChatPanel } from "@/components/ChatPanel";

const ChatPage = () => {
  return (
    <div className="h-full min-h-0 grid grid-cols-[1fr_2fr] gap-4">
      <QueueList />

      <ChatPanel />
    </div>
  );
};

export default ChatPage;
