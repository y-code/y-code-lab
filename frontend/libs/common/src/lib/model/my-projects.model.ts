export type ProjectCategory = 'WebAppDev'|'LibDev'|'GameApp';
export type ProjectLanguage = '.NET C#'|'JavaScript'|'TypeScript'|'Sass';

export interface ProjectInfo {
  id: string,
  name: string,
  category: ProjectCategory,
  logo?: string,
  logoAlt?: string,
  subLogo?: string,
  subLogoLink?: string,
  languages: ProjectLanguage[],
  tags: string[],
  description: string[],
  links: Record<string, string>,
  routerLinks: Record<string, string>,
  video?: string,
  image?: string,
  codeSample?: string,
  codeSandbox?: string,
  npmBadge?: string,
  nugetPackage?: string,
}

export interface NuGetInfo {
  versions: string[],
}
