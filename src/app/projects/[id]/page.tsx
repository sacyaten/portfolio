import { getProject, getProjects } from "@/lib/cms"
import Link from "next/link"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({ id: project.id }))
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = await getProject(id)

  if (!project) notFound()

  let techs: string[] = []
  try { techs = JSON.parse(project.techStack) } catch {}

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Link
        href="/projects"
        className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block"
      >
        ← Back to Projects
      </Link>

      <article>
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>

        {project.imageUrl && (
          <div className="w-full h-64 rounded-xl overflow-hidden mb-6 bg-gray-100 dark:bg-gray-800">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <p className="text-gray-600 dark:text-gray-400 mb-6 whitespace-pre-wrap">
          {project.description}
        </p>

        {techs.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {techs.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
            >
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm font-medium"
            >
              Source Code
            </a>
          )}
        </div>
      </article>
    </div>
  )
}
