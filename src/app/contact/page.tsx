import { getSettings } from "@/lib/cms"

export default async function ContactPage() {
  const settings = await getSettings()

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Contact Me</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Have a question or want to work together? Feel free to reach out.
      </p>

      <div className="space-y-6">
        {settings.contact_email && (
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</h2>
            <a
              href={`mailto:${settings.contact_email}`}
              className="text-blue-600 dark:text-blue-400 hover:underline text-lg"
            >
              {settings.contact_email}
            </a>
          </div>
        )}
        {settings.contact_phone && (
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Phone</h2>
            <p className="text-lg">{settings.contact_phone}</p>
          </div>
        )}
        <div className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Social</h2>
          <div className="flex gap-4">
            {settings.github_url && (
              <a
                href={settings.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                GitHub
              </a>
            )}
            {settings.linkedin_url && (
              <a
                href={settings.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                LinkedIn
              </a>
            )}
            {settings.twitter_url && (
              <a
                href={settings.twitter_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Twitter
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
