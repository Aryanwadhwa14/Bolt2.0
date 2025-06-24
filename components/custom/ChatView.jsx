"use client"
import { useConvex, useMutation } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
function ChatView() {
    const {id}=useParams();
    const convex = useConvex();
    const {messages, setMessage} = useContext(MessagesContext)
    const UpdateToken = useMutation(api.users.UpdateToken)

    useEffect(()=>{
        id&&GetWorkspaceData();
    },[id])
    /**
     * Used to get the workspace data using workspace id 
     */

    const GetWorkspaceData= async()=> {
        const result = await convex.query(api.workspace.GetWorkspaces,{
            workspaceId: id
        })
        setMessage(result?.messages)
        console.log(result);
         
    }

    const GetAiResponse = async() => {
      const PROMPT = JSON.stringify(messages)+Prompt.CHAT_PROMPT;
      const result = await axios.post('/api/ai-chat', {
        prompt: PROMPT 
      }) ;
      console.log(result);
      setMessage(prev=>[...prev,{
        role : 'ai',
        content : result.data.result
      }])
  }

  useEffect(()=> {
    if(messages?.length > 0){
      const role = messages[messages?.length-1].role;
      {GetAiResponse()}
    }
  })
  
  const async = Number(userDetail?.token) - Number(countToken(JSON.stringify(aiResp)));
  UpdateToken({
    userId:userDetail?._id,
    token:token
  
  })
  setLoading(false);

  return (
    <>
      <div>ChatView</div>
      <div className="flex flex-col h-full p-4 bg-gray-100">
        <div className="flex-1 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`my-2 p-3 rounded-lg ${msg.role === 'ai' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Type your message..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // Handle sending message
              }
              const newMessage = e.target.value;
              setMessage(prev => [...prev, { role: 'user', content: newMessage }]);
              e.target.value = '';
              GetAiResponse();
            }}
          />
        </div>
      </div>
    </>
  )
}




export default ChatView