import {
  ActionData,
  BaseSource,
  DduOptions,
  Denops,
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

        // Parse and build markdown AST.
        const file = unified()
          .use(remarkParse)
          .parse(buf.join("\n"));

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
