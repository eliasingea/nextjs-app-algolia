"use client";
import React from "react";
const Autocomplete = dynamic(() => import("./Autocomplete"), {
    ssr: false,
});
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { createLocalStorageRecentSearchesPlugin } from "@algolia/autocomplete-plugin-recent-searches";
import "@algolia/autocomplete-theme-classic";
import { createQuerySuggestionsPlugin } from "@algolia/autocomplete-plugin-query-suggestions";
import algoliasearch from "algoliasearch/lite";
import { useSearchParams } from "next/navigation";

const searchClient = algoliasearch(
    "latency",
    "6be0576ff61c053d5f9a3225e2a90f76"
);


const Header = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get("q");
    console.log(search);

    const router = useRouter();

    const setSubmitState = (props: { state: { query: string } }) => {
        let { state } = props;
        router.push(`/search?q=${state.query}`)
    };

    const querySuggestionsPlugin = createQuerySuggestionsPlugin({
        searchClient,
        indexName: "instant_search_demo_query_suggestions",
        transformSource({ source }) {
            return {
                ...source,
                sourceId: "querySuggestionsPlugin",
                onSelect({ item }) {
                    router.push(`/search?q=${item.query}`);
                },
            };
        },
    });

    const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
        key: "RECENT_SEARCH",
        limit: 5,
        transformSource({ source }) {
            return {
                ...source,
                sourceId: "recentSearchesPlugin",
                onSelect({ item }) {
                    router.push(`/search?q=${item.label}`);
                },
            };
        },
    });
    return (
        <div className="flex w-screen justify-between p-3">
            <h1 className="text-xl text-blue-800 w-24 pt-2">Logo</h1>
            <div className="pl-12 pr-12 flex-grow">
                <Autocomplete
                    detachedMediaQuery={"none"}
                    plugins={[recentSearchesPlugin, querySuggestionsPlugin]}
                    openOnFocus={true}
                    placeholder="Search Products"
                    initialState={{
                        query: search || "",
                    }}
                    onSubmit={setSubmitState}
                />
            </div>
            <h1 className="text-xl text-blue-800 w-24 pt-2">Account</h1>
        </div>
    );
};

export default Header;
