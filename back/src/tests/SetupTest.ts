import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { EntityManager } from 'typeorm';

export const clearDatabase = async (app: INestApplication): Promise<void> => {
  const entityManager = app.get<EntityManager>(EntityManager);
  const tableNames = entityManager.connection.entityMetadatas
    .map((entity) => `"${entity.tableName}"`)
    .join(', ');

  await entityManager.query(`truncate ${tableNames} restart identity cascade;`);
};

export const setupTest = (modules: any) => {
  let app: any;
  let appModule: any;

  beforeAll(async () => {
    appModule = await Test.createTestingModule({
      imports: [modules],
    }).compile();
    app = appModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  return [app, appModule];
};
