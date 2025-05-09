import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Controller('images')
export class MediaController {
  @Get('/:imageName')
  async getImage(@Param('imageName') imageName: string, @Res() res: Response) {
    const imagePath = path.join(__dirname, '../../uploads', imageName);
    if (fs.existsSync(imagePath)) {
      return res.sendFile(imagePath);
    } else {
      throw new NotFoundException();
    }
  }
}
