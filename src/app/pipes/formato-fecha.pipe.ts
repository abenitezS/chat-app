import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoFecha',
  standalone: true
})
export class FormatoFechaPipe implements PipeTransform {
  transform(date: Date): string {
    const ahora = new Date();
    const diferencia = ahora.getTime() - new Date(date).getTime();
    const minutos = Math.floor(diferencia / (1000 * 60));
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

    if (minutos < 1) return 'Ahora';
    if (minutos < 60) return `hace ${minutos}m`;
    if (horas < 24) return `hace ${horas}h`;
    if (dias < 7) return `hace ${dias}d`;
    
    return new Date(date).toLocaleDateString('es-ES');
  }
}