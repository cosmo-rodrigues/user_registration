import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
    colors: {
      background: string;
      shadow: string;
      primary: string;
      secondary: string;
      sky: string;
      text: string;
      danger: string;
    };
    bgImage: string;
  }
}
