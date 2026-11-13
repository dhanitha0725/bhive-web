import type { StructureResolver } from 'sanity/structure'
import { CogIcon } from '@sanity/icons/Cog'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site settings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.listItem().title('Insights').child(S.documentTypeList('insight').title('Insights')),
      S.listItem().title('Pillars').child(S.documentTypeList('pillar').title('Pillars')),
      S.divider(),
      S.listItem().title('Services').child(S.documentTypeList('service').title('Services')),
      S.listItem()
        .title('Case studies')
        .child(S.documentTypeList('caseStudy').title('Case studies')),
      S.listItem().title('Packages').child(S.documentTypeList('packagePlan').title('Packages')),
    ])
