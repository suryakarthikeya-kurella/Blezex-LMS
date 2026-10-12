import DOMPurify from "dompurify";
const OK_EMBED = /^https:\/\/(www\.youtube-nocookie\.com|player\.vimeo\.com)\//;
DOMPurify.addHook("uponSanitizeElement", (node: any, data: any) => {
  if (data.tagName === "iframe" && !OK_EMBED.test(node.getAttribute?.("src") ?? "")) node.parentNode?.removeChild(node);
});
/** Sanitizes lesson HTML. Allows HTML + inline SVG; iframes only from YouTube-nocookie / Vimeo players. */
export const sanitizeHtml = (h: string) =>
  DOMPurify.sanitize(h ?? "", { USE_PROFILES: { html: true, svg: true, svgFilters: true }, ADD_TAGS: ["iframe"], ADD_ATTR: ["allowfullscreen", "frameborder", "allow"], FORBID_TAGS: ["style", "form", "object", "embed"] });
