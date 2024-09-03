import {
  ArgumentMetadata,
  BadGatewayException,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { AppVersionEnum } from '../types';

@Injectable()
export class ValidateAppVersion implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(metadata)
    let validAppVersions = Object.keys(AppVersionEnum);
    if (validAppVersions.includes(value)) {
      return value;
    } else {
      throw new BadRequestException(
        `App version ${value} is not supported. Supported versions are: ${validAppVersions.join(' | ')}`
      );
    }
  }
}
