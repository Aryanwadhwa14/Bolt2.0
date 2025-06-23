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
    <div>ChatView</div>
  )
}




export default ChatView