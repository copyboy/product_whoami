declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"agile-project-management.mdx": {
	id: "agile-project-management.mdx";
  slug: "agile-project-management";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"arraylist-source-analysis-optimization.mdx": {
	id: "arraylist-source-analysis-optimization.mdx";
  slug: "arraylist-source-analysis-optimization";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"cache-consistency-strategies.mdx": {
	id: "cache-consistency-strategies.mdx";
  slug: "cache-consistency-strategies";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"cloudflare-pages-deployment-guide-zh.mdx": {
	id: "cloudflare-pages-deployment-guide-zh.mdx";
  slug: "cloudflare-pages-deployment-guide-zh";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"concurrenthashmap-concurrent-mechanism.mdx": {
	id: "concurrenthashmap-concurrent-mechanism.mdx";
  slug: "concurrenthashmap-concurrent-mechanism";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"constraint-based-management.mdx": {
	id: "constraint-based-management.mdx";
  slug: "constraint-based-management";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"creators-alchemy-system.mdx": {
	id: "creators-alchemy-system.mdx";
  slug: "creators-alchemy-system";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"digital-tools-integration.mdx": {
	id: "digital-tools-integration.mdx";
  slug: "digital-tools-integration";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"distributed-transaction-patterns.mdx": {
	id: "distributed-transaction-patterns.mdx";
  slug: "distributed-transaction-patterns";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"effective-meeting-management.mdx": {
	id: "effective-meeting-management.mdx";
  slug: "effective-meeting-management";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"elasticsearch-distributed-search.mdx": {
	id: "elasticsearch-distributed-search.mdx";
  slug: "elasticsearch-distributed-search";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"evolution-heartbeat-system.mdx": {
	id: "evolution-heartbeat-system.mdx";
  slug: "evolution-heartbeat-system";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"gc-algorithms-tuning-practice.mdx": {
	id: "gc-algorithms-tuning-practice.mdx";
  slug: "gc-algorithms-tuning-practice";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"getting-started-with-astro.mdx": {
	id: "getting-started-with-astro.mdx";
  slug: "getting-started-with-astro";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"hashmap-source-analysis-optimization.mdx": {
	id: "hashmap-source-analysis-optimization.mdx";
  slug: "hashmap-source-analysis-optimization";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"jmm-memory-model-deep-dive.mdx": {
	id: "jmm-memory-model-deep-dive.mdx";
  slug: "jmm-memory-model-deep-dive";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"jvm-memory-structure-analysis.mdx": {
	id: "jvm-memory-structure-analysis.mdx";
  slug: "jvm-memory-structure-analysis";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"kafka-high-throughput-architecture.mdx": {
	id: "kafka-high-throughput-architecture.mdx";
  slug: "kafka-high-throughput-architecture";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"linkedlist-source-analysis.mdx": {
	id: "linkedlist-source-analysis.mdx";
  slug: "linkedlist-source-analysis";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"microservices-design-patterns.mdx": {
	id: "microservices-design-patterns.mdx";
  slug: "microservices-design-patterns";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"mysql-btree-index-principle.mdx": {
	id: "mysql-btree-index-principle.mdx";
  slug: "mysql-btree-index-principle";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"mysql-innodb-lock-mechanism.mdx": {
	id: "mysql-innodb-lock-mechanism.mdx";
  slug: "mysql-innodb-lock-mechanism";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"mysql-master-slave-replication.mdx": {
	id: "mysql-master-slave-replication.mdx";
  slug: "mysql-master-slave-replication";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"mysql-mvcc-mechanism.mdx": {
	id: "mysql-mvcc-mechanism.mdx";
  slug: "mysql-mvcc-mechanism";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"mysql-partitioning-sharding.mdx": {
	id: "mysql-partitioning-sharding.mdx";
  slug: "mysql-partitioning-sharding";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"mysql-performance-monitoring.mdx": {
	id: "mysql-performance-monitoring.mdx";
  slug: "mysql-performance-monitoring";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"mysql-query-optimization-explain.mdx": {
	id: "mysql-query-optimization-explain.mdx";
  slug: "mysql-query-optimization-explain";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"mysql-transaction-isolation-levels.mdx": {
	id: "mysql-transaction-isolation-levels.mdx";
  slug: "mysql-transaction-isolation-levels";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"okr-goal-management.mdx": {
	id: "okr-goal-management.mdx";
  slug: "okr-goal-management";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"pdca-continuous-improvement.mdx": {
	id: "pdca-continuous-improvement.mdx";
  slug: "pdca-continuous-improvement";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"pdca-knowledge-management.mdx": {
	id: "pdca-knowledge-management.mdx";
  slug: "pdca-knowledge-management";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"performance-optimization-practices.mdx": {
	id: "performance-optimization-practices.mdx";
  slug: "performance-optimization-practices";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"problem-solving-5w2h.mdx": {
	id: "problem-solving-5w2h.mdx";
  slug: "problem-solving-5w2h";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"pyramid-principle-communication.mdx": {
	id: "pyramid-principle-communication.mdx";
  slug: "pyramid-principle-communication";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"rabbitmq-message-reliability.mdx": {
	id: "rabbitmq-message-reliability.mdx";
  slug: "rabbitmq-message-reliability";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"redis-cache-design-patterns.mdx": {
	id: "redis-cache-design-patterns.mdx";
  slug: "redis-cache-design-patterns";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"redis-cluster-high-availability.mdx": {
	id: "redis-cluster-high-availability.mdx";
  slug: "redis-cluster-high-availability";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"redis-data-structures-memory-optimization.mdx": {
	id: "redis-data-structures-memory-optimization.mdx";
  slug: "redis-data-structures-memory-optimization";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"redis-persistence-rdb-aof.mdx": {
	id: "redis-persistence-rdb-aof.mdx";
  slug: "redis-persistence-rdb-aof";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"service-mesh-istio-analysis.mdx": {
	id: "service-mesh-istio-analysis.mdx";
  slug: "service-mesh-istio-analysis";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"spring-singleton-thread-safety.mdx": {
	id: "spring-singleton-thread-safety.mdx";
  slug: "spring-singleton-thread-safety";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"star-behavioral-interview.mdx": {
	id: "star-behavioral-interview.mdx";
  slug: "star-behavioral-interview";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"swot-strategic-analysis.mdx": {
	id: "swot-strategic-analysis.mdx";
  slug: "swot-strategic-analysis";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"synchronized-deep-dive.mdx": {
	id: "synchronized-deep-dive.mdx";
  slug: "synchronized-deep-dive";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"team-performance-management.mdx": {
	id: "team-performance-management.mdx";
  slug: "team-performance-management";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"threadlocal-memory-leak-prevention.mdx": {
	id: "threadlocal-memory-leak-prevention.mdx";
  slug: "threadlocal-memory-leak-prevention";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"threadpool-principles-best-practices.mdx": {
	id: "threadpool-principles-best-practices.mdx";
  slug: "threadpool-principles-best-practices";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"time-management-prioritization.mdx": {
	id: "time-management-prioritization.mdx";
  slug: "time-management-prioritization";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"volatile-memory-visibility.mdx": {
	id: "volatile-memory-visibility.mdx";
  slug: "volatile-memory-visibility";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"workplace-sop-overview.mdx": {
	id: "workplace-sop-overview.mdx";
  slug: "workplace-sop-overview";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
};
"projects": {
"modern-blog-template.mdx": {
	id: "modern-blog-template.mdx";
  slug: "modern-blog-template";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
