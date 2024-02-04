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
      ...restaurantDto,
      userId: user.id,
    });
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
}
