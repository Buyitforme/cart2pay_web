import { useEffect, useState } from "react";

export const useFashionNovaWishlist = (wishlistUrl: string) => {
const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!wishlistUrl.includes("fashionnova.com")) return;

    const fetchItems = async () => {
      setLoading(true);
      try {
        const url = new URL(wishlistUrl);
        const idsParam = url.searchParams.get("ids");

        if (!idsParam) return;

        const productIds = idsParam.split(",");
        const results: any[] = [];

        for (const id of productIds) {
          const productUrl = `https://www.fashionnova.com/products/${id}`;
          const response = await fetch(productUrl);
          const html = await response.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");

          const title =
            doc.querySelector("h1.product__title")?.textContent?.trim() || "";
          const image =
            doc.querySelector(".product__media img")?.getAttribute("src") || "";

          if (title && image) {
            results.push({ title, image, url: productUrl });
          }
        }

        setItems(results);
      } catch (err) {
        console.error("Error loading wishlist", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [wishlistUrl]);

  return { items, loading };
};
