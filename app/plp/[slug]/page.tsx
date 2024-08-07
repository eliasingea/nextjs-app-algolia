import { Categories } from "@/components/Categories";

export const dynamic = "force-dynamic";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return <Categories category={params.slug} />;
}
