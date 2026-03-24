import { type SchemaTypeDefinition } from "sanity";

import { companyInfo } from "./companyInfo";
import { heroSlide } from "./heroSlide";
import { service } from "./service";
import { project } from "./project";
import { category } from "./category";
import { post } from "./post";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [companyInfo, heroSlide, service, project, category, post],
};
