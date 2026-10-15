import type { Dictionary } from "@/lib/dictionaries";
import { buttonClasses } from "../ui/Button";
import { Icon } from "../ui/Icon";

export function Pagination({
  page,
  total,
  labels,
  onPage,
}: {
  page: number;
  total: number;
  labels: Dictionary["listing"];
  onPage: (page: number) => void;
}) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  const btn =
    "tap inline-flex items-center justify-center gap-1.5 rounded-full border px-4 font-display text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-40";
  const step = buttonClasses("secondary", "", "sm");
  return (
    <nav aria-label={labels.pagination} className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPage(page - 1)}
          disabled={page <= 1}
          className={step}
        >
          <Icon name="chevronLeft" size={18} />
          <span className="hidden sm:inline">{labels.previous}</span>
          <span className="sr-only sm:hidden">{labels.previous}</span>
        </button>
        <ul className="hidden items-center gap-1 sm:flex">
          {pages.map((p) => (
            <li key={p}>
              <button
                type="button"
                onClick={() => onPage(p)}
                aria-current={p === page ? "page" : undefined}
                className={`${btn} min-w-11 px-0 ${
                  p === page ? "border-blue-800 bg-blue-800 text-white" : "border-transparent text-blue-900 hover:bg-blue-100"
                }`}
              >
                {p}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => onPage(page + 1)}
          disabled={page >= total}
          className={step}
        >
          <span className="hidden sm:inline">{labels.next}</span>
          <span className="sr-only sm:hidden">{labels.next}</span>
          <Icon name="chevronRight" size={18} />
        </button>
      </div>
      <p className="text-sm text-muted">
        {labels.pageOf.replace("{page}", String(page)).replace("{total}", String(total))}
      </p>
    </nav>
  );
}
