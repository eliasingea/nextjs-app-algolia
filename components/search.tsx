"use client";
import algoliasearch from "algoliasearch/lite";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import {
  Hits,
  RefinementList,
  useInstantSearch,
  useSearchBox,
} from "react-instantsearch";
import type historyRouter from "instantsearch.js/es/lib/routers/history";
import type { UiState } from "instantsearch.js";
import Hit from "./Hit";
const client = algoliasearch("latency", "6be0576ff61c053d5f9a3225e2a90f76");
import type { InstantSearchProps } from 'react-instantsearch';
import { useSearchParams } from "next/navigation";

interface SearchProps {
  category: boolean;
}


function SearchBox(props: any) {
  const { query, refine } = useSearchBox(props);
  const searchParams = useSearchParams();
  const search = searchParams.get("q") as string;

  if (search && (query !== search)) {
    refine(search);
  }

  return null;
}


export function Search({ category }: SearchProps) {

  return (
    <div>
      <InstantSearchNext
        searchClient={client}
        indexName="instant_search"
        routing={{
          stateMapping: {
            stateToRoute(uiState: UiState) {
              const indexState = uiState["instant_search"];
              return {
                brand: indexState.refinementList?.brand,
                categories: indexState.refinementList?.categories,
                q: indexState.query
              };
            },
            routeToState(routeState: UiState) {
              const state = {
                instant_search: {
                  refinementList: {
                    brand: routeState.brand,
                    categories: routeState.categories,
                  },
                  query: routeState.q
                }
              };
              return state;
            },
          },
          router: {
            createURL({ qsModule, routeState, location }) {
              console.log(location);
              let pathname = null;
              let queryString = null;
              if (category) {
                pathname = `/plp/${routeState.categories}`
                queryString = qsModule.stringify(
                  {
                    brand: routeState.brand,
                  },
                  {
                    addQueryPrefix: true,
                    arrayFormat: "comma",
                  },
                );
              } else {
                pathname = `/search`
                queryString = qsModule.stringify(
                  {
                    brand: routeState.brand,
                    q: routeState.q,
                    categories: routeState.categories
                  },
                  {
                    addQueryPrefix: true,
                    arrayFormat: "comma",
                  },
                );
              }
              const url = `${location.origin}${pathname}${queryString}`;

              return url;
            },
            parseURL({ location, qsModule }) {
              const decodedUrl = decodeURIComponent(location.pathname);
              let { brand, q, categories } = qsModule.parse(location.search.slice(1));
              if (category) categories = decodedUrl?.split(`/`).at(-1)?.split("?")[0];
              return {
                categories,
                brand: parseParamStringList(
                  brand as string | undefined,
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
          },
        }}
      >
        <SearchBox />
        <div className="flex min-h-screen flex-col items-center justify-between p-12">
          <div className="flex w-full">
            <div className="w-1/3">
              <div>
                <strong>brand</strong>
                <RefinementList
                  attribute="brand"

                />
              </div>
              <div>
                <strong>categories</strong>
                <RefinementList attribute="categories" />
              </div>
            </div>
            <div className="w-2/3">
              <strong>results</strong>
              <Hits hitComponent={Hit} classNames={
                {
                  list: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",

                }
              } />
            </div>
          </div>
        </div>
        <DebugIS />
      </InstantSearchNext>
    </div>
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
