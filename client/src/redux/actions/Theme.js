import {
  CHANGE_LOCALE,
  DIRECTION_CHANGE,
  HEADER_NAV_COLOR_CHANGE,
  NAV_TYPE_CHANGE,
  SIDE_NAV_STYLE_CHANGE,
  SWITCH_THEME,
  TOGGLE_COLLAPSED_NAV,
  TOGGLE_MOBILE_NAV,
  TOP_NAV_COLOR_CHANGE
} from '../constants/Theme';

export function toggleCollapsedNav(navCollapsed) {
  return {
    type: TOGGLE_COLLAPSED_NAV,
    navCollapsed
  };
}

export function onNavStyleChange(sideNavTheme) {
  return {
    type: SIDE_NAV_STYLE_CHANGE,
    sideNavTheme
  };
}

export function onLocaleChange(locale) {
  return {
    type: CHANGE_LOCALE,
    locale
  };
}

export function onNavTypeChange(navType) {
  return {
    type: NAV_TYPE_CHANGE,
    navType
  };
}

export function onTopNavColorChange(topNavColor) {
  return {
    type: TOP_NAV_COLOR_CHANGE,
    topNavColor
  };
}

export function onHeaderNavColorChange(headerNavColor) {
  return {
    type: HEADER_NAV_COLOR_CHANGE,
    headerNavColor
  };
}

export function onMobileNavToggle(mobileNav) {
  return {
    type: TOGGLE_MOBILE_NAV,
    mobileNav
  };
}

export function onSwitchTheme(currentTheme) {
  return {
    type: SWITCH_THEME,
    currentTheme
  };
}

export function onDirectionChange(direction) {
  return {
    type: DIRECTION_CHANGE,
    direction
  };
}
