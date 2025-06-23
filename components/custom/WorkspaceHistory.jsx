import { UserDetailContext } from '@/contexts/UserDetailContext'
import { GetAllworksppace } from '@/convex/workspace';
import { useConvex } from 'convex/react'
import React, { useContext } from 'react'
import { useSidebar } from '../ui/sidebar';

function WorkspaceHistory() {
    const{userDetail,setUseDetail} = useContext(UserDetailContext)
    const convex = useConvex();
    const [workspaceList,setWorkspaceList] = useState();
    const {toggleSidebar} = useSidebar();
    useEffect(()=>{
        userDetail&&GetAllworksppace();
    }),[userDetail]
  return (
    <div>
        <h2 className='font-medium text-lg'>Your Chats</h2>
        <Link href={'/workspace/' + workspace?._id} key={index}>
        </Link>
    </div>
  )
}

export default WorkspaceHistory