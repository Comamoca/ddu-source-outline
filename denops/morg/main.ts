import { Denops, Entrypoint, execute, is, ensure } from "../../deps.ts";
import remarkParse from "npm:remark-parse";
import { unified } from "npm:unified";
import { call, getline, line } from "jsr:@denops/std/function";
import { replaceToLongName } from "../langtable.ts";

export const main: Entrypoint = (denops) => {
  console.log("blockrun");

  denops.dispatcher = {
    async tangleAll(): Promise<string> {
      const buf = await getline(denops, 1, "$");

      const file = unified()
        .use(remarkParse)
        .parse(buf.join("\n"));


      const codeBlock = file.children.filter((node) => node.type == "code");
      const rawCode = codeBlock.map((node) => node.value).join("\n");


      return await Promise.resolve(rawCode);
    },
    async run(): Promise<unknown> {
      const cursorPos = await line(denops, ".")

      const codeBlock = await call(denops, "denops#request", [
        denops.name,
        "context_codeblock",
        [cursorPos],
      ]) as { lang: string; src: string } | number;

      if (!is.Number(codeBlock)) {
        // Call quickrun
        await call(denops, "quickrun#run", [{
          type: replaceToLongName(codeBlock.lang),
          src: codeBlock.src,
        }, []]);
      } else {
        console.log("Cursor is not over code block.");
      }

      return await Promise.resolve();
    },
    async context_codeblock(cursorLinePos: unknown): Promise<unknown> {
      const buf = await getline(denops, 1, "$");

      const file = unified()
        .use(remarkParse)
        .parse(buf.join("\n"));

      const codeBlock = file.children
        .filter((node) => node.type == "code")
        .filter((n) => {
          if (!is.Undefined(n.position)) {
            // Get current cursor line number.
            const cursorPos = ensure(cursorLinePos, is.Number)
            const start = n.position.start.line;
            const end = n.position.end.line;

            if (start <= cursorPos && cursorPos <= end) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        });

      if (!is.Undefined(codeBlock[0])) {
        return await Promise.resolve({
          src: codeBlock[0].value,
          lang: codeBlock[0].lang,
        });
      } else {
        return await Promise.resolve(-1);
      }
    },
  };
};
