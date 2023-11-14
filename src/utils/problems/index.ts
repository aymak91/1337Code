import {twoSum} from "./two-sum";
import {reverseLinkedList} from "./reverse-linked-list";
import {jumpGame} from "./jump-game";
import {validParentheses} from "./valid-parentheses";
import {search2DMatrix} from "./search-a-2d-matrix";
import {Problem} from "../types/problem"

interface ProblemMap {
    [key: string]: Problem;
}

// routes
export const problems: ProblemMap = {
    "two-sum": twoSum,
    "reverse-linked-list": reverseLinkedList,
    "jump-game": jumpGame,
    "valid-parentheses": validParentheses,
    "search-a-2d-matrix": search2DMatrix,
};