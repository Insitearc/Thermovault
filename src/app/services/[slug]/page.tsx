import ServiceDetailPage from "./ServiceDetailClient";

export async function generateStaticParams() {
  return [
    { slug: "modular-cold-rooms" },
    { slug: "refrigeration-systems" },
    { slug: "mushroom-saffron-cultivation" },
    { slug: "clean-rooms" },
    { slug: "ripening-chambers" },
    { slug: "blast-chillers" },
    { slug: "amc" },
    { slug: "consultation" },
  ];
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <ServiceDetailPage params={params} />;
}
