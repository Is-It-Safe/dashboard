import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --neutros-50: #FDFCFF;
    --neutros-100: #FAF9FF;
    --neutros-400: #DEDCDF;
    --background: #FDFCFF;
    --base-logo: #EFECFD;
    --primarias-100: #9D8DF4;
    --primarias-200: #DCD6FC;
    --primarias-300: #5C45ED;
    --primarias-400: #695CA8;
    --primarias-500: #6200EE;
    --primarias-700: #3700B3;
    --primarias-800: #30009C;
    --primarias-900: #241B5E;
    --yellow-100: #FDC47F;
    --yellow-400: #FF9311;
    --red-400: #EB3D3D;
    --red-800: #B91C1C;
    --green-100: #3BBD9F;
    --success: #2AF026;
  }
 
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--neutros-100);
    color: var(--primarias-900);
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
  }
`;
