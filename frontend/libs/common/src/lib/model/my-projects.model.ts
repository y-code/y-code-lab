export type ProjectCategory = 'AppDev'|'LibDev'|'GameApp';
export type ProjectLanguage = 'C++'|'CMake'|'Java'|'.NET C#'|'JavaScript'|'TypeScript'|'Sass'|'PLpgSQL'|'Protobuf'|'Dockerfile'|'Docker Compose';

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
