export interface ServiceItem {
  slug: string;
  icon: string;
  titleKey: string;
  descKey: string;
  href: string;
}

export const services: ServiceItem[] = [
  {
    slug: "web",
    icon: "Globe",
    titleKey: "services.web.title",
    descKey: "services.web.desc",
    href: "/solutions/creation-sites",
  },
  {
    slug: "seo",
    icon: "Search",
    titleKey: "services.seo.title",
    descKey: "services.seo.desc",
    href: "/solutions/seo-armada",
  },
  {
    slug: "maps",
    icon: "MapPin",
    titleKey: "services.maps.title",
    descKey: "services.maps.desc",
    href: "/solutions/google-maps",
  },
  {
    slug: "brand",
    icon: "Palette",
    titleKey: "services.brand.title",
    descKey: "services.brand.desc",
    href: "/solutions/branding",
  },
  {
    slug: "cm",
    icon: "Users",
    titleKey: "services.cm.title",
    descKey: "services.cm.desc",
    href: "/solutions/community-management",
  },
  {
    slug: "ai",
    icon: "Bot",
    titleKey: "services.ai.title",
    descKey: "services.ai.desc",
    href: "/solutions/ia-automatisation",
  },
  {
    slug: "eng",
    icon: "Cpu",
    titleKey: "services.eng.title",
    descKey: "services.eng.desc",
    href: "/solutions/ingenierie",
  },
  {
    slug: "infra",
    icon: "Server",
    titleKey: "services.infra.title",
    descKey: "services.infra.desc",
    href: "/solutions/infrastructure",
  },
];
