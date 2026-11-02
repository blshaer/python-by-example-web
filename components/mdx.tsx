import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { Pre } from "@/components/copy-code";

const prettyCodeOptions = {
  theme: "github-dark-dimmed",
  keepBackground: false,
  defaultLang: "python",
};

export function Mdx({ source }: { source: string }) {
  return (
    <div className="mdx">
      <MDXRemote
        source={source}
        components={{ pre: Pre }}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
          },
        }}
      />
    </div>
  );
}
