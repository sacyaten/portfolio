import { getSettings, getProjects } from "@/lib/cms"
import Link from "next/link"

export default async function HomePage() {
  const [settings, projects] = await Promise.all([
    getSettings(),
    getProjects(),
  ])

  const featured = projects.slice(0, 3)

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <section className="text-center mb-20">
        {settings.profile_image && (
          <img
            src={settings.profile_image}
            alt="Profile photo"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover mx-auto mb-6 border-4 border-gray-200 dark:border-gray-700"
          />
        )}
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          {settings.hero_title || "Hello, I'm a Developer"}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {settings.hero_subtitle || ""}
        </p>
      </section>

      {featured.length > 0 && (
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((project) => (
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
                <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {project.description}
                </p>
              </Link>
            ))}
          </div>
          {projects.length > 3 && (
            <div className="text-center mt-8">
              <Link
                href="/projects"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                View all projects →
              </Link>
            </div>
          )}
        </section>
      )}

      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Let's Work Together</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Have a project in mind? Let's build something great.
        </p>
        <Link
          href="/contact"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
        >
          Get in Touch
        </Link>
      </section>
    </div>
  )
}
