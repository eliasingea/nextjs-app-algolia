import React from 'react'
import Image from 'next/image'
import { Heading } from './ui/heading'


export type MovieType = {
    backdrop_path: string,
    genres: [{ id: number, name: string }],
    id: number,
    poster_path: string,
    release_date: string,
    title: string,
    tagline: string,
    vote_average: number,
    vote_count: number,
    overview: string,
    success: boolean
}

export default function Movie({ movie }: { movie: MovieType }) {
    return (
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <div className="flex flex-col-reverse px-4 sm:px-0">
                <div className="aspect-h-1 aspect-w-1 w-full">
                    <div className="relative aspect-video overflow-hidden rounded-lg group-hover:opacity-75">
                        <Image priority src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} width={500} height={500} alt="" />
                    </div>
                </div>
            </div>

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <Heading level={1} className="tracking-tight font-medium text-blue-900">
                    {movie.title}
                </Heading>

                <div className="mt-3">
                    <Heading level={2} className="sr-only">
                        Product information
                    </Heading>
                    {movie.genres.map((genre) => {
                        return (<p key={genre.id} className="text-3xl tracking-tight text-gray-900">
                            {genre.name}
                        </p>
                        )
                    })}
                </div>

                {typeof movie.vote_average !== 'undefined' && (
                    <div className="mt-3">
                        <Heading level={3} className="sr-only">
                            Reviews
                        </Heading>
                        {movie.vote_average}
                    </div>
                )}

                <div className="mt-6">
                    <Heading level={3} className="sr-only">
                        Description
                    </Heading>

                    <div className="space-y-6 text-base text-gray-700">
                        {movie.overview}
                    </div>
                </div>
            </div>
        </div>
    )
}


