import React from 'react'
import Image from 'next/image'
import { Heading } from './ui/heading'


export type TvType = {
    backdrop_path: string,
    genres: [{ id: number, name: string }],
    id: number,
    poster_path: string,
    name: string,
    number_of_searsons: number,
    first_air_date: string,
    popularity: number,
    vote_average: number,
    vote_count: number
}

export default function Movie({ tv }: { tv: TvType }) {
    return (
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <div className="flex flex-col-reverse px-4 sm:px-0">
                <div className="aspect-h-1 aspect-w-1 w-full">
                    <div className="relative aspect-video overflow-hidden rounded-lg group-hover:opacity-75">
                        <Image priority src={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`} width={500} height={500} alt="" />
                    </div>
                </div>
            </div>

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <Heading level={1} className="tracking-tight font-medium text-blue-900">
                    {tv.name}
                </Heading>

                <div className="mt-3">
                    <Heading level={2} className="sr-only">
                        Product information
                    </Heading>
                    {tv.genres.map((genre) => {
                        return (<p key={genre.id} className="text-3xl tracking-tight text-gray-900">
                            {genre.name}
                        </p>
                        )
                    })}
                </div>

                {typeof tv.vote_average !== 'undefined' && (
                    <div className="mt-3">
                        <Heading level={3} className="">
                            Reviews
                        </Heading>
                        {tv.vote_average}
                    </div>
                )}

                <div className="mt-6">
                    <Heading level={3} className="">
                        Popularity
                    </Heading>

                    <div className="space-y-6 text-base text-gray-700">
                        {tv.popularity}
                    </div>
                </div>
            </div>
        </div>
    )
}


