import React, { useState } from 'react';
import Split from 'react-split';
import ProblemDescription from '@/components/Workspace/ProblemDescription/ProblemDescription';
import Playground from '@/components/Workspace/Playground/Playground';
import { Problem } from '@/utils/types/problem';
import Confetti from 'react-confetti';
import useWindowSize from '@/hooks/useWindowSize';
type WorkspaceProps = {
    problem: Problem
};

const Workspace:React.FC<WorkspaceProps> = ({problem}) => {
    
    const [success, setSuccess] = useState(false);
    const {width, height} = useWindowSize()

    return (
        <Split className='split'>
            <ProblemDescription problem={problem}/>
            <div className='bg-dark-fill-2'>
                <Playground problem={problem} setSuccess={setSuccess}/>
                {success && <Confetti gravity={0.3} tweenDuration={4000} width={width-1} height={height-1}/>}
            </div>
        </Split>
    )
}
export default Workspace;