import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchByName'
})
export class SearchByNamePipe implements PipeTransform {
    transform(projectList, value) {
        if (!value) { return projectList; }
        return projectList.filter(project => {
            if (project.author) {
                return project.author.toLowerCase().includes(value.toLowerCase());
            }
            return project.title.toLowerCase().includes(value.toLowerCase());
        });
    }
}
