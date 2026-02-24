Regenerate the `public/llms.txt` and `public/llms-full.txt` files to reflect the current state of the website content.

## Steps

1. Read all pages in `src/pages/` (including subdirectories) and all components in `src/components/` to gather the current site content, copy, and product information.

2. Regenerate `public/llms.txt` — the lightweight index file:
   - Follow the llms.txt standard: H1 project name, blockquote summary, H2 sections with markdown links
   - Update links if any page routes were added, removed, or renamed
   - All links must use the base URL `https://www.in-parallel.com`
   - Keep sections: Product, Security & Compliance, Company, Resources, Optional

3. Regenerate `public/llms-full.txt` — the comprehensive content file:
   - Extract all product content from pages and components into clean markdown
   - Include: product description, how it works, integrations, pricing, security, company info, resources
   - Use factual, direct language — keep marketing copy but strip HTML
   - Organize with H2 sections and horizontal rules between major sections

4. Report what changed (new pages found, content updates, removed pages, etc.).
