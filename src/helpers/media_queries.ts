const sizes = {
  mobileXS: '320px',
  mobileSM: '375px',
  mobileMD: '425px',
  mobileLG: '576px',
  tablet: '768px',
  laptop: '1024px',
  laptopMD: '1366px',
  laptopLG: '1680px',
  desktop: '1920px',
  desktopLG: '2560px',
};

export const devices = {
  mobileXS: `(min-width: ${sizes.mobileXS})`,
  mobileSM: `(min-width: ${sizes.mobileSM})`,
  mobileMD: `(min-width: ${sizes.mobileMD})`,
  mobileLG: `(min-width: ${sizes.mobileLG})`,
  tablet: `(min-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.laptop})`,
  laptopMD: `(min-width: ${sizes.laptopMD})`,
  laptopLG: `(min-width: ${sizes.laptopLG})`,
  desktop: `(min-width: ${sizes.desktop})`,
  desktopLG: `(min-width: ${sizes.desktopLG})`,
};
