import { event } from './documents/event'
import { gallery } from './documents/gallery'
import { siteSettings } from './documents/site-settings'
import { team } from './documents/team'
import { photo } from './objects/photo'

export const SINGLETON_TYPES = ['siteSettings', 'team', 'gallery']

export const schemaTypes = [event, team, gallery, siteSettings, photo]
