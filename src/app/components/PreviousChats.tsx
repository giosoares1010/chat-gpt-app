import { auth as getServerSession } from "@/auth";
import Link from "next/link";

import { getChatsWithMessages } from "@/db";
import { Separator } from "@/components/ui/separator";

import Transcript from "./Transcript";

export default async function PreviousChats() {
  const session = await getServerSession();
  const chats = await getChatsWithMessages(session?.user?.email!);

  // Ensure the promise resolves before returning JSX.
  if (!chats) {
    return (
      <div className="flex justify-center">
        <div className="text-gray-500 italic text-2xl">Loading...</div>
      </div>
    );
  }
  return (
    <div>
      {chats.length > 0 && (
        <>
          <div className="text-2xl font-bold">Previous Chat Sessions</div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {chats.map((chat) => (
              <div key={chat.id} className="m-1 border-2 rounded-xl">
                <Link
                  href={`/chats/${chat.id}`}
                  className="text-lg line-clamp-1 px-5 py-2 text-white bg-blue-900 rounded-t-lg"
                >
                  {chat.name}
                </Link>
                <div className="p-3">
                  <Transcript messages={chat.messages.slice(0, 2)} />
                </div>
              </div>
            ))}
          </div>
          <Separator className="mt-5" />
        </>
      )}

      {chats.length === 0 && (
        <div className="flex justify-center">
          <div className="text-gray-500 italic text-2xl">
            No previous chats.
          </div>
        </div>
      )}
    </div>
  )
}