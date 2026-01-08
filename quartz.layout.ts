import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    //links: {
    //  GitHub: "https://github.com/jackyzha0/quartz",
    //  "Discord Community": "https://discord.gg/cRFFHYye7t",
    //},
  }),
}

// Configuração da ordem personalizada (Pastas e arquivos misturados por ordem alfabética/numérica)
const explorerConfiguration = {
  sortFn: (a, b) => {
    const nameA = a.displayName.toLowerCase()
    const nameB = b.displayName.toLowerCase()
    return nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: 'base' })
  },
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    //Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    // AQUI ESTÁ A MUDANÇA: Explorer com configuração de ordem
    Component.Explorer(explorerConfiguration),
  ],
  right: [
    //Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    // AQUI TAMBÉM: Explorer com configuração de ordem
    Component.Explorer(explorerConfiguration),
  ],
  right: [],
}