import * as React from "react"

const ThumbsUp = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 15"
      {...props}
    >
      <path d="M2.67 5.33H.53c-.3 0-.53.24-.53.54v8.53c0 .3.24.53.53.53h2.14c.3 0 .53-.24.53-.53V5.87c0-.3-.24-.54-.53-.54zM15.99 6.75c-.1-.83-.87-1.42-1.7-1.42h-4.16c.35-.63.54-2.42.54-3.15A2.22 2.22 0 008.44 0H8c-.3 0-.53.24-.53.53 0 1.24-.48 3.46-1.39 4.37-.6.6-1.13.83-1.81 1.17v8c1.04.35 2.37.86 4.4.86h3.48c1.15 0 2.05-1.06 1.6-2.19a1.6 1.6 0 001.07-2.13A1.6 1.6 0 0015.6 8c.3-.33.45-.77.4-1.25z" />
    </svg>
  )
}

export default ThumbsUp
