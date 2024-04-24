import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Districts } from 'src/app/bus-operator/components/enum/districts.enum';
import { UserServiceService } from 'src/app/service/user-service.service';
import { SearchEnum } from '../search.enum';
import { formatDate } from '@angular/common';
import { SearchRequest } from 'src/app/core/interface/searchRequest';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchQuery: string = '';
  selectedFromToAndDate!: FormGroup ;
  fromPlace = Object.values(SearchEnum);
  toPlace = Object.values(SearchEnum);
  showInputField: boolean = false;
  test:string='';

  constructor(private fb: FormBuilder,private userService:UserServiceService,private router: Router) { }

  ngOnInit(): void {
    this.selectedFromToAndDate = this.fb.group({
      departurePlace: ['', Validators.required],
      // departureDate: ['', Validators.required],
      departureDate: [new Date(), Validators.required],
      arrivalPlace: ['', Validators.required]
    });
    console.log("Oninit ",this.selectedFromToAndDate.value);
    
  }
  search() {
    const formData = this.selectedFromToAndDate.value;

    const searchData: SearchRequest = {
      departurePlace: formData.departurePlace,
      arrivalPlace: formData.arrivalPlace,
      departureDate: formData.departureDate,
    };

    


    const departureDate = new Date(searchData.departureDate);
    const year = departureDate.getFullYear();
    const month = ('0' + (departureDate.getMonth() + 1)).slice(-2); // Add 1 to month because it's zero-based index
    const day = ('0' + departureDate.getDate()).slice(-2);
    
    const formattedDate = `${year}-${month}-${day}`;
    console.log("DEPARTURE   : ",formattedDate);


    console.log("DEPARTURE DATE  : ",searchData.departureDate);
    
   
    
    
    this.userService.searchBus(searchData).subscribe((response: any) => {
      console.log("RESPONSE  ",response);
      if (response && response.length > 0) {
        this.router.navigate(['/customer/bus-list'], {
          queryParams: {
            buses: JSON.stringify(response)
          }
        });
      } else {
        this.router.navigate(['/customer/error-page'])
      }
      
    }, (error) => {
      console.log("RESPONSE  ERR",error);
      
      this.router.navigate(['/customer/error-page'])
    });
  }
  onDepartureDateChange(value: any) {
    this.selectedFromToAndDate.patchValue({
      departureDate: value
    });
  }

  toggleInputVisibility(value: string): void {
    this.showInputField = (value === 'other');
    if (!this.showInputField) {
      this.selectedFromToAndDate.get('customDeparturePlace')?.setValue(null);
    }
  }

  onDeparturePlaceSelectionChange(value: string) {
    this.selectedFromToAndDate.patchValue({
      departurePlace: value
    });
  }

  onArrivalPlaceSelectionChange(value: string) {
    this.selectedFromToAndDate.patchValue({
      arrivalPlace: value
    });
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }
    // Disable dates before the current date
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (date < currentDate) {
      return false;
    }

    // Enable only current date to next 2 months duration dates
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2);
    maxDate.setDate(maxDate.getDate() - 1);
    maxDate.setHours(0, 0, 0, 0);
    if (date > maxDate) {
      return false;
    }

    return true;
  };
}

  

