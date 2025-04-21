import React from 'react'
const TMDB_API_KEY = process.env.TMDB_API_KEY
const TMDB_BASE_URL = process.env.TMDB_BASE_URL
import Movie from '@/components/Movie'
import Tv from '@/components/Tv'
import Recommend from '@/components/Recommend'

async function ProductPage({ params }: { params: { id: string } }) {

    // const contentType = params.id.includes("movie") ? "movie" : "tv"

    // const options = {
    //     method: 'GET',
    //     headers: {
    //         accept: 'application/json',
    //         Authorization: `Bearer ${TMDB_API_KEY}`
    //     }
    // };
    // const data = await fetch(TMDB_BASE_URL + `${contentType}/${params.id.split("_")[1]}?lang=en-US`, options);
    // let res = await data.json();
    // if (res.success == false) return <h1>{"Movie doesn't exist"}</h1>
    return (
        <div className="p-20 space-y-10">
            Hey
            <button className="add-to-cart ml-4 bg-gray-50">Add to cart</button>
            <Recommend id={params.id} />

        </div>
    );
}

export default ProductPage