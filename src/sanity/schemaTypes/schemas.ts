import { defineArrayMember, defineField, defineType } from "sanity";

const seoFields = [
  defineField({ name: "seoTitle", title: "SEO title", type: "string", validation: (rule) => rule.max(60) }),
  defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3, validation: (rule) => rule.max(160) }),
  defineField({ name: "socialImage", title: "Social image", type: "image", options: { hotspot: true } }),
];

const portableBody = defineField({
  name: "body",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({ type: "block" }),
    defineArrayMember({ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", validation: (rule) => rule.required() })] }),
  ],
});

export const brandImage = defineType({
  name: "brandImage",
  title: "Brand image",
  type: "object",
  fields: [
    defineField({ name: "asset", title: "Image", type: "image", options: { hotspot: true }, validation: (rule) => rule.required() }),
    defineField({ name: "alt", title: "Alternative text", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "sourceType", title: "Source type", type: "string", options: { list: [{ title: "Real photography", value: "real" }, { title: "Representative campaign imagery", value: "representative" }], layout: "radio" }, validation: (rule) => rule.required() }),
    defineField({ name: "visibleDisclosure", title: "Visible disclosure", type: "string", hidden: ({ parent }) => parent?.sourceType !== "representative" }),
    defineField({ name: "usage", type: "string", options: { list: ["hero", "culture", "service", "case-study", "team"] }, validation: (rule) => rule.required() }),
    defineField({ name: "focalPoint", type: "object", fields: [defineField({ name: "x", type: "number", validation: (rule) => rule.min(0).max(1) }), defineField({ name: "y", type: "number", validation: (rule) => rule.min(0).max(1) })] }),
  ],
  validation: (rule) => rule.custom((value) => value?.sourceType === "representative" && !value?.visibleDisclosure ? "Representative imagery requires a visible disclosure." : true),
});

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "summary", type: "text", rows: 3, validation: (rule) => rule.required().max(220) }),
    defineField({ name: "role", title: "Nexveins role", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "cover", title: "Approved cover image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", validation: (rule) => rule.required() })] }),
    defineField({ name: "gallery", type: "array", of: [defineArrayMember({ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", validation: (rule) => rule.required() })] })] }),
    defineField({ name: "outcomes", title: "Verified outcomes", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "clientApproved", title: "Client approval confirmed", type: "boolean", initialValue: false }),
    defineField({ name: "publishReady", title: "Publish ready", type: "boolean", initialValue: false }),
    portableBody,
    ...seoFields,
  ],
  validation: (rule) =>
    rule.custom((document) => {
      if (!document?.featured && !document?.publishReady) return true;
      const missing = ["summary", "role", "cover", "outcomes", "clientApproved"].filter((field) => !document[field]);
      return missing.length ? `Featured or publish-ready case studies require: ${missing.join(", ")}.` : true;
    }),
  preview: { select: { title: "title", subtitle: "role", media: "cover" } },
});

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "summary", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "capabilities", type: "array", of: [defineArrayMember({ type: "string" })], validation: (rule) => rule.min(1) }),
    portableBody,
    ...seoFields,
  ],
  preview: { select: { title: "title", subtitle: "summary" } },
});

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "topic", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "excerpt", type: "text", rows: 3, validation: (rule) => rule.required().max(220) }),
    defineField({ name: "publishedAt", type: "datetime", validation: (rule) => rule.required() }),
    defineField({ name: "readingMinutes", type: "number", validation: (rule) => rule.required().integer().positive() }),
    defineField({ name: "author", type: "reference", to: [{ type: "person" }] }),
    defineField({ name: "publicationState", type: "string", options: { list: ["draft", "review", "published"] }, initialValue: "draft", validation: (rule) => rule.required() }),
    portableBody,
    ...seoFields,
  ],
  preview: { select: { title: "title", subtitle: "topic", media: "socialImage" } },
});

export const job = defineType({
  name: "job",
  title: "Job",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "location", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "employmentType", type: "string", options: { list: ["Full-time", "Part-time", "Contract", "Internship"] }, validation: (rule) => rule.required() }),
    defineField({ name: "applicationUrl", type: "url", validation: (rule) => rule.required() }),
    defineField({ name: "open", type: "boolean", initialValue: true }),
    defineField({ name: "publicationState", type: "string", options: { list: ["draft", "review", "published"] }, initialValue: "draft", validation: (rule) => rule.required() }),
    portableBody,
    ...seoFields,
  ],
});

export const person = defineType({
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "bio", type: "text", rows: 4 }),
    defineField({ name: "photo", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", validation: (rule) => rule.required() })] }),
    defineField({ name: "linkedinUrl", type: "url" }),
    defineField({ name: "consentStatus", type: "string", options: { list: ["pending", "approved", "withdrawn"] }, initialValue: "pending", validation: (rule) => rule.required() }),
    defineField({ name: "publicationState", type: "string", options: { list: ["draft", "review", "published"] }, initialValue: "draft", validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", initialValue: "Nexveins", validation: (rule) => rule.required() }),
    defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "contactEmail", type: "email" }),
    defineField({ name: "calUrl", title: "Cal.com URL", type: "url" }),
    defineField({ name: "location", type: "string", initialValue: "Sahiwal, Pakistan", validation: (rule) => rule.required() }),
    defineField({ name: "verifiedAddress", type: "text", rows: 2 }),
    defineField({ name: "contactMethods", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "label", type: "string", validation: (rule) => rule.required() }), defineField({ name: "value", type: "string", validation: (rule) => rule.required() }), defineField({ name: "href", type: "string", validation: (rule) => rule.required() })] })] }),
    defineField({ name: "socialLinks", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "label", type: "string", validation: (rule) => rule.required() }), defineField({ name: "href", type: "url", validation: (rule) => rule.required() })] })] }),
    defineField({ name: "representativeImageDisclosure", type: "string", initialValue: "Representative campaign imagery. Nexveins is based in Sahiwal, Pakistan.", validation: (rule) => rule.required() }),
    defineField({ name: "defaultSocialImage", type: "image", options: { hotspot: true } }),
    ...seoFields,
  ],
});

export const navigation = defineType({
  name: "navigation",
  title: "Navigation and footer",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "navigation", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "label", type: "string", validation: (rule) => rule.required() }), defineField({ name: "href", type: "string", validation: (rule) => rule.required() }), defineField({ name: "publicationState", type: "string", options: { list: ["draft", "review", "published"] }, initialValue: "draft", validation: (rule) => rule.required() })] })] }),
    defineField({ name: "footerNote", type: "text", rows: 2 }),
  ],
});

