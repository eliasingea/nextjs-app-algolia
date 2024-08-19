"use client"
import React from 'react'
import {
    FrequentlyBoughtTogether,
    RelatedProducts,
} from '@algolia/recommend-react'
import Image from 'next/image'
import recommend from '@algolia/recommend'
import Hit from './Hit';
import { HorizontalSlider } from '@algolia/ui-components-horizontal-slider-react';
import Link from 'next/link';
const recommendClient = recommend('PMK1FBZCMK', 'ed5c1784106c9f709e6d49ee87f57eb6');
const indexName = 'algoflix_CONFIGURED';
import '@algolia/ui-components-horizontal-slider-theme';


export default function Recommend({ id }: { id: string }) {
    return (
        <RelatedProducts
            recommendClient={recommendClient}
            indexName={indexName}
            objectIDs={[id]}
            itemComponent={({ item }) => (
                <Link href={`/pdp/${item.objectID}`}>
                    <div className="">
                        <div className="">
                            <Image priority src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} height={150} width={300} className="animate-fade-in block scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110" alt="" />
                        </div>
                        <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                            <h1 className="font-serif text-1xl font-bold text-white shadow-xl">{item.title}</h1>
                            <h1 className="text-sm font-bold text-white shadow-xl">{item.genres[0]}</h1>
                        </div>
                    </div>
                </Link>
            )}
            view={HorizontalSlider}
            maxRecommendations={10}
        />
    )
}
