// components/Autocomplete.js
import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import dynamic from "next/dynamic";
import { createElement, Fragment } from "react";
import { autocomplete } from "@algolia/autocomplete-js";
import type { Root } from 'react-dom/client';

import { AutocompleteOptions, BaseItem } from "@algolia/autocomplete-core";



export function Autocomplete(props: any) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const panelRootRef = useRef<Root | null>(null);
    const rootRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) {
            return undefined;
        }


        const search = autocomplete({
            container: containerRef.current,
            renderer: { createElement, Fragment, render: () => { } },
            render({ children }, root) {
                if (!panelRootRef.current || rootRef.current !== root) {
                    rootRef.current = root;

                    panelRootRef.current?.unmount();
                    panelRootRef.current = createRoot(root);
                }

                panelRootRef.current.render(children);
            },
            ...props,
        });

        return () => {
            search.destroy();
        };
    }, [props]);

    return <div ref={containerRef} />;
}

export default Autocomplete;
