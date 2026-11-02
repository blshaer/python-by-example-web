import { permanentRedirect } from "next/navigation";
import { firstLessonHref } from "@/lib/content";

export default function LearnIndex() {
  permanentRedirect(firstLessonHref());
}
