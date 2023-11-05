import { Component } from '@angular/core';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss']
})
export class ProjetosComponent {
  projects: String[] = ["aaaa", "bbbb", "cccc"];

  hasProjects(): boolean {
    return this.projects.length > 0;
  }
}
