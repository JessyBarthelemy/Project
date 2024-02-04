import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { AuthController } from 'src/base/AuthController';
import { RestaurantDto } from './Dto/restaurant.dto';
import { Restaurant } from './entity/restaurant.entity';

@Controller('restaurants')
export class RestaurantController extends AuthController {
  constructor(private readonly restaurantService: RestaurantService) {
    super();
  }

  @Get()
  async findAllByUser(@Req() request) {
    return await this.restaurantService.findAllByUser(request.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.restaurantService.findOneById(id);
  }

  @Post()
  async create(
    @Req() request,
    @Body() restaurant: RestaurantDto,
  ): Promise<Restaurant> {
    return await this.restaurantService.create(request.user, restaurant);
  }

  @Put(':id')
  async update(
    @Req() request,
    @Param('id') id: number,
    @Body() restaurant: RestaurantDto,
  ): Promise<Restaurant> {
    return await this.restaurantService.update(request.user, id, restaurant);
  }

  @Delete(':id')
  async delete(@Req() request, @Param('id') id: number) {
    return await this.restaurantService.delete(request.user, id);
  }
}
