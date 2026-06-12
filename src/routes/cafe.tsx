import { createFileRoute } from "@tanstack/react-router";
import { MenuView } from "@/components/MenuView";

export const Route = createFileRoute("/cafe")({
  head: () => ({
    meta: [
      { title: "تاج مود كافيه | المنيو" },
      { name: "description", content: "قائمة تاج مود كافيه: قهوة مختصة، حلويات، ميلك شيك، موهيتو وأكثر." },
      { property: "og:title", content: "تاج مود كافيه | المنيو" },
      { property: "og:description", content: "أجواء دافئة، قهوة مختصة وحلويات مميزة." },
    ],
  }),
  component: () => (
    <MenuView
      branch="cafe"
      brandName="تاج مود كافيه"
      tagline="قهوة مختصة • حلويات • أجواء دافئة"
      whatsapp="970590000000"
      instagram="tajmood_cafe"
      themeClass="theme-cafe"
    />
  ),
});
