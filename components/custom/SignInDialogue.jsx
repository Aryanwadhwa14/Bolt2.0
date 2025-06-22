import React, { useCallback, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { UserDetailContext } from "@/contexts/UserDetailContext";
import axios from "axios";
import { useMutation } from "convex/react";
import uuid4 from "uuid4";
import { api } from "@/convex/_generated/api";

function SignInDialogue({openDialog,closeDialog}) {
const {userDetail, setUserDetail} = useContext(UserDetailContext)
const CreateUser = useMutation(api.users.CreateUser)
    
const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
        console.log(codeResponse);
        const tokens = await axios.post(
            'http://localhost:3001/auth/google', {
                headers: {Authorization : 'Bearer'+codeResponse?.access_token}
            });

        console.log(tokens);
        const user = tokens.data;
        await CreateUser({
          name: user?.name,
          email: user?.email,
          picture: user?.picture,
          uid: uuid4()
        })

        if(typeof window === 'undefined'){
          localStorage.setItem('user' , JSON.stringify(user))
        }


        setUserDetail(tokens?.data);
        //Save this inside database
        closeDialog(false);
    },
    onError: errorResponse => console.log(errorResponse),
});

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <div className= "flex flex-col items-center justify-center gap-3">
            <h1 className="font-bold text-2xl text-center text-white">{Lookup.SIGNIN_HEADING}
            </h1>
            <p className="mt-2 text-center text-lg">{Lookup.SIGNIN_SUBHEADING}</p>
            <Button className="bg-blue-500 text-white hover:bg-blue-400" onClick={googleLogin} >Sign in with Google</Button>
            <p>{Lookup.SIGNIn_AGREEMENT_TEXT}</p>

            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialogue;
