import { z } from "zod";

/**
 * The maximum nesting depth of a node.
 *
 * @type {number}
 */
export const MAX_NODE_DEPTH = 32;

/**
 * The variable types a JSON value is allowed to be.
 *
 * @typedef {JsonValue}
 */
type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonValue[]
    | { [key: string]: JsonValue };
    
/**
 * An interface of the component node.
 *
 * @export
 * @interface ComponentNode
 * @typedef {ComponentNode}
 */
export interface ComponentNode {
    id: number;
    type: string;
    props?: Record<string, JsonValue>;
    children?: ComponentNode[];
    actions?: string[];
}
