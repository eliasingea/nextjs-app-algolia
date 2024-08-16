import { Search } from "@/components/search";


//opt out of route segnment caching
export const dynamic = "force-dynamic";

export default function CategoryPage({ params }: { params: { slug: string } }) {
    return <Search category={params.slug} />;
}
