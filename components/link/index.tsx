import React from "react";
import { Link } from "@/i18n/routing";

type CMSLinkType = {
  type?: "custom" | "reference";
  url?: string;
  newTab?: boolean;
  reference?: {
    value: string;
    relationTo: "pages";
  };
  label?: string;
  appearance?: "default" | "primary" | "secondary" | "tertiary";
  children?: React.ReactNode;
  className?: string;
  invert?: boolean;
};
import { Button } from "@/components/ui/button";

export const CMSLink = ({
  type,
  url,
  newTab,
  reference,
  label,
  appearance,
  children,
  className,
}: CMSLinkType) => {
  const href =
    type === "reference" &&
    typeof reference?.value === "object" &&
    reference.value
      ? `${
          reference?.relationTo !== "pages" ? `/${reference?.relationTo}` : ""
        }/${reference.value}`
      : url;

  if (!href) return null;

  if (!appearance) {
    const newTabProps = newTab
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    if (href || url) {
      return (
        <Link {...newTabProps} href={href} className={className}>
          {label && label}
          {children && children}
        </Link>
      );
    }
  }
  return <Button className={className}> {label} </Button>;
};
