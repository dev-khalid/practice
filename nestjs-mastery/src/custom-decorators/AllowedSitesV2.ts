import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { SiteGuard } from './SiteGuard';
export const AllowedSitesV2 = (sites: string[]) => {
  return applyDecorators(
    SetMetadata('AllowedSites', sites),
    UseGuards(SiteGuard),
  );
};
