import express from "express";
import path from "node:path";

const app = express();
const port = Number(process.env.PORT ?? 8080);
const staticDir = process.env.STATIC_DIR ?? path.resolve(process.cwd(), "apps/web/dist");

app.disable("x-powered-by");

app.get("/healthz", (_request, response) => {
  response.status(200).type("text/plain").send("ok");
});

app.use(
  express.static(staticDir, {
    immutable: true,
    maxAge: "1y",
    setHeaders(response, filePath) {
      if (filePath.endsWith("index.html")) {
        response.setHeader("Cache-Control", "no-store");
      }
    },
  }),
);

app.get("*", (_request, response) => {
  response.sendFile(path.join(staticDir, "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`TriveniLondon server listening on port ${port}`);
});
