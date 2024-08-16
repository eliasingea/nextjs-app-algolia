import { Search } from "@/components/search";


//opt out of route segnment caching
export const dynamic = "force-dynamic";

export default function SearchPage() {
    return <Search category={""} />;
}
