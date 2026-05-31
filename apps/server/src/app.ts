import express from "express";
import path from "node:path";
import routes from "./routes/index.js";

const app = express();
const staticDir = process.env.STATIC_DIR ?? path.resolve(process.cwd(), "apps/web/dist");

app.disable("x-powered-by");
app.use(express.json());

app.get("/healthz", (_request, response) => {
  response.status(200).type("text/plain").send("ok");
});

app.use("/api", routes);

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

export default app;
