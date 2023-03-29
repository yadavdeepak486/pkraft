import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndDirective } from 'app/shared/directives/dnd.directive';
import { DragDropComponent } from '../reuse-component/drag-drop/drag-drop.component';
import { MaterialModule } from './material.module';

@NgModule({
    declarations: [DndDirective, DragDropComponent],
    imports: [CommonModule, MaterialModule],
    exports: [DndDirective, DragDropComponent],
})
export class ProjectModule {}
