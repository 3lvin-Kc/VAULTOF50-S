import Link from 'next/link';
import { generateBreadcrumbSchema } from '@/src/lib/schemas';

interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  const schema = generateBreadcrumbSchema(items);

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap gap-2 items-center text-sm mb-4"
      >
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {item.url ? (
              <Link
                href={item.url}
                className="font-mono text-[11px] uppercase tracking-[2px] text-blue-600 hover:text-blue-700 transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <span
                className="font-mono text-[11px] uppercase tracking-[2px] text-gray-600"
                aria-current="page"
              >
                {item.name}
              </span>
            )}
            {index < items.length - 1 && (
              <span
                className="font-mono text-[11px] text-gray-400"
                aria-hidden="true"
              >
                /
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
    </>
  );
}
