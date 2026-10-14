import { showDemoContent } from "@/lib/site";
import type { ContentStatus } from "@/types/content";

/** published → always; demo → only when demo content is enabled; draft → never. */
export function isVisible(status: ContentStatus): boolean {
  if (status === "published") return true;
  if (status === "demo") return showDemoContent;
  return false;
}
