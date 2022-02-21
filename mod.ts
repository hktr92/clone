import { App } from "./app.ts";

interface Cli {
  config: string;
  key: string;
  value?: string;
}

App.from(Deno.args)
  .config({
    name: "clone",
    version: "0.1.0",
    license: "GNU General Public License v3.0",
    author: "hktr92",
  })
  .command({
    name: "test",
    help: "echoes something",
    callback: () => console.log('command "test" called'),
  })
  .command({
    name: "default",
    help: "clones stuff",
    callback: () => console.log("default command called"),
  })
  .parse()
  .test();
