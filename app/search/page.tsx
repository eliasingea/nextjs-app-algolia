import { Search } from "@/components/search";

interface SearchProps {
    category: boolean;
}

export const dynamic = "force-dynamic";

export default function SearchPage() {
    return <Search category={false} />;
}
