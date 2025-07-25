"use client"
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import { ArrowRight, Link } from "lucide-react";
import { useContext, useState } from "react";
import { MessagesContext } from "@/contexts/MessagesContext";
import SignInDialogue from "./SignInDialogue";
import { UserDetailContext } from "@/contexts/UserDetailContext";
import { useRouter } from "next/navigation";

function Hero() {
  const [userInput, setUserInput] = useState();
  const {messages, setMessages} = useContext(MessagesContext);
  const [userDetail, setUserDetail] = useContext(UserDetailContext);
  const [openDialog,setOpenDialog]= useState(false);
  const CreateWorskpace = useMutation(api.workspace.CreateWorkspace)
  const router = useRouter();
  const onGenerate= async(input)=>{
    if(!userDetail?.name)
      {
        setOpenDialog(true);
        return ; 
      }
      const msg = {
        role: 'user',
        content: input
      }
      setMessages(msg);
      
      const workspaceId = await CreateWorkspace({
        user: userDetail._id,
        messages : [msg]
    });
    console.log(workspaceId);
    router.push('/wokspace/'+ workspaceId);
  }


  return (
    <div className="flex flex-col items-center mt-36 xl:mt-52 gap-2">
      <h2 className="font-bold text-4xl">{Lookup.HERO_HEADING}</h2>
      <p className="text-gray-400 font-medium">{Lookup.HERO_DESC}</p>
      <div className="p-5 border rounded-xl max-w-xl w-full mt-3 "
      style={{
        backgroundColor:Colors.BACKGROUND
      }}>
        <div className="flex gap-2">
          <textarea placeholder={Lookup.INPUT_PLACEHOLDER} 
          onChange={(e) => setUserInput(e.target.value)}
          className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"/>
         {userInput && <ArrowRight 
         onClick={()=> onGenerate(userInput)}
         className="bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer" /> }
        </div>
        <div>
          <Link className="h-5 w-5"/>
        </div>
      </div>

      <div className="flex mt-5 flex-wrap max-w-2xl items-center justify-center gap-3">
        {Lookup.SUGGSTIONS.map((suggestion,index)=>(
          <h2 key={index} 
          onClick={()=> onGenerate(suggestion)}
          className="p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer">{suggestion}</h2>
        ))}
      </div>
      <SignInDialogue openDialog = {openDialog} closeDialog={(v) => setOpenDialog(false) } />
    </div>
  );
}

export default Hero;
