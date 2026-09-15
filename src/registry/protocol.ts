import type { ComponentType, ReactNode } from "react";
import type { ComponentNode } from "../schema/component-node";

/**
 * The protocol version. Bump only on a breaking change
 * to the shapes below.
 *
 * @type {string}
 */
export const PROTOCOL_VERSION = "1.0.0";


/**
 * The props every registered component receives from the renderer.
 *
 * @export
 * @interface ComponentProps
 * @typedef {ComponentProps}
 * @template [TData=unknown] 
 */
export interface ComponentProps<TData = unknown> {
    node: ComponentNode;
    data: TData;
    children?: ReactNode;
    dispatchAction(actionId: string, payload?: unknown): void;
}


/**
 * Maps a schema node's 'type' to the component that renders it.
 *
 * @export
 * @interface ComponentRegistry
 * @typedef {ComponentRegistry}
 */
export interface ComponentRegistry {
    register(type: string, component: ComponentType<ComponentProps<unknown>>): void;
    resolve(type: string): ComponentType<ComponentProps<unknown>> | undefined;
    has(type: string): boolean;
}