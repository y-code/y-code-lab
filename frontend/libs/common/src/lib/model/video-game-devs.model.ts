export interface VideoGameDevItem {
  id: string,
  name: string,
  actionTypes: ('C#'|'3D Game'|'3D Modeling'|'Online Multiplayer'|'3D Animation'|'ShaderLab'|'Algorithm'|'Vector Geometry')[],
  status: ('Prototype'|'In Development'|'Released'),
  videoId: string,
  description: string[],
  linkToItchio: string,
  links: { [key:string]: string },
}
