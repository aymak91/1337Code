import React from 'react';
import Split from 'react-split';
import ProblemDescription from '@/components/Workspace/ProblemDescription/ProblemDescription';
import Playground from '@/components/Workspace/Playground/Playground';
import { Problem } from '@/utils/types/problem';

type WorkspaceProps = {
    problem: Problem
};

const Workspace:React.FC<WorkspaceProps> = ({problem}) => {
    
    return (
        <Split className='split'>
            <ProblemDescription problem={problem}/>
            <Playground problem={problem} />
        </Split>
    )
}
export default Workspace;