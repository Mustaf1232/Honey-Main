import { Fragment } from "react";
import { Text } from "slate";
import { CMSLink } from "@/components/link/";
import { Label } from "@/components/ui/label";
import Image from "next/image";
// Typing for the "Leaf" type, which represents a single node in the document.
type Leaf = {
  type?: string; // The type of the node (e.g., "h1", "p", "link", etc.)
  value?: {
    url: string;
    alt: string;
  };
  children?: Children; // Recursively allows for children nodes (other "Leaf" nodes or strings).
  url?: string;
  linkType?: "internal" | "external"; // Optional field for type of link
  doc?: unknown; // The referenced document for internal links (can be further typed if needed)
  newTab?: boolean; // Whether the link should open in a new tab
  [key: string]: unknown; // Additional unknown properties for flexibility
};

// Typing for the "Children" type, which can be an array of either `Leaf` nodes or strings.
export type Children = (Leaf | string)[];

const Serialize = (children?: Children): React.ReactNode[] =>
  children?.map((node, i) => {
    if (Text.isText(node)) {
      let text = (
        <span
          key={i}
          dangerouslySetInnerHTML={{ __html: node.text as string }}
        />
      );

      if (node.bold) {
        text = <strong key={i}>{text}</strong>;
      }
      //@ts-expect-error : code is not in node
      if (node.code) {
        text = <br />;
      }
      //@ts-expect-error : italic is not in node
      if (node.italic) {
        text = <em key={i}>{text}</em>;
      }
      //@ts-expect-error : underline is not in node
      if (node.underline) {
        text = (
          <span className="underline" key={i}>
            {text}
          </span>
        );
      }
      //@ts-expect-error : strikethrough is not in node
      if (node.strikethrough) {
        text = (
          <span className="line-through" key={i}>
            {text}
          </span>
        );
      }

      return <Fragment key={i}>{text}</Fragment>;
    }

    if (!node) {
      return null;
    }
    //@ts-expect-error : type is not in node
    switch (node.type) {
      case "h1":
        return (
          <h1
            key={i}
            className=" md:text-7xl text-5xl tracking-wide font-semibold"
          >
            {/* @ts-expect-error : children is not in node */}
            {Serialize(node?.children)}
          </h1>
        );
      case "h2":
        return (
          <h2
            key={i}
            className="md:text-6xl text-4xl tracking-wide font-medium "
          >
            {/* @ts-expect-error : children is not in node */}
            {Serialize(node?.children)}
          </h2>
        );
      case "h3":
        return (
          <h3 className="md:text-5xl text-3xl tracking-wide" key={i}>
            {/* @ts-expect-error : children is not in node */}
            {Serialize(node?.children)}
          </h3>
        );
      case "h4":
        return (
          <h4 className="md:text-4xl text-2xl tracking-wide py-2" key={i}>
            {/* @ts-expect-error : children is not in node */}
            {Serialize(node?.children)}
          </h4>
        );
      case "h5":
        return (
          <h5 className="md:text-3xl text-xl tracking-wide" key={i}>
            {/* @ts-expect-error : children is not in node */}
            {Serialize(node?.children)}
          </h5>
        );
      case "h6":
        return (
          <h6 className=" text-xl tracking-wide" key={i}>
            {/* @ts-expect-error : children is not in node */}
            {Serialize(node?.children)}
          </h6>
        );
      case "quote":
        return (
          <blockquote className=" italic" key={i}>
            {/* @ts-expect-error : children is not in node */}
            {Serialize(node?.children)}
          </blockquote>
        );
      case "ul":
        return (
          <ul className="list-disc list-outside pt-4 ml-4" key={i}>
            {/* @ts-expect-error : children is not in node */}
            {Serialize(node?.children)}
          </ul>
        );
      case "ol":
        return (
          <ol className="list-decimal list-outside pt-4 ml-4" key={i}>
            {/* @ts-expect-error : children is not in node */}
            {Serialize(node.children)}
          </ol>
        );
      case "li":
        return (
          <li key={i} className="pl-4 pb-4">
            {/* @ts-expect-error : children is not in node */}
            {Serialize(node.children)}
          </li>
        );
      case "link":
        // @ts-expect-error : url not in node
        if (validateYouTubeUrl({ url: node.url }) !== false) {
          return (
            <>
              <CMSLink
                key={i}
                // @ts-expect-error : linktype not in node
                type={node.linkType === "internal" ? "reference" : "custom"}
                // @ts-expect-error : url not in noode
                url={node.url}
                // @ts-expect-error : doc not in node
                reference={node.doc}
                // @ts-expect-error : newTab not in node
                newTab={Boolean(node?.newTab)}
                className="text-blue-500 underline"
              >
                {/* @ts-expect-error : children not in ode  */}
                {Serialize(node?.children)}
              </CMSLink>
              <iframe
                key={i}
                // @ts-expect-error : url is not in node
                src={validateYouTubeUrl({ url: node.url as string })}
                width="100%"
                height="100%"
                className="aspect-video rounded-lg mt-4"
              />
            </>
          );
        }
        return (
          <CMSLink
            key={i}
            // @ts-expect-error : linktype
            type={node.linkType === "internal" ? "reference" : "custom"}
            // @ts-expect-error : url
            url={node.url}
            // @ts-expect-error : doc
            reference={node.doc}
            // @ts-expect-error: newtab
            newTab={Boolean(node?.newTab)}
          >
            {/* @ts-expect-error : children */}
            {Serialize(node?.children)}
          </CMSLink>
        );

      case "label":
        // @ts-expect-error : children not in node
        return <Label key={i}>{Serialize(node?.children)}</Label>;

      case "large-body": {
        // @ts-expect-error : children not in node
        return <p key={i}>{Serialize(node?.children)}</p>;
      }
      case "upload": {
        return (
          <Image
            key={i}
            src={
              (process.env.NEXT_PUBLIC_CMS_URL as string) +
              // @ts-expect-error : value url not in node
              node.value?.url
            }
            // @ts-expect-error : value url not in node
            alt={(node.value?.alt as string) ?? "image"}
          />
        );
      }

      // case "relationship": {
      //   return (
      //     <Link key={i} href={`/reports/${node.value?.value}`}>
      //       {Serialize(node?.children)}
      //     </Link>
      //   );
      // }
      default:
        // @ts-expect-error : children is not in node
        return <p key={i}>{node?.children ? Serialize(node?.children) : ""}</p>;
    }
  }) || [];

export default Serialize;

function validateYouTubeUrl({ url }: { url: string | undefined }) {
  if (url === undefined || url === "") {
    return false;
  }
  if (url != undefined || url != "") {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length == 11) {
      // Do anything for being valid
      // if need to change the url to embed url then use below line
      return "https://www.youtube.com/embed/" + match[2] + "?autoplay=0";
    } else {
      return false;
    }
  }
}
