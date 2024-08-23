import { proxy } from "valtio";
const state = proxy({
  intro : true ,
  color : "#EFBD48",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal : './nownow.webp',
  fullDecal : './nownow.webp'
});
export  default state;