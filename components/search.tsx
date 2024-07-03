"use client";
import algoliasearch from "algoliasearch/lite";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import {
  Configure,
  Hits,
  RefinementList,
  useInstantSearch,
  useSearchBox,
} from "react-instantsearch";
import type historyRouter from "instantsearch.js/es/lib/routers/history";
import type { UiState } from "instantsearch.js";
import Hit from "./Hit";
const client = algoliasearch("PMK1FBZCMK", "ed5c1784106c9f709e6d49ee87f57eb6");
import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const INDEX_NAME = "algoflix_CONFIGURED"
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


  const [collectionHandle, setCollectionHandle] = useState("")


  let pathname = usePathname();

  useEffect(() => {
    if (!category) return;
    const decodedUrl = decodeURIComponent(pathname);
    setCollectionHandle(decodedUrl?.split(`/`).at(-1)?.split("?")[0])
  }, [pathname])

  return (
    <div>
      <InstantSearchNext
        searchClient={client}
        indexName={INDEX_NAME}
        insights
        routing={{
          stateMapping: {
            stateToRoute(uiState: UiState) {
              const indexState = uiState[INDEX_NAME];
              return {
                cast: indexState.refinementList?.cast,
                genres: indexState.refinementList?.genres,
                q: indexState.query
              };
            },
            routeToState(routeState: UiState) {
              const state = {
                [INDEX_NAME]: {
                  refinementList: {
                    cast: routeState.cast,
                    genres: routeState.genres,
                  },
                  query: routeState.q
                }
              };
              return state;
            },
          },
          router: {
            createURL({ qsModule, routeState, location }) {
              let queryString = null;

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

              const url = `${location.origin}${pathname}${queryString}`;

              return url;
            },
            parseURL({ location, qsModule }) {
              // const decodedUrl = decodeURIComponent(location.pathname);
              let { cast, q, genres } = qsModule.parse(location.search.slice(1));
              // if (decodedUrl) setCollectionHandle(decodedUrl?.split(`/`).at(-1)?.split("?")[0]);
              return {
                genres: parseParamStringList(
                  genres as string | undefined,
                ),
                cast: parseParamStringList(
                  cast as string | undefined,
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
        <Configure filters={collectionHandle ? `genres:${collectionHandle}` : ""} />
        <div className="flex min-h-screen flex-col items-center justify-between p-12">
          <div className="flex w-full">
            <div className="w-[15%]">
              <div>
                <strong>brand</strong>
                <RefinementList
                  attribute="cast.name"

                />
              </div>
              <div>
                <strong>categories</strong>
                <RefinementList attribute="genres" />
              </div>
            </div>
            <div className="w-full">
              <strong>results</strong>
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
