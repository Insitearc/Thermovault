import ProductDetailPage from "./ProductDetailClient";

export async function generateStaticParams() {
  return [
    { slug: "puf-panels" },
    { slug: "compressors" },
    { slug: "evaporators" },
    { slug: "condensing-units" },
    { slug: "control-panels" },
    { slug: "cold-room-doors" },
    { slug: "doors-hardware" },
    { slug: "copper-piping" },
    { slug: "electrical-systems" },
    { slug: "refrigeration-accessories" },
    { slug: "insulation-materials" },
    { slug: "spare-parts" },
  ];
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <ProductDetailPage params={params} />;
}
