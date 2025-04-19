import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entity/restaurant.entity';
import { BaseService } from 'src/base/BaseService';
import { RestaurantDto } from './Dto/restaurant.dto';
import { BaseError } from 'src/base/base.error';
import { Address } from './entity/address.entity';
import path from 'path';
import { User } from 'src/user/user.entity';
import { omit } from 'lodash';
import * as fs from 'fs';
import { ValidExtention } from 'src/enums/file';

@Injectable()
export class RestaurantService extends BaseService<Restaurant> {
  constructor(
    @InjectRepository(Restaurant)
    private userRepository: Repository<Restaurant>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {
    super(userRepository);
  }

  async findAllByUser(userId: number): Promise<Restaurant[] | undefined> {
    return this.userRepository.find({
      where: {
        userId,
      },
      relations: {
        address: true,
      },
    });
  }

  async findOneById(id: number): Promise<Restaurant | undefined> {
    return this.repository.findOne({
      where: { id },
      relations: ['address'],
    });
  }

  async create(user, restaurantDto: RestaurantDto): Promise<Restaurant> {
    const restaurant = this.repository.create({
      ...omit(restaurantDto, 'profilImage'),
      userId: user.id,
    });

    if (restaurantDto.profilImage) {
      restaurant.profilImage = await this.saveImage(restaurantDto.profilImage, user);
    }

    return this.save(restaurant);
  }

  async update(
    user,
    id: number,
    restaurantDto: RestaurantDto,
  ): Promise<Restaurant> {
    const restaurant = await this.findOneById(id);

    const isUpdateAllowed: boolean =
      (await this.repository
        .createQueryBuilder('restaurant')
        .select('COUNT(*)', 'count')
        .where('restaurant.id = :id', { id })
        .andWhere('restaurant.userId = :userId', { userId: user.id })
        .getCount()) > 0;
    if (!isUpdateAllowed) {
      throw new BadRequestException(BaseError.UPDATE_NOT_ALLOWED);
    }

    if (restaurantDto.profilImage) {
      restaurant.profilImage = await this.saveImage(
        restaurantDto.profilImage,
        user,
      );
    }

    return await this.repository.save({
      ...restaurant,
      ...restaurantDto,
      address: {
        ...restaurant.address,
        ...restaurantDto.address,
      },
    });
  }

  async delete(user, id: number) {
    const result = await this.repository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async saveImage(base64: string, user: User): Promise<string> {
    const matches = base64.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) throw new Error('Format invalide');

    const extension = matches[1].split('/')[1];

    if (!Object.values(ValidExtention).includes(extension as ValidExtention)) {
      throw new BadRequestException(BaseError.FILE_FORMAT_NOT_ALLOWED);
    }

    const buffer = Buffer.from(matches[2], 'base64');
    const fileName = `${user.id}_${Date.now()}.${extension}`;
    const dirPath = path.join(__dirname, '../../uploads');

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(path.join(dirPath, fileName), buffer);
    return fileName;
  }
}
