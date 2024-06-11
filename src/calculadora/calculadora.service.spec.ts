import { Test, TestingModule } from '@nestjs/testing';
import { CalculadoraService } from './calculadora.service';
import { BadRequestException } from '@nestjs/common';

describe('CalculadoraService', () => {
  let service: CalculadoraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculadoraService],
    }).compile();

    service = module.get<CalculadoraService>(CalculadoraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('sumar 1 + 2 resuta 3', () => {
    expect(service.sumar(1, 2)).toBe(3);
  });

  it('restar 5 - 2 resuta 3', () => {
    expect(service.restar(5, 2)).toBe(3);
  });

  it('multiplicar 6 * 2 resuta 12', () => {
    expect(service.multiplicar(6, 2)).toBe(12);
  });

  describe('dividir', () => {
    it('dividir 8 / 2 resuta 4', () => {
      expect(service.dividir(8, 2)).toBe(4);
    });

    it('debería lanzar una BadRequestException cuando el divisor es 0', () => {
      expect(() => service.dividir(9, 0)).toThrow(BadRequestException);
      expect(() => service.dividir(10, 0)).toThrow(
        'El divisor no puede ser cero',
      );
    });
  });
});
