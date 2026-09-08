export interface RouteContext {
  literalRoutes: Set<string>;
  staticFiles: Set<string>;
  blogSlugs: Set<string>;
  blogLastPage: number;
  projectSlugs: Set<string>;
  tagSlugs: Set<string>;
  categorySlugs: Set<string>;
  categorySubjectSlugs: Set<string>;
  conceptSlugs: Set<string>;
  phaseIds: Set<string>;
}

export interface RouteContextInput {
  literalRoutes: Iterable<string>;
  staticFiles: Iterable<string>;
  blogSlugs: Iterable<string>;
  nonDraftBlogCount: number;
  blogPageSize?: number;
  projectSlugs: Iterable<string>;
  blogTags: Iterable<string>;
  projectTags: Iterable<string>;
  blogCategories: Iterable<string>;
  blogSubjectsByCategory: Iterable<[string, string]>;
  phaseIds: Iterable<string | number>;
}

export function slugifyParam(value: string): string {
  return value.toLowerCase().replace(/\s+/g, '-');
}

export function buildRouteContext(input: RouteContextInput): RouteContext {
  const pageSize = input.blogPageSize ?? 10;
  const tagSlugs = new Set<string>();
  for (const tag of input.blogTags) tagSlugs.add(slugifyParam(tag));
  for (const tag of input.projectTags) tagSlugs.add(slugifyParam(tag));

  const categorySlugs = new Set<string>();
  for (const category of input.blogCategories) {
    categorySlugs.add(slugifyParam(category));
  }

  const categorySubjectSlugs = new Set<string>();
  for (const [category, subject] of input.blogSubjectsByCategory) {
    categorySubjectSlugs.add(`${slugifyParam(category)}/${slugifyParam(subject)}`);
  }

  const conceptSlugs = new Set<string>();
  for (const tag of input.blogTags) conceptSlugs.add(tag.toLowerCase());

  return {
    literalRoutes: new Set(input.literalRoutes),
    staticFiles: new Set(input.staticFiles),
    blogSlugs: new Set(input.blogSlugs),
    blogLastPage: Math.max(1, Math.ceil(input.nonDraftBlogCount / pageSize)),
    projectSlugs: new Set(input.projectSlugs),
    tagSlugs,
    categorySlugs,
    categorySubjectSlugs,
    conceptSlugs,
    phaseIds: new Set(Array.from(input.phaseIds, String))
  };
}

export function resolveRoutePath(url: string, ctx: RouteContext): boolean {
  if (ctx.literalRoutes.has(url)) return true;
  if (ctx.staticFiles.has(url)) return true;

  if (url.startsWith('/blog/')) {
    const rest = url.slice('/blog/'.length);
    if (ctx.blogSlugs.has(rest)) return true;
    if (/^\d+$/.test(rest)) {
      const page = Number(rest);
      return page >= 2 && page <= ctx.blogLastPage;
    }
    return false;
  }
  if (url.startsWith('/projects/')) {
    return ctx.projectSlugs.has(url.slice('/projects/'.length));
  }
  if (url.startsWith('/tags/')) {
    return ctx.tagSlugs.has(url.slice('/tags/'.length));
  }
  if (url.startsWith('/categories/')) {
    const rest = url.slice('/categories/'.length);
    if (ctx.categorySlugs.has(rest)) return true;
    return ctx.categorySubjectSlugs.has(rest);
  }
  if (url.startsWith('/web3/concept/')) {
    return ctx.conceptSlugs.has(url.slice('/web3/concept/'.length));
  }
  if (url.startsWith('/web3/phase/')) {
    return ctx.phaseIds.has(url.slice('/web3/phase/'.length));
  }
  return false;
}
