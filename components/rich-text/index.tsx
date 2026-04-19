import Serialize from "./serialize";
import React from "react";
import type { Children } from "./serialize";
const RichText: React.FC<{ className?: string; content: Children }> = ({
  className,
  content,
}) => {
  if (!content) return null;
  return <div className={`${className} select-none`}>{Serialize(content)}</div>;
};
export default RichText;
