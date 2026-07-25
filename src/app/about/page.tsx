import { getPage, getSettings } from "@/lib/cms"

function renderMarkdown(text: string) {
  const html = text
    .replace(/### (.+)/g, "<h3 class='text-lg font-semibold mt-4 mb-2'>$1</h3>")
    .replace(/## (.+)/g, "<h2 class='text-xl font-semibold mt-5 mb-2'>$1</h2>")
    .replace(/# (.+)/g, "<h1 class='text-2xl font-bold mt-6 mb-3'>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/!\[(.+?)\]\((.+?)\)/g, "<img src='$2' alt='$1' class='max-w-full my-4 rounded' />")
    .replace(/\[(.+?)\]\((.+?)\)/g, "<a href='$2' class='text-blue-600 dark:text-blue-400 underline'>$1</a>")
    .replace(/^- (.+)/gm, "<li class='ml-4 list-disc'>$1</li>")
    .replace(/(.+)\n\n/g, "<p class='mb-3'>$1</p>")
    .replace(/(.+)\n/g, "<p class='mb-2'>$1</p>")
  return html
}

export default async function AboutPage() {
  const [page, settings] = await Promise.all([
    getPage("about"),
    getSettings(),
  ])

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="flex flex-col sm:flex-row gap-8 items-start mb-8">
        {settings.profile_image && (
          <img
            src={settings.profile_image}
            alt="Profile photo"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700 shrink-0"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold mb-4">
            {page?.title || "About Me"}
          </h1>
          {settings.about_summary && (
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {settings.about_summary}
            </p>
          )}
        </div>
      </div>
      {page?.content ? (
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(page.content) }}
        />
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          About page content hasn't been added yet.
        </p>
      )}
    </div>
  )
}
