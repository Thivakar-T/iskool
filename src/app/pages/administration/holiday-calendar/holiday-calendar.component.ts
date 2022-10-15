import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarWeekViewBeforeRenderEvent,
  CalendarDayViewBeforeRenderEvent,
  CalendarView,
} from 'angular-calendar';
import { last } from 'rxjs/operators';

import * as XLSX from 'xlsx';
import { ToastrService } from 'ngx-toastr';
import { AppService } from './../../administration/app.service';

@Component({
  selector: 'app-holiday-calendar',
  templateUrl: './holiday-calendar.component.html',
  styleUrls: ['./holiday-calendar.component.scss']
})
export class HolidayCalendarComponent implements OnInit {

  view: CalendarView = CalendarView.Month;
  loading: boolean = false;
  viewDate: Date = new Date();
  currentCount: number = 0;
  events: CalendarEvent[] = [];
  displayMonth: any;
  displayYear: any;
  holidayList: any[];
  countArr: any = [];

  obj: any = {};
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getMonth();
    // console.log(this.obj);
  }
  prviousMonth() {
    this.currentCount--;
    this.getMonth();
  }
  nextMonth() {
    this.currentCount++;
    this.getMonth();
  }
  getMonth() {
    this.loading = true;

    var viewDates = new Date(new Date().getFullYear(), new Date().getMonth() + this.currentCount, 1);

    this.viewDate = viewDates;
    var mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.displayMonth = mlist[viewDates.getMonth()];
    this.displayYear = viewDates.getFullYear();
    // console.log("this.viewDate", this.displayMonth)
    var firstDay = new Date(viewDates.getFullYear(), viewDates.getMonth(), 1);
    var lastDay = new Date(viewDates.getFullYear(), viewDates.getMonth() + 1, 0);
    this.getHolidayList(firstDay, lastDay, viewDates);
  }

  getHolidayList(from, to, viewDates) {
    var fromDate = from.getDate() + "/" + (from.getMonth() + 1).toString().padStart(2, "0") + '/' + from.getFullYear().toString().padStart(2, "0");
    var toDate = to.getDate() + "/" + (to.getMonth() + 1).toString().padStart(2, "0") + '/' + to.getFullYear().toString().padStart(2, "0");
    this.obj = { fromDate, toDate }
    this.appService.updateHoliday(this.obj).subscribe((res => {
      // console.log("res", res.data)
      res.data.forEach(data => {
        console.log(data);
        data.date = new Date(data.date);
        data.date = parseInt(data.date.getDate());

      });
      this.holidayList = res.data;

      this.loading = false;


      (err) => {
        this.loading = false;
      }

    }));
    //   this.schedule.getDate(fromDate, toDate).subscribe(
    //     (res) => {
    // console.log("res", res.data)
    //       res.data.forEach(data => {
    //         data.date = new Date(data.holidayDate);
    //         data.date =  parseInt(data.date.getDate());

    //       });
    //       this.holidayList = res.data;

    //         this.loading = false;

    //     },
    //     (err) => {
    //         this.loading = false;

    //     }
    // );
  }

  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
    renderEvent.body.forEach((day) => {
      console.log(day)
      // console.log(this.holidayList[0].date.getTime(), "==", day.date.getTime())
      const dayOfMonth = day.date.getDate();
      var i = this.holidayList.findIndex(
        (holiday) => holiday.date == dayOfMonth

      );
      // alert(this.holidayList);
      // console.log(this.holidayList);

      if (i != -1) {

        // console.log("hurray",dayOfMonth);
        if (dayOfMonth == this.holidayList[i].date && day) {
          // console.log("day",day)
          day.events[0] = null,
            day.cssClass = 'bg-pink';
          console.log(day)
        }
      }
    });


    setTimeout(() => {
      var ele = document.getElementsByClassName("bg-pink");
      for (var i = 0; i < ele.length; i++) {
        var number = ele[i].getElementsByClassName("cal-day-number");
        // document.getElementsByClassName("myclass")[0].textContent = 'Testing here';

        // ele[i]['style'].backgroundColor = "grey";
        // number[0]['style'].color = "white";
      }
    },
      100);





  }

  addText(day) {
    // console.log(day)
    const dayOfMonth = day.date.getDate();
    var i = this.holidayList.findIndex(
      (holiday) => holiday.date == dayOfMonth
    );
    if (i != -1) {
      if (dayOfMonth == this.holidayList[i].date && day.inMonth) {
        return this.holidayList[i].holidayName;
      }
    } else {
      return null;
    }

  }



  beforeWeekViewRender(renderEvent: CalendarWeekViewBeforeRenderEvent) {
    renderEvent.hourColumns.forEach((hourColumn) => {
      hourColumn.hours.forEach((hour) => {
        hour.segments.forEach((segment) => {
          if (
            segment.date.getHours() >= 2 &&
            segment.date.getHours() <= 5 &&
            segment.date.getDay() === 2
          ) {
            segment.cssClass = 'bg-pink';
          }
        });
      });
    });
  }

  beforeDayViewRender(renderEvent: CalendarDayViewBeforeRenderEvent) {
    renderEvent.hourColumns.forEach((hourColumn) => {
      hourColumn.hours.forEach((hour) => {
        hour.segments.forEach((segment) => {
          if (segment.date.getHours() >= 2 && segment.date.getHours() <= 5) {
            segment.cssClass = 'bg-pink';
          }
        });
      });
    });
  }

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.createHoliday(jsonData.Sheet1);
      // console.log("jsonData",jsonData.Sheet1)
      // const dataString = JSON.stringify(jsonData);
      // document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
      // this.setDownload(dataString);
    }
    reader.readAsBinaryString(file);
  }
  createHoliday(holidayList) {
    // console.log("Step1")
    var array = [];
    console.log(holidayList)
    holidayList.forEach(list_ => {
      array.push({
        "holidayDate": list_.Date,
        "holidayDay": list_.Day,
        "holidayName": list_.Name
      })
    });
    this.loading = true;
    // console.log("Step2")
    // this.holiday.createDate(array).subscribe(
    //   (res) => {
    // console.log("Step3")
    //  console.log("res",res);
    //    this.loading = false;
    //    this.toaster.success(res.data);

    //   },
    //   (err) => {
    // console.log("Step4")
    //    this.loading = false;
    //  console.log("Error");
    //    this.toaster.error(err.error.error.reason);
    //   }
    // );
  }

}