import rss from "@astrojs/rss";
import {
  articleDescription,
  articlePath,
  getPublishedArticles,
} from "../lib/content";

export async function GET(context: { site: URL }) {
  const articles = await getPublishedArticles();

  return rss({
    title: "RenoCrypt · Matrix Alchemy",
    description:
      "Writing on machine learning, AI, and engineering from RenoCrypt.",
    site: context.site,
    items: articles.map((article) => ({
      title: article.data.title,
      description: articleDescription(article),
      pubDate: article.data.date,
      link: articlePath(article),
    })),
  });
}
