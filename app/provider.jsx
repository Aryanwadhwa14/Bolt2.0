"use client";
import React, { useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";
import Hero from "@/components/custom/Hero";
import { MessagesContext } from "@/contexts/MessagesContext";
import { UserDetailContext } from "@/contexts/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { useEffect } from "react";

function Provider({ children }) {
  const[messages,setMessages] = useState();
  const[userDetail, setUserDetail] = useState();
  const convex = useConvex();

  useEffect(()=> {
    IsAuthenticated();
  }, [])

  const IsAuthenticated = async() => {
    if(typeof window!== undefined){ 
      //Fetch from database
      const user=JSON.parse(localStorage.getItem('user'))
      const result = await convex.query (api.users.GetUser,{
        email:user?.email 
      })
      setUserDetail(result);
      console.log(result);
    }
  }
  return (
    <div>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}>
      <UserDetailContext.Provider value={[userDetail, setUserDetail]}>
      <MessagesContext.Provider value={[messages,setMessages]}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </NextThemesProvider>
      </MessagesContext.Provider>
      </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default Provider;
