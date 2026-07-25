import { getProjects } from "@/lib/cms"
import Link from "next/link"

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      {projects.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No projects yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
            >
              {project.imageUrl && (
                <div className="w-full h-40 rounded-lg overflow-hidden mb-4 bg-gray-100 dark:bg-gray-800">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <h2 className="font-semibold text-lg mb-2">{project.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                {project.description}
              </p>
              {project.techStack && (() => {
                let techs: string[] = []
                try { techs = JSON.parse(project.techStack) } catch {}
                return techs.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {techs.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null
              })()}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
