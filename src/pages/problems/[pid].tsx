import React from 'react';
import Topbar from '@/components/Topbar/Topbar';

type ProblemsPageProps = {
    
};

const ProblemsPage:React.FC<ProblemsPageProps> = () => {
    
    return (
        <div>
            <Topbar problemPage={true}/>
        </div>
    )
}
export default ProblemsPage;