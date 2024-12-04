import { Pipe, PipeTransform } from '@angular/core';

const FILE_SIZE_UNITS =  ['B', 'KB', 'MB', 'GB', 'PB','EB','ZB','YB'];
const FILE_SIZE_UNITS_LONG = ['Bytes','Kilobytes','Megabytes','Gigabytes','Pettabytes','Exabytes','Zettabytes','Yottabytes'];

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  transform(objSizeInBytes: number, objLongForm?:boolean): string {
    const units = objLongForm ? FILE_SIZE_UNITS_LONG : FILE_SIZE_UNITS;
    let objPower = Math.round(Math.log(objSizeInBytes)/Math.log(1024));
    objPower = Math.min(objPower, units.length -1);
    const objSize = objSizeInBytes / Math.pow(1024, objPower);
    const objFormattedSize = Math.round(objSize * 100)/ 100;
    const objUnit = units[objPower];
    return objSize ? `${objFormattedSize} ${objUnit}`: '0';
  }

}
