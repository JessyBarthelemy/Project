import type { AxiosResponse } from 'axios';
import BaseService from './BaseService';
import api from '../tools/axios';
import { Restaurant } from '@/types/restaurant/restaurant';
import { isEmpty } from 'lodash';
import { ValidationError } from '@/exceptions/ValidationError';
import { RESTAURANT_ERROR } from '@/errors/RestaurantError';

class RestaurantService extends BaseService {
  // #region api call

  async getAll(): Promise<AxiosResponse> {
    return api.get('/restaurants');
  }

  check(restaurant: Restaurant) {
    if (isEmpty(restaurant.name)) {
      throw new ValidationError(
        RESTAURANT_ERROR.nameRequired.code,
        RESTAURANT_ERROR.nameRequired.message
      );
    }

    if (isEmpty(restaurant.address.number)) {
      throw new ValidationError(
        RESTAURANT_ERROR.numberRequired.code,
        RESTAURANT_ERROR.numberRequired.message
      );
    }

    if (isEmpty(restaurant.address.street)) {
      throw new ValidationError(
        RESTAURANT_ERROR.streetRequired.code,
        RESTAURANT_ERROR.streetRequired.message
      );
    }

    if (
      isEmpty(restaurant.address.postalCode) ||
      !/^[0-9]{5}$/.test(restaurant.address.postalCode ?? '')
    ) {
      throw new ValidationError(
        RESTAURANT_ERROR.postalCodeRequired.code,
        RESTAURANT_ERROR.postalCodeRequired.message
      );
    }

    if (isEmpty(restaurant.address.city)) {
      throw new ValidationError(
        RESTAURANT_ERROR.cityRequired.code,
        RESTAURANT_ERROR.cityRequired.message
      );
    }
  }

  async create(restaurant: Restaurant): Promise<AxiosResponse> {
    this.check(restaurant);
    return api.post('/restaurants/', restaurant);
  }

  async update(restaurant: Restaurant): Promise<AxiosResponse> {
    this.check(restaurant);
    return api.put(`/restaurants/${restaurant.id}`, restaurant);
  }

  async delete(idRestaurant: number): Promise<AxiosResponse> {
    return api.delete(`/restaurants/${idRestaurant}`);
  }

  // #endregion
}

export const restaurantService = new RestaurantService();
