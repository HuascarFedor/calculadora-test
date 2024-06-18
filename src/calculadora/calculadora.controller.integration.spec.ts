import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module'; // Ruta corregida

describe('Calculadora [Integration test]', () => {
  let app: INestApplication;

  // Antes de hacer las pruebas
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  // Después de hacer las pruebas
  afterAll(async () => {
    await app.close();
  });

  it('Deberia sumar /calculadora/sumar (GET)', () => {
    return request(app.getHttpServer())
      .get('/calculadora/sumar?sumando1=40&sumando2=6')
      .expect(200)
      .expect('46');
  });

  it('Debería restar /calculadora/restar (GET)', () => {
    return request(app.getHttpServer())
      .get('/calculadora/restar?minuendo=10&sustraendo=3')
      .expect(200)
      .expect('7');
  });

  it('Debería multiplicar /calculadora/multiplicar (GET)', () => {
    return request(app.getHttpServer())
      .get('/calculadora/multiplicar?multiplicando=10&multiplicador=5')
      .expect(200)
      .expect('50');
  });

  it('Debería dividir /calculadora/dividir (GET)', () => {
    return request(app.getHttpServer())
      .get('/calculadora/dividir?dividendo=80&divisor=10')
      .expect(200)
      .expect('8');
  });

  it('Debería lanzar un BadRequestException cuando el divisor es 0 /calculadora/dividir (GET)', () => {
    return request(app.getHttpServer())
      .get('/calculadora/dividir?dividendo=80&divisor=0')
      .expect(400)
      .expect((response) => {
        expect(response.body.error).toBe('Bad Request');
      });
  });
});
