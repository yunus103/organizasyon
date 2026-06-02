import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId: projectId || '', dataset: dataset || '' })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

export const urlForImage = (source: SanityImageSource) => {
  return builder.image(source)
}

export const getImageLqip = (source: any) => {
  if (!source) return undefined;
  try {
    return builder.image(source).width(20).quality(20).blur(10).url();
  } catch {
    return undefined;
  }
}
