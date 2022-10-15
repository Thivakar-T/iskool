import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import {
  CalendarSchedulerEvent,
  CalendarSchedulerEventStatus,
  CalendarSchedulerEventAction
} from 'angular-calendar-scheduler';
import {
  addDays,
  startOfHour,
  addHours,
  subHours,
  setHours,
  subMinutes,
  addMinutes,
  startOfDay,
  setMinutes
} from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  calendarObj: any = {}

  _baseUrl = environment.API_URL + 'api/calender/get/weekly/time';
  private _updateTimeTable = this._baseUrl + '/table';
  _baseUrl1 = environment.API_URL + 'api/holiday/get';
  private _updateHoliday = this._baseUrl1;
  constructor(
    private http: HttpClient
  ) { }

  updateTimeTable(data) {
    return this.http.put<any>(this._updateTimeTable, data);
  }
  updateHoliday(data) {
    return this.http.put<any>(this._updateHoliday, data);
  }
  getEvents ( data , actions : CalendarSchedulerEventAction []): Promise < CalendarSchedulerEvent []> { 
    const events = []; data.responseList.forEach ( dateArray => {
      console.log("dateArray",dateArray);
       events . push (< CalendarSchedulerEvent >{ 
         id : dateArray . id ,
          start : dateArray . stateDate ,
           end : dateArray . endDate , 
           title : dateArray . title ,
            content : dateArray . content ,
             color : dateArray . type == 'HOLIDAY'
              ?{ primary : 'yellow' , secondary : '#EEEEEE' }: dateArray . isPreviousDate
               ?{ primary : 'green' , secondary : '#EEEEEE' }:
               { primary : 'red' ,  secondary :  '#EEEEEE' },
                actions : actions ,
                  status: 'danger' as CalendarSchedulerEventStatus,
                   isClickable : dateArray . type == 'HOLIDAY' ? false : dateArray . isPreviousDate ? true : false ,
                    isDisabled : false , 
                    draggable : false , 
                    resizable : { beforeStart : true , afterEnd : true } 
                  })
                   }); return new Promise
     ( resolve => setTimeout (() => resolve ( events ), 3000 ));  

                  }
}

