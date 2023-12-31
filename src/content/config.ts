// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';
// 2. Define your collection(s)
const projectsCollection = defineCollection({ 
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url_live: z.string().optional(),
    url_source: z.string().optional(),
    image: z.string().optional(),
  })
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'projects': projectsCollection,
};