import * as React from "react"
import { COLOR } from "../design/tokens/color"

const Logo = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 125 39" {...props}>
      <path
        fill={COLOR.FADEDBLUE900}
        d="M23.88 17.93a.5.5 0 00-.33-.2l-2.86-.43a9.41 9.41 0 00-.64-1.53c.18-.26.47-.63.84-1.1l.8-1.04a.6.6 0 00.12-.36.5.5 0 00-.1-.35 21.35 21.35 0 00-2.59-2.65.6.6 0 00-.39-.16.5.5 0 00-.37.14l-2.22 1.67c-.43-.22-.9-.41-1.4-.58l-.44-2.87a.46.46 0 00-.18-.34.59.59 0 00-.39-.13h-3.46c-.3 0-.5.15-.57.44-.13.52-.28 1.49-.45 2.9-.49.16-.96.36-1.42.6l-2.16-1.67a.66.66 0 00-.4-.16c-.23 0-.73.37-1.48 1.12-.76.74-1.27 1.3-1.54 1.68a.66.66 0 00-.14.36c0 .12.05.25.16.37.7.84 1.25 1.56 1.67 2.16a7.7 7.7 0 00-.61 1.43l-2.9.44a.47.47 0 00-.3.2.6.6 0 00-.13.36v3.47c0 .14.04.26.13.37.08.11.19.18.32.2l2.86.42c.15.5.36 1.02.64 1.54-.18.26-.47.63-.84 1.1l-.8 1.04a.6.6 0 00-.01.72c.4.57 1.26 1.44 2.58 2.63.11.11.24.17.39.17.15 0 .28-.05.39-.14l2.2-1.67c.43.22.9.41 1.4.58l.44 2.87c.01.14.07.25.18.34.11.09.24.13.39.13h3.46c.3 0 .5-.15.57-.44.13-.52.28-1.49.45-2.9.49-.16.96-.36 1.42-.6l2.16 1.69c.14.1.28.14.4.14.23 0 .72-.37 1.47-1.1.75-.75 1.27-1.31 1.55-1.7.1-.1.14-.22.14-.36a.6.6 0 00-.16-.39 39.3 39.3 0 01-1.67-2.15c.21-.39.41-.86.61-1.42l2.9-.44a.48.48 0 00.3-.2.6.6 0 00.13-.36V18.3a.59.59 0 00-.12-.37zm-9.05 4.9A3.85 3.85 0 0112 24c-1.1 0-2.05-.4-2.83-1.17A3.85 3.85 0 018 20c0-1.1.4-2.05 1.17-2.83A3.85 3.85 0 0112 16c1.1 0 2.05.4 2.83 1.17A3.85 3.85 0 0116 20c0 1.1-.39 2.05-1.17 2.83zM40.27 38c3.32 0 5.41-1.75 5.41-4.47a3.7 3.7 0 00-3.6-3.66v-.2a3.34 3.34 0 002.9-3.3c0-2.41-1.83-3.87-4.92-3.87h-7.23V38h7.44zm-3.5-12.72H39c1.35 0 2.13.67 2.13 1.77s-.84 1.77-2.28 1.77h-2.08v-3.54zm0 9.94v-4h2.36c1.63 0 2.55.7 2.55 1.97 0 1.3-.9 2.03-2.53 2.03h-2.38zM59.6 26.04h-3.8v6.84c0 1.4-.7 2.27-2 2.27-1.23 0-1.95-.77-1.95-2.23v-6.88h-3.8v7.81c0 2.76 1.72 4.43 4.25 4.43 1.8 0 2.84-.8 3.4-2.21h.2V38h3.7V26.04zM62.56 38h3.8V26.04h-3.8V38zm1.9-13.56a2 2 0 002.02-1.97 2 2 0 00-2.02-1.99 2 2 0 00-2.02 1.99 2 2 0 002.02 1.97zM69.46 38h3.79V21.56h-3.8V38zM80.54 38.18c1.67 0 2.99-.76 3.58-2.05h.2V38h3.71V21.56h-3.8v6.4h-.2a3.64 3.64 0 00-3.49-2.1c-2.98 0-4.8 2.32-4.8 6.14 0 3.84 1.8 6.18 4.8 6.18zm1.4-9.33c1.44 0 2.3 1.21 2.3 3.18 0 1.97-.85 3.17-2.3 3.17-1.45 0-2.3-1.2-2.3-3.18 0-1.97.86-3.17 2.3-3.17zM90.82 29.64c0 1.88 1.17 3.05 3.55 3.56l2.22.47c.96.2 1.31.47 1.31.98 0 .64-.67 1.06-1.72 1.06-1.11 0-1.79-.4-1.98-1.14h-3.67c.22 2.41 2.17 3.7 5.6 3.7 3.34 0 5.52-1.58 5.52-4.06 0-1.82-1.02-2.8-3.37-3.29l-2.47-.5c-.95-.2-1.38-.5-1.38-1.01 0-.65.69-1.08 1.68-1.08 1.03 0 1.66.42 1.77 1.12h3.46c-.14-2.4-1.96-3.69-5.26-3.69-3.23 0-5.26 1.5-5.26 3.88zM36.77 18v-5.78h6V9.2h-6V5.67h6.6V2.5H32.84V18h3.94zM50.14 15.53c-.95 0-1.59-.47-1.59-1.24 0-.72.6-1.16 1.72-1.24l2.01-.13v.78c0 1.03-.93 1.83-2.14 1.83zm-1.38 2.65c1.51 0 2.82-.64 3.36-1.66h.2V18h3.7V9.85c0-2.58-1.88-4.09-5.18-4.09-3.23 0-5.35 1.44-5.52 3.76h3.42c.24-.63.89-.96 1.89-.96 1.05 0 1.65.48 1.65 1.29v.93l-2.61.15c-3.08.18-4.78 1.45-4.78 3.63 0 2.2 1.57 3.62 3.87 3.62zM69.87 10.47c-.24-2.93-2.2-4.7-5.5-4.7-3.95 0-6.05 2.18-6.05 6.24 0 4.08 2.1 6.27 6.05 6.27 3.24 0 5.27-1.76 5.5-4.62h-3.5c-.17 1.12-.87 1.7-2 1.7-1.48 0-2.24-1.12-2.24-3.35 0-2.22.75-3.32 2.24-3.32 1.16 0 1.84.66 2 1.78h3.5zM73.17 3.3v2.9h-1.83v2.83h1.83v5.7c0 2.34 1.24 3.3 4.39 3.3.72 0 1.41-.07 1.81-.16v-2.7c-.28.03-.51.05-.95.05-1 0-1.45-.44-1.45-1.35V9.04h2.4V6.21h-2.4V3.3h-3.8zM87.33 18.28c3.84 0 6.1-2.32 6.1-6.26 0-3.9-2.32-6.26-6.1-6.26-3.76 0-6.09 2.39-6.09 6.26 0 3.93 2.27 6.26 6.1 6.26zm0-2.9c-1.4 0-2.19-1.23-2.19-3.36 0-2.09.82-3.35 2.2-3.35 1.37 0 2.18 1.26 2.18 3.35 0 2.12-.8 3.36-2.19 3.36zM95.8 18h3.79v-6.33c0-1.66 1.12-2.6 2.8-2.6.57 0 1.33.09 1.63.2V6.05a4.34 4.34 0 00-1.38-.18c-1.5 0-2.65.95-2.94 2.15h-.2V6.04h-3.7V18zM106 18h3.8V6.04H106V18zm1.9-13.56a2 2 0 002.02-1.97 2 2 0 00-2.02-2 2 2 0 00-2.02 2 2 2 0 002.02 1.97zM118.3 18.28c3.83 0 6.08-2.32 6.08-6.26 0-3.9-2.3-6.26-6.09-6.26-3.76 0-6.09 2.39-6.09 6.26 0 3.93 2.27 6.26 6.1 6.26zm0-2.9c-1.4 0-2.2-1.23-2.2-3.36 0-2.09.82-3.35 2.2-3.35 1.37 0 2.18 1.26 2.18 3.35 0 2.12-.8 3.36-2.19 3.36z"
      />
    </svg>
  )
}

export default Logo
