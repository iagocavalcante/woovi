import "dotenv/config";
import { connectDatabase } from "./database";
import { createServer } from "http";
import { server } from "./server";
(async () => {
  await connectDatabase();
  const PORT = process.env.PORT as string;
  const serverFactory = createServer(server.callback());
  console.log(PORT);
  serverFactory.listen(PORT, () => {
    console.log("Server is running");
  });
})();
