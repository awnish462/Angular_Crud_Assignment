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
    templateUrl:'./app.component.html',
    styleUrl:'./app.component.css'
})
export class AppComponent {
    synonyms: Synonym[] = [];
    synonym: Synonym = { Synonym: '', AltSynonyms: '', TechWord: '' };

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.loadSynonyms();
    }

    reload(){
        window.location.reload();
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
        this.reload();
    }

    updateSynonym() {
        this.http.put('http://localhost:3000/update', this.synonym).subscribe(() => {
            this.loadSynonyms();
        });
        this.reload();
    }

    deleteSynonym(Synonym: string) {
        this.http
            .delete('http://localhost:3000/delete', { body: { Synonym } })
            .subscribe(() => {
                this.loadSynonyms();
            });
            this.reload();
    }
}
