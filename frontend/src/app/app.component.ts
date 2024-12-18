import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Synonym {
    Synonym: string;
    AltSynonyms: string;
    TechWord: string;
}

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, CommonModule],
    template: `
        <h1>Synonyms Manager</h1>
        <div>
            <input [(ngModel)]="synonym.Synonym" placeholder="Synonym" />
            <input [(ngModel)]="synonym.AltSynonyms" placeholder="Alt Synonyms" />
            <input [(ngModel)]="synonym.TechWord" placeholder="Tech Word" />
            <button (click)="addSynonym()">Add</button>
            <button (click)="updateSynonym()">Update</button>
        </div>
        <table>
            <tr>
                <th>Synonym</th>
                <th>Alt Synonyms</th>
                <th>Tech Word</th>
                <th>Actions</th>
            </tr>
            <tr *ngFor="let s of synonyms">
                <td>{{ s.Synonym }}</td>
                <td>{{ s.AltSynonyms }}</td>
                <td>{{ s.TechWord }}</td>
                <td><button (click)="deleteSynonym(s.Synonym)">Delete</button></td>
            </tr>
        </table>
    `,
    styles: [`
      .container {
          margin: 20px;
      }
      .form {
          margin-bottom: 20px;
      }
      table {
          width: 100%;
          border-collapse: collapse;
      }
      th, td {
          border: 1px solid #ddd;
          padding: 8px;
      }
      th {
          background-color: #f4f4f4;
      }
  `],
})
export class AppComponent {
    synonyms: Synonym[] = [];
    synonym: Synonym = { Synonym: '', AltSynonyms: '', TechWord: '' };

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.loadSynonyms();
    }

    loadSynonyms() {
        this.http.get<Synonym[]>('http://localhost:3000/view').subscribe((data) => {
            this.synonyms = data;
        });
    }

    addSynonym() {
        this.http.post('http://localhost:3000/add', this.synonym).subscribe(() => {
            this.loadSynonyms();
            this.synonym = { Synonym: '', AltSynonyms: '', TechWord: '' };
        });
    }

    updateSynonym() {
        this.http.put('http://localhost:3000/update', this.synonym).subscribe(() => {
            this.loadSynonyms();
        });
    }

    deleteSynonym(Synonym: string) {
        this.http
            .delete('http://localhost:3000/delete', { body: { Synonym } })
            .subscribe(() => {
                this.loadSynonyms();
            });
    }
}
