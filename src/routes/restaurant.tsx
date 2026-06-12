import { createFileRoute } from "@tanstack/react-router";
import { MenuView } from "@/components/MenuView";

export const Route = createFileRoute("/restaurant")({
  head: () => ({
    meta: [
      { title: "مطعم التاج | المنيو" },
      { name: "description", content: "قائمة طعام مطعم التاج: شاورما، مشاوي، وجبات، بيتزا وأكثر." },
      { property: "og:title", content: "مطعم التاج | المنيو" },
      { property: "og:description", content: "نكهات أصيلة، مشاوي وشاورما بجودة فاخرة." },
    ],
  }),
  component: () => (
    <MenuView
      branch="restaurant"
      brandName="مطعم التاج"
      tagline="نكهات أصيلة • مشاوي وشاورما بجودة فاخرة"
      whatsapp="970590000000"
      instagram="altaj_rest"
      themeClass="theme-restaurant"
    />
  ),
});
