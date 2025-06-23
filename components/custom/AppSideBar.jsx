import React from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar";
import { MessageCircleCode } from 'lucide-react';
import WorkspaceHistory from './WorkspaceHistory';

function AppSideBar() {
  return (
    <Sidebar>
    <SidebarHeader className="p-5" />
        <Image src={'/logo.png'} alt='log' width={30} height= {30}></Image>
    <SidebarContent classname= "p-5">
        <Button> <MessageCircleCode/>Start New Chat </Button>
      <SidebarGroup />
      <WorkspaceHistory/>
      <SidebarGroup />
    </SidebarContent>
    <SidebarFooter />
  </Sidebar>
 
  )
}

export default AppSideBar