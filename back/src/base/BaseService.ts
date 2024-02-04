import { Repository } from 'typeorm';

export class BaseService<E> {
  protected repository;

  constructor(repository: Repository<E>) {
    this.repository = repository;
  }

  async findOneById(id: number, options: any): Promise<E | undefined> {
    return this.repository.findOneBy(
      {
        id,
      },
      options,
    );
  }

  async save(entity: E): Promise<E> {
    return await this.repository.save(entity);
  }
}
