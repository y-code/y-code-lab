export interface ProjectInfo {
  id: string,
  name: string,
  category: ("AppDev"|"LibDev"|"GameApp"),
  logo?: string,
  logoAlt?: string,
  subLogo?: string,
  subLogoLink?: string,
  languages: ('.NET C#'|'JavaScript'|'TypeScript'|'Sass')[],
  tags: string[],
  description: string[],
  links: { [key:string]: string },
  routerLinks: { [key:string]: string },
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
