const CMS_URL = process.env.CMS_URL || "http://localhost:3001"

export interface Page {
  id: string
  slug: string
  title: string
  content: string
  published: boolean
  updatedAt: string
}

export interface Project {
  id: string
  title: string
  description: string
  techStack: string
  imageUrl: string
  liveUrl: string
  githubUrl: string
  sortOrder: number
  published: boolean
  updatedAt: string
}

export interface SiteSettings {
  profile_image?: string
  hero_title?: string
  hero_subtitle?: string
  about_summary?: string
  contact_email?: string
  contact_phone?: string
  github_url?: string
  linkedin_url?: string
  twitter_url?: string
}

async function fetchCMS(path: string) {
  const res = await fetch(`${CMS_URL}/api/${path}`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`)
  return res.json()
}

export async function getPage(slug: string): Promise<Page | null> {
  try {
    return await fetchCMS(`pages/${slug}`)
  } catch {
    return null
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const projects = await fetchCMS("projects")
    return projects.filter((p: Project) => p.published)
  } catch {
    return []
  }
}

export async function getProject(id: string): Promise<Project | null> {
  try {
    return await fetchCMS(`projects/${id}`)
  } catch {
    return null
  }
}

export async function getSettings(): Promise<SiteSettings> {
  try {
    return await fetchCMS("settings")
  } catch {
    return {}
  }
}
