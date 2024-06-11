import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CalculadoraService {
  sumar(sumando1: number, sumando2: number): number {
    return sumando1 + sumando2;
  }
  restar(minuendo: number, sustraendo: number): number {
    return minuendo - sustraendo;
  }
  multiplicar(multiplicando: number, multiplicador: number): number {
    return multiplicando * multiplicador;
  }
  dividir(dividendo: number, divisor: number): number {
    if (divisor === 0) {
      throw new BadRequestException('El divisor no puede ser cero');
    }
    return dividendo / divisor;
  }
}
