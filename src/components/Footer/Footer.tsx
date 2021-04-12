import * as React from 'react'

import { useSelector } from 'react-redux'

import { useTranslation } from 'react-i18next'

import { Menus } from '@apisuite/extension-ui-types'

import { getRoleName } from 'containers/Profile/selectors'
import { SettingsStore } from 'containers/Settings/types'

import SvgIcon from 'components/SvgIcon'

import Fab from '@material-ui/core/Fab'

import AmpStoriesRoundedIcon from '@material-ui/icons/AmpStoriesRounded'

import LocaleSelect from 'language/LocaleSelect'

import { getMenuEntries } from 'util/extensions'

import useStyles from './styles'

import { FooterProps, MenuSection, MenuSections } from './types'

import { config } from 'constants/global'

const renderSocialLinks = ({ settings }: { settings: SettingsStore }) => {
  const classes = useStyles()

  const { socialURLs } = settings

  if (!socialURLs || !socialURLs.length) {
    return null
  }

  return (
    <div className={classes.iconsContainer}>
      {socialURLs.map((socialUrl, index) => {
        switch (socialUrl.name) {
          case 'facebook':
          case 'github':
          case 'gitlab':
          case 'instagram':
          case 'linkedin':
          case 'reddit':
          case 'twitter':
            return (
              <a key={`${index}-${socialUrl.name}`} href={socialUrl.url} target='_blank' rel='noopener noreferrer'>
                <SvgIcon size={24} name={socialUrl.name} />
              </a>
            )

          default:
            return (
              <a key={`${index}-web`} href={socialUrl.url} target='_blank' rel='noopener noreferrer'>
                <SvgIcon size={24} name='earth' />
              </a>
            )
        }
      })}
    </div>
  )
}

const renderSubSection = (
  settings: SettingsStore,
  subMenu: string,
  roleName?: string,
) => {
  const classes = useStyles()

  const [t] = useTranslation()

  const menuSections: MenuSections = {
    [Menus.FooterProducts]: {
      title: t('footer.apiProductsMenu.menuTitle', { config }),
      entries: [
        {
          label: t('footer.apiProductsMenu.menuItemOne', { config }),
          route: '/dashboard/subscriptions',
        },
        {
          label: t('footer.apiProductsMenu.menuItemTwo', { config }),
          route: '/documentation',
        },
      ],
    },

    [Menus.FooterSupport]: {
      title: t('footer.supportMenu.menuTitle', { config }),
      entries: [
        {
          label: t('footer.supportMenu.menuItemOne', { config }),
          route: settings && settings.socialURLs && settings.socialURLs.length ? settings.socialURLs[0]?.url : '#',
        },
        {
          label: t('footer.supportMenu.menuItemTwo', { config }),
          route: 'https://cloudoki.atlassian.net/wiki/spaces/APIEC/overview?homepageId=281444539',
        },
      ],
    },

    [Menus.FooterDashboard]: {
      title: t('footer.dashboardMenu.menuTitle', { config }),
      entries: [
        {
          label: t('footer.dashboardMenu.menuItemOne', { config }),
          route: '/dashboard/apps',
        },
        {
          label: t('footer.dashboardMenu.menuItemTwo', { config }),
          route: '/dashboard/team',
        },
      ],
    },

    [Menus.FooterProfile]: {
      title: t('footer.profileMenu.menuTitle', { config }),
      entries: [
        {
          label: t('footer.profileMenu.menuItemOne', { config }),
          route: '/profile/security',
        },
        {
          label: t('footer.profileMenu.menuItemTwo', { config }),
          route: '/profile/organisation',
        },
      ],
    },

    // TODO: Come up with a solution to a bug that manifests upon logging out with this extension active
    // [Menus.FooterStatus]: {
    //   title: t('footer.apisCloudExtensionMenu.menuTitle', { config }),
    //   entries: [],
    // },
  }

  const section: MenuSection = menuSections[subMenu]
  const extensionsMenuEntries = getMenuEntries(subMenu, roleName)
  const allEntries = [...section.entries, ...extensionsMenuEntries]

  return (
    <div className={classes.subSection} key={subMenu}>
      <h3>{section.title}</h3>

      <>
        {allEntries.map((entry, i) => {
          const { label, ...anchorProps } = entry

          return (
            <p key={i}>
              {
                entry.route && entry.route !== '#'
                  ? (
                    <a {...anchorProps} href={entry.route} key={i}>
                      {label}
                    </a>
                  )
                  : (
                    label
                  )
              }
            </p>
          )
        })}
      </>
    </div>
  )
}

// Footer

const Footer: React.FC<FooterProps> = ({
  // TODO: Come up with a solution to a bug that manifests upon logging out with this extension active
  // auth,
  settings,
}) => {
  const classes = useStyles()

  const roleName = useSelector(getRoleName)

  const [t] = useTranslation()

  const handleFabClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <footer className={classes.footer}>
      <div className={classes.footerToTopShortcutContainer}>
        <Fab size='small' onClick={handleFabClick}>
          <SvgIcon name='chevron-up' size={24} />
        </Fab>
      </div>

      <div className={classes.footerContentsContainer}>
        <div className={classes.leftFooterContentsContainer}>
          <div className={classes.logoAndPortalNameContainer}>
            {
              settings.logoURL
                ? (
                  <img
                    className={classes.imageLogo}
                    src={settings.logoURL}
                  />
                )
                : (
                  <AmpStoriesRoundedIcon
                    className={classes.iconLogo}
                  />
                )
            }

            <h3 className={classes.portalName}>
              {settings.portalName}
            </h3>
          </div>

          <div className={classes.sectionsContainer}>
            <div>
              {renderSubSection(settings, Menus.FooterProducts, roleName)}
            </div>

            <div className={classes.section}>
              {renderSubSection(settings, Menus.FooterSupport, roleName)}
            </div>

            <div className={classes.section}>
              {renderSubSection(settings, Menus.FooterDashboard, roleName)}
            </div>

            <div className={classes.section}>
              {renderSubSection(settings, Menus.FooterProfile, roleName)}
            </div>

            {/* TODO: Come up with a solution to a bug that manifests upon logging out with this extension active */}
            {/* {
auth.user?.role.name === 'admin' &&
<div className={classes.section}>
{renderSubSection(settings, Menus.FooterStatus, roleName)}
</div>
} */}
          </div>
        </div>

        <div className={classes.rightFooterContentsContainer}>
          {renderSocialLinks({ settings })}

          <div className={classes.copyrightContainer}>
            <a
              href='https://apisuite.io/'
              rel='noopener noreferrer'
              target='_blank'
            >
              &copy; {new Date().getFullYear()} {t('footer.copyrights.website', { config })}
            </a>

            <p>{t('footer.copyrights.allRightsReserved', { config })}</p>
          </div>

          <LocaleSelect />
        </div>
      </div>
    </footer>
  )
}

export default Footer
