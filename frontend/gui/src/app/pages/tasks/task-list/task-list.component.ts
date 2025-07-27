import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../core/tasks/tasks.service';
import { Task } from '../../../core/models/task.model';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

// Interfaz para tipar las columnas del Kanban
interface KanbanColumn {
  header: string;
  status: string;
  tasks: Task[];
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [CommonModule, PanelModule, CardModule, HeaderComponent, DragDropModule]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  kanbanColumns: KanbanColumn[] = [];
  columnIds: string[] = []; // Arreglo para almacenar los IDs de las columnas


  constructor(private TaskService: TaskService) {}

  ngOnInit(): void {
    let username: string | null = null;
    if (typeof window !== 'undefined') {
      username = localStorage.getItem('username');
    }
    if (username) {
      this.TaskService.getTasksByUser(username).subscribe({
        next: (res) => {
          this.tasks = res.intData?.data ?? [];
          this.setKanbanColumns();
        },
        error: (err) => {
          this.tasks = [];
          console.error('Error fetching tasks:', err);
        }
      });
    }
  }

  setKanbanColumns() {
    this.kanbanColumns = [
      { header: 'Pendiente', status: 'Incomplete', tasks: this.tasks.filter(t => t.status === 'Incomplete') },
      { header: 'En progreso', status: 'InProgress', tasks: this.tasks.filter(t => t.status === 'InProgress') },
      { header: 'Pausada', status: 'Paused', tasks: this.tasks.filter(t => t.status === 'Paused') },
      { header: 'Revisión', status: 'Revision', tasks: this.tasks.filter(t => t.status === 'Revision') },
      { header: 'Hecho', status: 'Completed', tasks: this.tasks.filter(t => t.status === 'Completed') }
    ];
    // Generar los IDs de las columnas para cdkDropListConnectedTo
    this.columnIds = this.kanbanColumns.map(column => column.status);
  }


  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      // Reordenar dentro de la misma columna
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Mover entre columnas
      const task = event.previousContainer.data[event.previousIndex];
      const newStatus = event.container.id; // El status es el id del contenedor
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Actualiza el estado de la tarea en el backend
      this.TaskService.updateTaskStatus(task.id!, newStatus).subscribe({
        next: (res) => {
          console.log('Estado de la tarea actualizado:', res);
          // Actualiza la tarea en la matriz de tareas locales para reflejar el nuevo estado
          const taskIndex = this.tasks.findIndex(t => t.id === task.id);
          if (taskIndex !== -1) {
            this.tasks[taskIndex].status = newStatus;
          }
        },
        error: (err) => {
          console.error('Error al actualizar el estado de la tarea:', err);
          // Revertir el cambio de UI si falla la llamada API
          transferArrayItem(
            event.container.data,
            event.previousContainer.data,
            event.currentIndex,
            event.previousIndex
          );
        }
      });
    }
  }

  getCardColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
      return '#A5D6A7'; // Verde menta suave y profesional
      case 'paused':
        return '#FFF59D'; // Amarillo dorado claro, elegante
      case 'inprogress':
        return '#FFCC80'; // Naranja durazno sobrio
      case 'revision':
        return '#90CAF9'; // Azul profesional, más suave
      case 'incomplete':
      default:
        return '#ECEFF1'; // Gris claro, elegante y profesional
    }
  }

  getStatusTextColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
      return '#A5D6A7'; // Verde menta suave y profesional
      case 'paused':
        return '#FFF59D'; // Amarillo dorado claro, elegante
      case 'inprogress':
        return '#FFCC80'; // Naranja durazno sobrio
      case 'revision':
        return '#90CAF9'; // Azul profesional, más suave
      case 'incomplete':
      default:
        return '#ECEFF1'; // Gris claro, elegante y profesional
    }
  }

  getColumnColor(status: string): { 'background-color': string } {
    switch (status.toLowerCase()) {
      case 'incomplete':
        return { 'background-color': '#546E7A' }; // Azul grisáceo profesional
      case 'inprogress':
        return { 'background-color': '#FB8C00' }; // Naranja quemado elegante
      case 'paused':
        return { 'background-color': '#FBC02D' }; // Amarillo mostaza suave
      case 'revision':
        return { 'background-color': '#1E88E5' }; // Azul moderno sobrio
      case 'completed':
        return { 'background-color': '#66BB6A' }; // Verde menta profesional
      default:
        return { 'background-color': '#757575' }; // Gris neutral
    }
  }
}
