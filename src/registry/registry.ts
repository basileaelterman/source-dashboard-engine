import type { ComponentType } from "react";
import type { ComponentRegistry, ComponentProps } from "./protocol";

/**
 * createComponentRegistry() creates a ComponentRegistry which
 * components have to strictly follow.
 *
 * @export
 * @returns {ComponentRegistry} 
 */
export function createComponentRegistry(): ComponentRegistry {
    const components = new Map<string, ComponentType<ComponentProps<any>>>();

    return {
        register(type: string, component: ComponentType<ComponentProps<any>>) {
            if (components.has(type)) {
                throw new Error(`Component type "${type}" is already registered.`);
            }

            components.set(type, component);
        },

        resolve(type: string) {
            return components.get(type);
        },

        has(type: string) {
            return components.has(type);
        }
    };
}