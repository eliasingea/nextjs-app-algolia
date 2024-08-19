"use client"
import React from 'react'
import {
    FrequentlyBoughtTogether,
    RelatedProducts,
} from '@algolia/recommend-react'

import recommend from '@algolia/recommend'
import Hit from './Hit';
import { HorizontalSlider } from '@algolia/ui-components-horizontal-slider-react';
const recommendClient = recommend('PMK1FBZCMK', 'ed5c1784106c9f709e6d49ee87f57eb6');
const indexName = 'algoflix_CONFIGURED';


export default function Recommend({ id }: { id: string }) {
    return (
        <RelatedProducts
            recommendClient={recommendClient}
            indexName={indexName}
            objectIDs={[id]}
            itemComponent={({ item }) => (
                <Hit
                    hit={item}
                />
            )}
            view={HorizontalSlider}
            maxRecommendations={10}
        />
    )
}
