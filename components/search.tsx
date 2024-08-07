"use client";
import algoliasearch from "algoliasearch/lite";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import {
  Hits,
  RefinementList,
  useInstantSearch,
  useSearchBox,
  Configure,
  UseSearchBoxProps,
} from "react-instantsearch";
import type historyRouter from "instantsearch.js/es/lib/routers/history";
import type { UiState } from "instantsearch.js";
import Hit from "./Hit";
const client = algoliasearch("PMK1FBZCMK", "ed5c1784106c9f709e6d49ee87f57eb6");
import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const INDEX_NAME = "algoflix_CONFIGURED"


function SearchBox(props: UseSearchBoxProps) {
  let { query, refine } = useSearchBox(props);
  const { setIndexUiState } = useInstantSearch();
  const searchParams = useSearchParams();
  const search = searchParams.get("q") as string;
  if (typeof query === "object") query = query[0]
  if (search && (query !== search)) {
    setIndexUiState({})
    refine(search);
  }

  return null;
}


export function Search() {
  return (
    <div>
      <InstantSearchNext
        searchClient={client}
        indexName={INDEX_NAME}
        insights
        future={{
          preserveSharedStateOnUnmount: true
        }}
        routing={{
          stateMapping: {
            stateToRoute(uiState: UiState) {
              const indexState = uiState[INDEX_NAME];
              return {
                q: indexState.query,
                type: indexState.refinementList?.record_type,
                cast: indexState.refinementList?.["cast.name"]
              };
            },
            routeToState(routeState: UiState) {
              const state = {
                [INDEX_NAME]: {
                  refinementList: {
                    ["cast.name"]: routeState.cast,
                    record_type: routeState.type
                  },
                  query: routeState.q,
                }
              };
              return state;
            },
          },
          router: {
            createURL({ qsModule, routeState, location }) {
              let queryString = null;
              let pathname = "/search"
              queryString = qsModule.stringify(
                {
                  q: routeState.q,
                  cast: routeState.cast,
                  type: routeState.type
                },
                {
                  addQueryPrefix: true,
                  arrayFormat: "comma",
                },
              );

              const url = `${location.origin}${pathname}${queryString}`;

              return url;
            },
            parseURL({ location, qsModule }) {
              let { cast, q, type } = qsModule.parse(location.search.slice(1));
              return {
                cast: parseParamStringList(
                  cast as string | undefined,
                ),
                type: parseParamStringList(
                  type as string | undefined,
                ),
                q: parseParamStringList(
                  q as string | undefined,
                ),
              };
            },
            push(this: ReturnType<typeof historyRouter>, url) {
              if (this.isDisposed) {
                return;
              }
              history.pushState({}, "", url);
            },
            cleanUrlOnDispose: true,
          },
        }}
      >
        <SearchBox />
        <Configure />
        <div className="flex min-h-screen flex-col items-center justify-between p-12">
          <div className="flex w-full">
            <div className="w-[15%]">
              <div className="pt-4 pb-4">
                <h2 className="text-blue-900 text-base font-semibold mb-3">Cast</h2>
                <RefinementList
                  attribute="cast.name"
                  classNames={{
                    list: 'flex flex-col gap-y-3',
                    label: 'inline-block w-full flex cursor-pointer items-center',
                    labelText: 'ml-2',
                    checkbox:
                      'w-7 h-7 cursor-pointer appearance-none border border-blue-300 rounded-lg flex-shrink-0 transition-colors hover:bg-blue-100 checked:hover:bg-blue-300 checked:bg-blue-300 checked:bg-tick checked:bg-no-repeat checked:bg-center checked:bg-[length:0.8rem]',
                    count: 'ml-auto text-gray-500 text-sm',
                    selectedItem: 'font-semibold',
                  }}
                />
              </div>
              <div>
                <h2 className="text-blue-900 text-base font-semibold mb-3">Type</h2>
                <RefinementList
                  attribute="record_type"
                  classNames={{
                    list: 'flex flex-col gap-y-3',
                    label: 'inline-block w-full flex cursor-pointer items-center',
                    labelText: 'ml-2',
                    checkbox:
                      'w-7 h-7 cursor-pointer appearance-none border border-blue-300 rounded-lg flex-shrink-0 transition-colors hover:bg-blue-100 checked:hover:bg-blue-300 checked:bg-blue-300 checked:bg-tick checked:bg-no-repeat checked:bg-center checked:bg-[length:0.8rem]',
                    count: 'ml-auto text-gray-500 text-sm',
                    selectedItem: 'font-semibold',
                  }}
                />
              </div>

            </div>
            <div className="w-full">
              <Hits hitComponent={Hit} classNames={
                {
                  root: "bg-white",
                  list: "flex flex-wrap",
                  item: "group relative m-0 flex h-78 w-96 rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg"

                }
              } />
            </div>
          </div>
        </div>
        <DebugIS />
      </InstantSearchNext>
    </div >
  );
}

function DebugIS() {
  const data = useInstantSearch();
  console.log("useInstantSearch", data);

  return null;
}

function parseParamStringList(value?: string | null): string[] | undefined {
  const paramArray = value ? value.split(",") : undefined;
  return paramArray;
}
