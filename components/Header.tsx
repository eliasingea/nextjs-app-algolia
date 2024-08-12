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
import Link from "next/link";

const searchClient = algoliasearch(
    "PMK1FBZCMK",
    "ed5c1784106c9f709e6d49ee87f57eb6"
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
        indexName: "algoflix_CONFIGURED_query_suggestions",
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
            <h1 className="text-xl text-blue-800 w-24 pt-2">
                <Link href="/">Logo</Link>
            </h1>
            <div className="pl-12 pr-12 flex-grow">
                <Autocomplete
                    detachedMediaQuery={"none"}
                    plugins={[recentSearchesPlugin, querySuggestionsPlugin]}
                    openOnFocus={true}
                    placeholder="Search Movies or TV Shows"
                    initialState={{
                        query: search || "",
                    }}
                    onSubmit={setSubmitState}
                    classNames={{
                        panel: "z-50"
                    }}
                />
            </div>
            <h1 className="text-xl text-blue-800 w-24 pt-2">Account</h1>
        </div>
    );
};

export default Header;
