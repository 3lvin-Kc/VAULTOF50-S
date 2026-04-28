'use client';

import Link from "next/link";
import type { RelatedLink } from "../utils/relatedLinks";

interface Props {
  links: RelatedLink[];
}

const STYLES = `
  .related-links {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid #1a1a1a;
  }

  .related-links-heading {
    font-family: 'Space Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #555;
    margin-bottom: 1.25rem;
  }

  .related-links-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .related-links-item a {
    font-family: 'EB Garamond', Georgia, serif;
    font-size: 1rem;
    color: #888;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.2s;
  }

  .related-links-item a:hover {
    color: #F5F0E8;
  }

  .related-links-item a::before {
    content: '→';
    font-size: 0.75rem;
    color: #8B0000;
    font-family: 'Space Mono', monospace;
  }

  .related-links-badge {
    font-family: 'Space Mono', monospace;
    font-size: 0.5rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #333;
    border: 1px solid #1a1a1a;
    padding: 0.15rem 0.4rem;
    margin-left: 0.4rem;
    vertical-align: middle;
  }
`;

export function RelatedLinks({ links }: Props) {
  if (!links || links.length === 0) return null;

  return (
    <>
      <style>{STYLES}</style>
      <div className="related-links">
        <p className="related-links-heading">Related Reading</p>
        <ul className="related-links-list">
          {links.map((link) => (
            <li key={link.href} className="related-links-item">
              <Link href={link.href}>
                {link.label}
                <span className="related-links-badge">{link.type}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
