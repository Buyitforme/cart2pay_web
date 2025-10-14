import { createClient } from '@sanity/client'
import type { SanityClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.REACT_APP_SVC_PROJECT_ID!,
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
}) as SanityClient
