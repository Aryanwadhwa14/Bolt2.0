"useclient"
import React, { useContext, useEffect, useState } from 'react'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import axios from 'axios';
import Lookup from '@/data/Lookup';
import { MessagesContext } from '@/contexts/MessagesContext';

function CodeView() {
  const [activeTab, setActiveTab] = useState('code')
  const [files,setFiles] = useState(Lookup?.DEFAULT_FILE)
  const {messages,setMessages} = useContext(MessagesContext)

  useEffect(()=> {
    if(messages?.length>0) {
      const role = messages[messages?.length-1].role;
      if(role=='user')
        {
          GenerateAicode();
        }
    }
  },[messages])

  const GenerateAicode= async()=> {
    const PROMPT = messages[messages?.length-1]?.content+" " + Prompt.CODE_GEN_PROMPT;
    const result = await axios.post('/api/gen-ai-code',{
      prompt: PROMPT
    })
    console.log(result.data); 
    const aiResponse = result.data;

    const mergedFiles={...Lookup.DEFAULT_FILE,... aiResponse?.files}
    setFiles(mergedFiles);
  }
  return (
    <div>
      <div className='bg-[#181818] w-full p-2 border'>
        <div classname= ' flex items-center flex-wrap shrink-0 bg-black'>
          <h2 classname={`text-sm cursor pointer
             ${activeTab=='code'&&'text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 round-full'}`}
             onClick={()=>setActiveTab('code')}> Code</h2>
          <h2 classname={`text-sm cursor pointer
             ${activeTab=='preview'&&'text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 round-full'}`}
             onClick={()=>setActiveTab('code')}> Preview </h2>
        </div>
      </div>
    <SandpackProvider template="react" theme='dark' >
    <SandpackLayout>
    <SandpackFileExplorer style={{height:"80vh"}}/>
      <SandpackCodeEditor style={{height:"80vh"}}/>
      <SandpackPreview />
    </SandpackLayout>
  </SandpackProvider>
    </div>
  )
}

export default CodeView