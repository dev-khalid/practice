// import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

//Could do this as well: 
// export const AllowedSites = (hosts: string[]) => {
//   return SetMetadata('AllowedSites', hosts);
// };
export const AllowedSites = Reflector.createDecorator<string[]>();