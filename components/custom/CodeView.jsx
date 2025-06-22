"useclient"
import React from 'react'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";


function CodeView() {
  const [activeTab, setActiveTab] = useState('code')
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