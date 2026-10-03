import type { SchemaTypeDefinition } from "sanity";

import {
  article,
  brandImage,
  caseStudy,
  job,
  navigation,
  person,
  service,
  siteSettings,
} from "./schemas";

export const schemaTypes: SchemaTypeDefinition[] = [
  brandImage,
  caseStudy,
  service,
  article,
  job,
  person,
  siteSettings,
  navigation,
];

