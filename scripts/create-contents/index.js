import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { request } from "undici";
import pThrottle from "p-throttle";
import { fetchHygraph } from "./libs/fetch";
import "dotenv/config";

// ローカルのJSONからHygraphにコンテンツを登録するスクリプト。
// CommunityプランではHygraphのrate limit(5 req/seq)に引っかかるので、
// 300msに1回ずつリクエストする。
const throttledRequest = pThrottle({
  limit: 1,
  interval: 300,
})(request);

const fetchHygraph = async ({ query, variables }) => {
  const res = await throttledRequest(
    "https://api-ap-northeast-1.hygraph.com/v2/clf9ej9ti0tev01upfsb73kfm/master",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HYGRAPH_MUTATION_PAT}`,
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  if (res.statusCode >= 400)
    throw new Error(await res.body.text());

  return res.body.json();
};

const main = async () => {
  const __dirname = dirname(
    new URL(import.meta.url).pathname
  );

  console.log("--- Read authors.");
  const authors = JSON.parse(
    await readFile(resolve(__dirname, "./author.json"), {
      encoding: "utf-8",
    })
  );
  console.log("--> Completed.");

  console.log("--- Write authors.");
  await Promise.all(
    authors.map((author) =>
      fetchHygraph({
        query: `
          mutation ($slug: String! $name: String!){
            createAuthor(data: {slug: $slug, name: $name}) { id }
          }
        `,
        variables: { ...author },
      })
    )
  );
  console.log("--> Completed.");

  console.log("--- Read news.");
  const newses = JSON.parse(
    await readFile(resolve(__dirname, "./news.json"), {
      encoding: "utf-8",
    })
  );
  console.log("--> Completed.");

  console.log("--- Write news.");
  await Promise.all(
    newses.map((news) =>
      fetchHygraph({
        query: `
          mutation ($slug: String! $title: String! $body: String! $author: String!){
            createNews(data: {
              slug: $slug,
              title: $title,
              body: $body,
              author: {
                connect: { slug: $author }
              }
            }) { id }
          }
        `,
        variables: { ...news },
      })
    )
  );
  console.log("--> Completed.");
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
