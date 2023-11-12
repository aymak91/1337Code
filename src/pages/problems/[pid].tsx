import React from 'react';
import Topbar from '@/components/Topbar/Topbar';
import Workspace from '@/components/Workspace/Workspace'

type ProblemsPageProps = {
    
};

const ProblemsPage:React.FC<ProblemsPageProps> = () => {
    
    return (
        <div>
            <Topbar problemPage={true}/>
            <Workspace />
        </div>
    )
}
export default ProblemsPage;