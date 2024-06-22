import React from 'react'

type CustomHit = BaseHit<{
    name: string,
    rating: number,
    price: number,
}>;

import type { Hit as BaseHit, } from "instantsearch.js/es/types";

const Hit = ({ hit }: { hit: CustomHit }) => {
    return (
        <div className="bg-white shadow-md p-4 rounded-md h-60">
            <h2 className="text-l font-semibold p-4">{hit.name}</h2>
            <div className="flex items-center ">
                <span className="text-gray-500">Rating: {hit.rating}</span>
                <span className="text-gray-500 ml-4">Price: {hit.price}</span>
            </div>
        </div>
    )
}

export default Hit


