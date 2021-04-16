import { ExistingOrgInfo, NewOrgInfo, Organization, Profile } from 'containers/Profile/types'

export type OrganisationProps = {
  createOrg: (newOrgInfo: NewOrgInfo) => void,
  fetchOrg: (orgId: string) => void,
  org: Organization &
  Pick<ExistingOrgInfo,
  'description' |
  'logo' |
  'privacyUrl' |
  'supportUrl' |
  'tosUrl' |
  'vat' |
  'websiteUrl' |
  'youtubeUrl'
  >,
  profile: Profile,
  updateOrg: (orgId: string, orgInfo: ExistingOrgInfo) => void,
}
