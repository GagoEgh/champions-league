import { Component, OnInit } from '@angular/core';

interface Champions {
  name: string,
  logo: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  fClubs!: Champions[]
  groupB: Champions[] = [
    {
      name: 'Barselona',
      logo: 'assets/logo/barcelona.jpg'
    },
    {
      name: 'Real Madrid',
      logo: 'assets/logo/realmadrid.jpg'
    },
    {
      name: 'Atletico Madrid',
      logo: 'assets/logo/atletico_madrid.jpg'
    },
    {
      name: 'Manchester City',
      logo: 'assets/logo/Manchester-City.jpg'
    },
    {
      name: 'PSG',
      logo: 'assets/logo/PSG.png'
    },
    {
      name: 'Arsenal',
      logo: 'assets/logo/arsenalfc.jpg'
    },
    {
      name: 'Liverpool',
      logo: 'assets/logo/Liverpool.jpg'
    },
    {
      name: 'Bayern Munchen',
      logo: 'assets/logo/bayernmunich.jpg'
    },
    {
      name: 'Borussia Dortmund',
      logo: 'assets/logo/borussia_dortmund.jpg'
    },
    {
      name: 'RB Leipzig',
      logo: 'assets/logo/leipzig.jpg'
    },
    {
      name: 'Juventus',
      logo: 'assets/logo/Juve.jpg'
    },
    {
      name: 'Milan',
      logo: 'assets/logo/acmilan.jpg'
    },
    {
      name: 'Internazionale',
      logo: 'assets/logo/inter.jpg'
    },
    {
      name: 'Ajax',
      logo: 'assets/logo/Ajax-fc.jpg'
    },
    {
      name: 'Porto',
      logo: 'assets/logo/Porto-logo.png'
    },
    {
      name: 'Shakhtar',
      logo: 'assets/logo/shakhtar.jpg'
    },

  ]


  groupA: Champions[] = [];
  cloneGroupA: Champions[] = [];
  cloneGroupB: Champions[] = [];

  groupAFinal8: any = []
  groupBFinal8: any = []

  groupAFinal4: any = []
  groupBFinal4: Champions[] = [];

  groupAFinal2: Champions[] = [];
  groupAFinal2b: Champions[] = [];
  groupBFinal2: Champions[] = [];
  groupBFinal2b: Champions[] = [];

  groupAFinal1: Champions[] = [];
  groupBFinal1: Champions[] = [];
  final: Champions[] = [];
  champion: Champions[] = [];
  isFinal2 = false;
  isFinal = false;
  ngOnInit(): void {
    this.fClubs = structuredClone(this.groupB);
  }


  private createNextGroup(group: Champions[], nextGroup: Champions[] | Champions[][], size: number) {
    let arr8: any = [];
    for (let i = 0; i < group.length; i++) {
      let index = Math.round(Math.random() * group.length / 2);
      let splice: any;
      splice = group.splice(index, size);

      if (size === 2) {
        arr8.push(splice);
        if (group.length === 2) {
          arr8.push(group)
        }
        if (arr8.length === 2) {
          nextGroup.push(arr8);
          arr8 = []
        }
      } else {
        nextGroup.push(splice[0]);
      }

    }
  }

  create() {

    if (this.groupA.length <= Math.floor(this.groupB.length / 2 + 3) && this.groupAFinal8!.length === 0) {
      this.createNextGroup(this.groupB, this.groupA, 1);
      this.cloneGroupA = structuredClone(this.groupA);
      this.cloneGroupB = structuredClone(this.groupB);
    } else if (this.groupB.length === 8 && this.groupA.length === 8) {

      this.createNextGroup(this.groupA, this.groupAFinal8, 2);
      this.createNextGroup(this.groupB, this.groupBFinal8, 2);

    } else if (!this.isFinal2) {
      let finalA8 = structuredClone(this.groupAFinal8);
      let finalB8 = structuredClone(this.groupBFinal8);
      for (let i = 0; i < finalA8.length; i++) {
        for (let k = 0; k < finalA8[i].length; k++) {
          this.createNextGroup(finalA8[i][k], this.groupAFinal4, 1);
        }
      }

      for (let i = 0; i < finalB8.length; i++) {
        for (let k = 0; k < finalB8[i].length; k++) {
          this.createNextGroup(finalB8[i][k], this.groupBFinal4, 1);
        }
      }

      this.groupAFinal2 = this.groupAFinal4.slice(0, 2);
      this.groupAFinal2b = this.groupAFinal4.slice(2, 4);
      this.groupBFinal2 = this.groupBFinal4.slice(0, 2);
      this.groupBFinal2b = this.groupBFinal4.slice(2, 4);

      this.isFinal2 = true
    } else if (this.isFinal2 && !this.isFinal) {
      let finalA2 = structuredClone(this.groupAFinal2);
      let finalA2A = structuredClone(this.groupAFinal2b);
      this.createNextGroup(finalA2, this.groupAFinal1, 1);
      this.createNextGroup(finalA2A, this.groupAFinal1, 1);
      let finalB2 = structuredClone(this.groupBFinal2);
      this.createNextGroup(finalB2, this.groupBFinal1, 1);
      let finalB2B = structuredClone(this.groupBFinal2b);
      this.createNextGroup(finalB2B, this.groupBFinal1, 1);
      this.isFinal = true;

    } else if (this.final.length === 0 && this.isFinal) {
      let finalA = structuredClone(this.groupAFinal1);
      let finalB = structuredClone(this.groupBFinal1);
      this.createNextGroup(finalA, this.final, 1);
      this.createNextGroup(finalB, this.final, 1);

    } else if (this.final.length === 2 && this.isFinal) {

      let cloneFinal = structuredClone(this.final)
      this.createNextGroup(cloneFinal, this.champion, 1);
    }

  }




}
