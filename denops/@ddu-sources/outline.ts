import {
  ActionData,
  BaseSource,
  DduOptions,
  Denops,
  extract,
  getline,
  Item,
  SourceOptions,
  unified,
} from "../../deps.ts";
// TODO: Move to deps.ts
import remarkParse from "npm:remark-parse";

type Params = Record<never, never>;

export class Source extends BaseSource<Params> {
  override kind = "file";

  override gather(args: {
    denops: Denops;
    options: DduOptions;
    sourceOptions: SourceOptions;
    sourceParams: Params;
    input: string;
  }): ReadableStream<Item<ActionData>[]> {
    return new ReadableStream({
      async start(controller) {
        // Get all strings from buffer.
        const buf = await getline(args.denops, 1, "$");

        const extractMD = (text: string[]) => {
          const joined = text.join("\n");

          // HACK: Checking frontMatter
          if (text[0].indexOf("---") == -1) {
            return joined;
          } else {
            const { body } = extract(joined);
            return body;
          }
        };

        const md = extractMD(buf);

        // Parse and build markdown AST.
        const file = unified()
          .use(remarkParse)
          .parse(md);

        // Collect all heading.
        const nodes = file.children.filter((node) => node.type == "heading");

        // Extract metadata and push to queue.
        controller.enqueue(nodes.map((n) => {
          return {
            word: n.children[0].value,
            action: {
              lineNr: n.position.start.line,
            },
          };
        }));

        controller.close();
      },
    });
  }

  override params(): Params {
    return {};
  }
}
