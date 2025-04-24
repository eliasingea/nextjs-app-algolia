import { Search } from "@/components/search";


//opt out of route segnment caching
export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    return <Search category={slug} />;
}
