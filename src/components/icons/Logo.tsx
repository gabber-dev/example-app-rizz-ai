export function Logo(
  props: React.SVGProps<SVGSVGElement> & { color?: string },
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="100%"
      viewBox="0 0 92 18"
      fill="none"
      className={props.className}
    >
      <path
        d="M0 18V0.739725H5.86743C9.0249 0.739725 13.8481 0.739725 13.8481 5.89315C13.8481 8.55616 12.5553 10.2822 9.69618 11.0219L14.1465 18H0Z"
        fill="currentColor"
      />
      <path d="M16.1457 18V0.739725H22.3612V18H16.1457Z" fill="currentColor" />
      <path
        d="M24.3531 18L29.8973 6.80548H25.099V0.739725H39.6432L34.1487 11.9342H39.0465V18H24.3531Z"
        fill="currentColor"
      />
      <path
        d="M40.6445 18L46.1887 6.80548H41.3904V0.739725H55.9346L50.4401 11.9342H55.3379V18H40.6445Z"
        fill="currentColor"
      />
      <path d="M58.1703 18V12.7726H63.5405V18H58.1703Z" fill="currentColor" />
      <path d="M65.522 18L74.7458 0L83.9696 18H65.522Z" fill="currentColor" />
      <path d="M85.5845 18V0.739725H91.8V18H85.5845Z" fill="currentColor" />
    </svg>
  );
}
