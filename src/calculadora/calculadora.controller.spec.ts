import { Test, TestingModule } from '@nestjs/testing';
import { CalculadoraController } from './calculadora.controller';
import { CalculadoraService } from './calculadora.service';
import { BadRequestException } from '@nestjs/common';

describe('CalculadoraController', () => {
  let controller: CalculadoraController;
  let service: CalculadoraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculadoraController],
      providers: [CalculadoraService],
    }).compile();

    controller = module.get<CalculadoraController>(CalculadoraController);
    service = module.get<CalculadoraService>(CalculadoraService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Debería sumar dos números', () => {
    jest.spyOn(service, 'sumar').mockImplementation(() => 10);
    expect(controller.sumar(4, 6)).toBe(10);
  });

  it('Debería restar dos números', () => {
    jest.spyOn(service, 'restar').mockImplementation(() => 7);
    expect(controller.restar(10, 3)).toBe(7);
  });

  it('Debería multiplicar dos números', () => {
    jest.spyOn(service, 'multiplicar').mockImplementation(() => 12);
    expect(controller.multiplicar(6, 2)).toBe(12);
  });

  describe('dividir', () => {
    it('Debería dividir dos números', () => {
      jest.spyOn(service, 'dividir').mockImplementation(() => 4);
      expect(controller.dividir(8, 2)).toBe(4);
    });

    it('Debería lanzar una BadRequestException cuando el divisor es 0', () => {
      jest.spyOn(service, 'dividir').mockImplementation(() => {
        throw new BadRequestException();
      });
      expect(() => controller.dividir(9, 0)).toThrow(BadRequestException);
    });
  });
});
