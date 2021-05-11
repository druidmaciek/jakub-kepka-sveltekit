import StoryblokClient from 'storyblok-js-client'
 
const client = new StoryblokClient({
  accessToken: 'KxvPHENMsmwwwKgGllYrDgtt'
})
 
export const defaultRequestConfig = {
  version: 'draft'
}
 
export default client