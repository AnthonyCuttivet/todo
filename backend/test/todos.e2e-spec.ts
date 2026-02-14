import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { title } from 'process';

describe('JWT then Todos', () => {
  let app: INestApplication;
  let jwtToken: string;
  let todoId: number;
  let todoContent: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  /**
   * LOGIN
   */
  it('POST /auth/login should return a JWT', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'toto@kresus.eu',
        password: 'test',
      })
      .expect(201);

    expect(response.body).toHaveProperty('access_token');
    jwtToken = response.body.access_token;
  });

  /**
   * CREATE TODO
   */
  it('POST /todos should create a todo', async () => {
    const response = await request(app.getHttpServer())
      .post('/todos')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        title: 'My first todo',
        content: 'My first todo content',
        priority: 'medium',
        checked: false,
      })
      .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('My first todo');
      expect(response.body.content).toBe('My first todo content');
      expect(response.body.priority).toBe('medium');
      expect(response.body.checked).toBe(false);

      todoId = response.body.id;
  });

  /**
   * GET TODOS
   */
  it('GET /todos should return todos', async () => {
    const response = await request(app.getHttpServer())
      .get('/todos')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  /**
   * UPDATE TODO
   */
  it('PATCH /todos/:id should update a todo', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/todos/${todoId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        title: 'My first todo',
        content: 'My first todo content',
        priority: 'medium',
        checked: true,
      })
      .expect(200);

    expect(response.body.checked).toBe(true);
  });

  /**
   * DELETE TODO
   */
  it('DELETE /todos/:id should delete a todo', async () => {
    await request(app.getHttpServer())
      .delete(`/todos/${todoId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(204);
  });
});
