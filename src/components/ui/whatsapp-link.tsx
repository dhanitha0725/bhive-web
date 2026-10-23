"use client";

import React from "react";
import { getWhatsAppUrl } from "@/config/site";
import { trackWhatsAppClick } from "@/lib/analytics";

interface WhatsAppLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  location: string;
  message?: string;
  children: React.ReactNode;
}

export function WhatsAppLink({
  location,
  message,
  children,
  className,
  onClick,
  ...props
}: WhatsAppLinkProps) {
  return (
    <a
      href={getWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={(e) => {
        trackWhatsAppClick(location);
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
