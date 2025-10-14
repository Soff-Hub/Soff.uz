import tw from "~/shared/styles/tailwind.module.scss"
import useResponsive from "./useResponsive";

export function cn(...classes) {
    return classes.map(cls => tw[cls] || cls).join(" ");
}



export function useRcn(responsiveClasses) {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  let activeClass = "";
  if (isMobile && responsiveClasses.mobile) activeClass = responsiveClasses.mobile;
  if (isTablet && responsiveClasses.tablet) activeClass = responsiveClasses.tablet;
  if (isDesktop && responsiveClasses.desktop) activeClass = responsiveClasses.desktop;

  return cn(activeClass);
}