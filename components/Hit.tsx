import React from 'react'
import Link from 'next/link'

type CustomHit = BaseHit<{
    title: string,
    bayesian_avg: number,
    backdrop_path: string,
    cast: object[],
    overview: string,
    genres: string[],
    objectID: string
}>;
import type { Hit as BaseHit, } from "instantsearch.js/es/types";
import Image from 'next/image';

const Hit = ({ hit }: { hit: CustomHit }) => {
    return (
        <Link href={`/pdp/${hit.objectID}`}>
            <div className="p-4">

                <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                    <Image src={`https://image.tmdb.org/t/p/original${hit.backdrop_path}`} height={250} width={600} className="animate-fade-in block scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110" alt="" />
                    {/* <img src={`https://image.tmdb.org/t/p/original${hit.backdrop_path}`} className="h-[250px] w-[600px] animate-fade-in block scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110" alt="" /> */}
                </div>
                <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                    <h1 className="font-serif text-1xl font-bold text-white shadow-xl">{hit.title}</h1>
                    <h1 className="text-sm font-bold text-white shadow-xl">{hit.genres[0]}</h1>
                </div>
            </div>
        </Link>
    )
}

export default Hit


