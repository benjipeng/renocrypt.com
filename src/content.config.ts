import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const stringList = z.preprocess((value) => {
  if (value === undefined || value === null || value === "") return [];
  if (Array.isArray(value)) return value.map(String);
  return [String(value)];
}, z.array(z.string()));

const articleSchema = ({ image }: { image: () => z.ZodTypeAny }) =>
  z
    .object({
      title: z.string(),
      description: z.string().optional(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      tags: stringList.default([]),
      category: z.string().optional(),
      categories: stringList.default([]),
      series: stringList.default([]),
      series_order: z.coerce.number().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      url: z.string().optional(),
      showAuthor: z.boolean().optional(),
      showHero: z.boolean().optional(),
      heroStyle: z.string().optional(),
      showTableOfContents: z.boolean().optional(),
    })
    .transform((data) => {
      const categories = new Set(data.categories);
      if (data.category) categories.add(data.category);
      return { ...data, categories: [...categories] };
    });

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: articleSchema,
});

const dev = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/dev" }),
  schema: articleSchema,
});

export const collections = { posts, dev };
