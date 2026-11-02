import { CalendarIcon } from '@sanity/icons/Calendar'
import { CogIcon } from '@sanity/icons/Cog'
import { ImagesIcon } from '@sanity/icons/Images'
import { UsersIcon } from '@sanity/icons/Users'
import type { StructureBuilder, StructureResolver } from 'sanity/structure'
import type { ComponentType } from 'react'

function singleton(S: StructureBuilder, type: string, title: string, icon: ComponentType) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(S.document().schemaType(type).documentId(type).title(title))
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website content')
    .items([
      S.documentTypeListItem('event').title('Events').icon(CalendarIcon),
      singleton(S, 'team', 'Core team', UsersIcon),
      singleton(S, 'gallery', 'Gallery', ImagesIcon),
      S.divider(),
      singleton(S, 'siteSettings', 'Site settings', CogIcon),
    ])
