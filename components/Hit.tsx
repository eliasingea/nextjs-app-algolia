import React from 'react'

type CustomHit = BaseHit<{
    name: string,
    rating: number,
    price: number,
    image: string,
}>;
import Image from 'next/image';
import type { Hit as BaseHit, } from "instantsearch.js/es/types";

const Hit = ({ hit }: { hit: CustomHit }) => {
    return (
        <div className="bg-white shadow-md pl-4 rounded-md h-60">
            <div className="">

                <Image
                    src={hit.image}
                    width={128}
                    height={128}
                    alt="Picture of the author"
                />
            </div>
            <h2 className="text-l font-semibold">{hit.name}</h2>
            <div className="flex items-center ">
                <span className="text-gray-500">Rating: {hit.rating}</span>
                <span className="text-gray-500 ml-4">Price: {hit.price}</span>
            </div>
        </div>
    )
}

export default Hit


