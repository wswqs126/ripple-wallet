import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RippleService} from '../ripple.service';
import { GlobalVariable } from '../global-variable';
@Component({
    selector: 'app-decryptwallet',
    templateUrl: './decryptwallet.component.html',
    styleUrls: ['./decryptwallet.component.css']
})
export class DecryptwalletComponent implements OnInit {
    tipinfo: string;
    password: string;
    constructor(private ripple: RippleService, public gv: GlobalVariable, private router: Router) { }

    ngOnInit() {
    }
    decryptWallet() {
        console.log(this.gv.wallet, this.password);
        if (!this.password) {
            this.tipinfo = "密码不能为空";
            return;
        }
        this.ripple.decryptWallet(this.gv.wallet.address, this.password).subscribe(result => {
            if (result.ok) {
                console.log(result);
                this.gv.wallet = result.data;
                this.tipinfo = "钱包文件解密成功";
                this.router.navigate(['walletinfo']);
            } else {
                this.tipinfo = result.data;
            }
        });
    }
}
