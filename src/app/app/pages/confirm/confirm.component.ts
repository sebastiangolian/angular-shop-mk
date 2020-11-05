import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { RulesService } from '../../services/rules.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class PageConfirmComponent implements OnInit {

  private resignationUrl: string = "http://www.poczta-polska.pl"
  private acceptUrl: string = "/home"

  public isEnabled:boolean = false
  public config:any = {show: true, ignoreBackdropClick: true, keyboard: false}

  constructor(private router: Router, private rulesService: RulesService) {}
   
  ngOnInit() {}

  accept() {
    if(this.isEnabled == true)
      this.isEnabled = false
    else
      this.isEnabled = true
  }

  confirm() {
    this.rulesService.setRules()
    this.router.navigate([this.acceptUrl])
  }

  reject() {
    window.open(this.resignationUrl, '_self');
  }
}
