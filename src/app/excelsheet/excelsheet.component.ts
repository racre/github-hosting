import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-excelsheet',
  templateUrl: './excelsheet.component.html',
  styleUrls: ['./excelsheet.component.css']
})
export class ExcelsheetComponent implements OnInit {

  data!:[][];

  constructor() { }

  ngOnInit(): void {
  }
  onFileChange($evt:any){
    const target : DataTransfer = <DataTransfer>($evt.target);
    if (target.files.length !==1) throw new Error('Cannot use multiple file');

    const reader: FileReader = new FileReader();
    reader.onload=(e:any)=>{

      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook=XLSX.read(bstr,{type: 'binary'});
      const wsname: string= wb.SheetNames[0];
      const ws: XLSX.WorkSheet=wb.Sheets[wsname];
      // const column: XLSX.WSKeys.A1
      
      // const column:XLSX.WorkSheet=wb.Sheets['A1.v'];
      console.log(ws);
      // console.log(column);
      this.data = (XLSX.utils.sheet_to_json(ws,{header:1}))
      // console.log(column);
      // this.data = (XLSX.utils.sheet_to_json(ws,{header:1}))
      
      
    };
    reader.readAsBinaryString(target.files[0]);

    


  }

}
