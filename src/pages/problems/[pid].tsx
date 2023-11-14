import React from 'react';
import Topbar from '@/components/Topbar/Topbar';
import Workspace from '@/components/Workspace/Workspace'
import { async } from '@firebase/util';
import { problems } from '@/utils/problems';
import { Problem } from '@/utils/types/problem';

type ProblemsPageProps = {
    problem: Problem;
};

const ProblemsPage:React.FC<ProblemsPageProps> = ({problem}) => {
    console.log(problem)
    return (
        <div>
            <Topbar problemPage={true}/>
            <Workspace problem={problem}/>
        </div>
    )
}
export default ProblemsPage;

// fetch local data from API
// SSG - Static Site Generation

// getStaticPaths => creates the dynamic routes
export async function getStaticPaths() {

    // the keys will be our pids, aka routes
    const paths = Object.keys(problems).map((key) => {
        return {params: {pid: key}}
    })

    // If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.
    // https://nextjs.org/docs/pages/api-reference/functions/get-static-paths
    return {
        paths,
        fallback: false
    }
};

export async function getStaticProps({params}:{params: {pid:string}}) {
    const {pid} = params;
    const problem = problems[pid];

    if (!problem) {
        return {
            notFound: true,
        }
    }

    // function cannot be serialized to json
    problem.handlerFunction = problem.handlerFunction.toString();
    return {
        props: {
            problem,
        }
    }
}