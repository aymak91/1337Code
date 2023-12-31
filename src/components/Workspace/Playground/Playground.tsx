import React, { useState } from 'react';
import PreferenceNav from '@/components/Workspace/Playground/PreferenceNav/PreferenceNav';
import Split from 'react-split';
import CodeMirror from '@uiw/react-codemirror';
import {vscodeDark} from "@uiw/codemirror-theme-vscode";
import {javascript} from "@codemirror/lang-javascript";
// import {python} from "@codemirror/lang-python";
import EditorFooter from '@/components/Workspace/Playground/EditorFooter'
import { Problem } from '@/utils/types/problem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { problems } from '@/utils/problems';


type PlaygroundProps = {
    problem: Problem;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

const Playground:React.FC<PlaygroundProps> = ({problem, setSuccess}) => {

    const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
    const [userCode, setUserCode] = useState<string>(problem.starterCode);
    const [user] = useAuthState(auth)
    const {query: {pid}} = useRouter();

    const handleSubmit = () => {
        if (!user) {
            toast.error("Please login to submit your code", {
                position: "top-center",
                autoClose: 3000,
                theme: 'dark',
            })
            return;
        }

        try {
            const cb = new Function(`return ${userCode}`)();
            const handler = problems[pid as string].handlerFunction;

            if (typeof handler === "function") {
                const success = handler(cb)
                if (success) {
                    toast.success("You passed all test cases! Great job!", {
                        position: 'top-center',
                        autoClose: 3000,
                        theme: 'dark',
                    })
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                    },4000)
                }
            }

        } catch (error:any) {
            if (error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:")) {
                toast.error(`One or more test cases failed! ${error.message}`, {
                    position: 'top-center',
                    autoClose: 10000,
                    theme: 'dark',
                });
            } else {
                toast.error(error.message, {
                    position: 'top-center',
                    autoClose: 10000,
                    theme: 'dark',
                });
            }
            console.log(error.message);
        }
    }

    const onChange = (value:string) => {
        setUserCode(value);
    }

    return (
        <div className='flex flex-col bg-dark-layer-1 relative overflow-x-hidden'>
            <PreferenceNav />
            <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60,40]} minSize={60}>
                <div className="w-full overflow-auto">
                    <CodeMirror 
                        value={problem.starterCode}
                        theme={vscodeDark}
                        extensions={[javascript()]}
                        style={{fontSize:16}}
                        onChange={onChange}
                    />
                </div>
                <div className='w-full px-5 overflow-auto'>

                    {/* Test Case Heading */}
                    <div className='flex h-10 items-center space-x-6'>
                        <div className='relative flex h-full flex-col justify-center cursor-point'>
                            <div className='text-sm font-medium leading-6 text-white'>Test Cases</div>
                            <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white'></hr>
                        </div>
                    </div>
                    
                    <div className='flex'>
                        {problem.examples.map((example, index) => (
                            <div className='mr-2 items-start mt-2 text-white' key={example.id} onClick={() => setActiveTestCaseId(index)}>
                                <div className='flex flex-wraps items-center gap-y-4'>
                                    <div className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap ${activeTestCaseId === index ? "text-white" : "text-gray-500" }` }>
                                        Case {index+1}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                    <div className='font-semibold my-4'>
                        <p className='text-sm font-medium mt-4 text-white'>Input:</p>
                        <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                            {problem.examples[activeTestCaseId].inputText}
                        </div>
                        <p className='text-sm font-medium mt-4 text-white'>Output:</p>
                        <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                            {problem.examples[activeTestCaseId].outputText}
                        </div>
                    </div>
                </div>
            </Split>
            <EditorFooter handleSubmit={handleSubmit}/>
        </div>
    )
}
export default Playground;