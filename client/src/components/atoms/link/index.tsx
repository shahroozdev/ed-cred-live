'use client'
import Link, { LinkProps } from "next/link";
import nProgress from "nprogress";
import React, { MouseEvent, ReactNode } from "react";

const PLink = ({
  href,
  children,
  onClick,
  className,
  legacyBehavior,
  passHref,
  ...props
}: {
  href: string;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  legacyBehavior?: boolean;
  passHref?: boolean;
  props?: LinkProps;
}) => {
  return (
    <Link
      href={href}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        nProgress.start();
        onClick && onClick(e);
      }}
      className={className}
      legacyBehavior={legacyBehavior}
      passHref={passHref}
      {...props}
    >
      {children}
    </Link>
  );
};

export default PLink;
