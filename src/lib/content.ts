import { getCollection, type CollectionEntry } from "astro:content";

export type ArticleEntry =
  | CollectionEntry<"posts">
  | CollectionEntry<"dev">
  | CollectionEntry<"ciphers">;
export type ArticleSection = ArticleEntry["collection"];

export const sectionMeta: Record<
  ArticleSection,
  { label: string; eyebrow: string; href: string; description: string }
> = {
  posts: {
    label: "ML/AI",
    eyebrow: "models",
    href: "/posts/",
    description:
      "Machine learning notes, model architecture explainers, and practical AI write-ups.",
  },
  dev: {
    label: "Development",
    eyebrow: "machines",
    href: "/dev/",
    description:
      "Engineering notes on systems, infrastructure, agents, and tools that ship.",
  },
  ciphers: {
    label: "Ciphers",
    eyebrow: "ciphers",
    href: "/ciphers/",
    description:
      "Security research notes: how systems break, how they hold, and the cryptography underneath.",
  },
};

export const byDateDesc = (a: ArticleEntry, b: ArticleEntry) =>
  b.data.date.valueOf() - a.data.date.valueOf();

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);

export function normalizePath(path: string) {
  const clean = path.trim().replace(/^\/+|\/+$/g, "");
  return `/${clean}/`;
}

export function slugFromId(id: string) {
  return id
    .replace(/\.(md|mdx)$/i, "")
    .replace(/\/(?:index|_index)$/i, "")
    .replace(/(?:^|\/)_index$/i, "")
    .split("/")
    .filter(Boolean)
    .map((part) =>
      part
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .filter(Boolean)
    .join("/");
}

export function articlePath(entry: ArticleEntry) {
  if (entry.data.url) return normalizePath(entry.data.url);
  return normalizePath(`${entry.collection}/${slugFromId(entry.id)}`);
}

export function articleDescription(entry: ArticleEntry) {
  return (
    entry.data.description ||
    `${sectionMeta[entry.collection].label} writing from RenoCrypt.`
  );
}

export function readingTime(entry: ArticleEntry) {
  const body = "body" in entry ? (entry.body ?? "") : "";
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 225));
}

export function articleTopics(entry: ArticleEntry) {
  return [...new Set([...entry.data.categories, ...entry.data.tags])].filter(
    Boolean
  );
}

export async function getPublishedArticles() {
  const [posts, dev, ciphers] = await Promise.all([
    getCollection("posts", ({ data }) => !data.draft),
    getCollection("dev", ({ data }) => !data.draft),
    getCollection("ciphers", ({ data }) => !data.draft),
  ]);
  return [...posts, ...dev, ...ciphers].sort(byDateDesc);
}

export function topicSlug(topic: string) {
  return topic
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
