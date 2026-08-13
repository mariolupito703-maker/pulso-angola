export default async function handler(req, res) {
  try {
    const feeds = [
      {
        url: "https://feeds.bbci.co.uk/portuguese/rss.xml",
        source: "BBC News Brasil"
      },
      {
        url: "https://www.dw.com/pt-002/rss",
        source: "DW"
      },
      {
        url: "https://www.rtp.pt/noticias/rss",
        source: "RTP"
      }
    ];

    const articles = [];

    for (const feed of feeds) {
      try {
        const response = await fetch(feed.url);

        if (!response.ok) continue;

        const xml = await response.text();

        const items = xml.match(/<item[\s\S]*?<\/item>/gi) || [];

        for (const item of items.slice(0, 10)) {

          const get = (tag) => {
            const match = item.match(
              new RegExp(
                `<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`,
                "i"
              )
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

          // Procurar imagem dentro do RSS
          let image = "";

          const mediaContent = item.match(
            /<media:content[^>]+url=["']([^"']+)["']/i
          );

          const mediaThumbnail = item.match(
            /<media:thumbnail[^>]+url=["']([^"']+)["']/i
          );

          const enclosure = item.match(
            /<enclosure[^>]+url=["']([^"']+)["']/i
          );

          const imageTag = item.match(
            /<img[^>]+src=["']([^"']+)["']/i
          );

          if (mediaContent) {
            image = mediaContent[1];
          } else if (mediaThumbnail) {
            image = mediaThumbnail[1];
          } else if (enclosure) {
            image = enclosure[1];
          } else if (imageTag) {
            image = imageTag[1];
          }

          // Limpar HTML da descrição
          const cleanDescription = description
            .replace(/<[^>]*>/g, "")
            .replace(/\s+/g, " ")
            .trim();

          if (title && link) {
            articles.push({
              title,
              link,
              description: cleanDescription,
              pubDate: pubDate || new Date().toISOString(),
              date: pubDate || new Date().toISOString(),
              image,
              source: feed.source
            });
          }
        }

      } catch (error) {
        console.error("Erro no feed:", feed.url, error);
      }
    }

    // Ordenar pelas notícias mais recentes
    articles.sort((a, b) => {
      return new Date(b.pubDate) - new Date(a.pubDate);
    });

    return res.status(200).json({
      articles: articles.slice(0, 20)
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      articles: [],
      error: "Não foi possível carregar as notícias."
    });
  }
}
