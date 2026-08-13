export default async function handler(req, res) {
  try {
    const feeds = [
      "https://feeds.bbci.co.uk/portuguese/rss.xml",
      "https://www.dw.com/pt-002/rss",
      "https://www.rtp.pt/noticias/rss"
    ];

    const articles = [];

    for (const feed of feeds) {
      try {
        const response = await fetch(feed);

        if (!response.ok) continue;

        const xml = await response.text();

        const items = xml.match(/<item[\s\S]*?<\/item>/gi) || [];

        for (const item of items.slice(0, 10)) {
          const get = (tag) => {
            const match = item.match(
              new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i")
            );

            return match
              ? match[1]
                  .replace(/<!\[CDATA\[|\]\]>/g, "")
                  .trim()
              : "";
          };

          const title = get("title");
          const link = get("link");
          const description = get("description");
          const pubDate = get("pubDate");

          if (title && link) {
            articles.push({
              title,
              link,
              description,
              pubDate
            });
          }
        }
      } catch (error) {
        console.error("Erro ao carregar feed:", error);
      }
    }

    return res.status(200).json({ articles });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      articles: [],
      error: "Não foi possível carregar as notícias."
    });
  }
}
