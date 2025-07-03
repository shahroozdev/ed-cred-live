// lib/static-data.ts
import { cache } from "react";

export const getStaticPropsData = cache(async () => {
  const [categories, subCategories, schools] = await Promise.all([
    fetch(`${process.env.BASE_URL}/category`, {
      next: { tags: ["categories"] },
    })
      .then((res) => res.json())
      .catch(() => []),
    fetch(`${process.env.BASE_URL}/subcategory`, {
      next: { tags: ["subcategories"] },
    })
      .then((res) => res.json())
      .catch(() => []),
    fetch(`${process.env.BASE_URL}/school`, {
      next: { tags: ["schools"] },
    })
      .then((res) => res.json())
      .catch(() => []),
  ]);

  return {
    categories,
    subCategories,
    schools,
  };
});
