import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from '../interfaces/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  filteredTodos: Todo[] = [];
  todos: Todo[] = [
    {
      task: 'Eat dinner',
      completed: false,
    },
    {
      task: 'Fold laundry',
      completed: false,
    },
    {
      task: 'Go on a walk',
      completed: true,
    },
    {
      task: 'Walk imaginary dog',
      completed: false,
    },
  ];
  taskSearchTerm: string = '';
  constructor() {}

  ngOnInit(): void {
    this.filteredTodos = this.todos;
  }

  filterTasks = (taskSearchTerm: string): Todo[] => {
    if (!taskSearchTerm) {
      return this.todos;
    } else {
      return this.todos.filter((item) => {
        let currentTask = item.task.toLowerCase().trim();
        return currentTask.includes(taskSearchTerm.toLowerCase().trim());
      });
    }
  };
  setTaskSearchTerm = (form: NgForm): void => {
    this.filteredTodos = this.filterTasks(form.value.searchTerm);
    this.taskSearchTerm = form.value.searchTerm;
  };

  addTask = (form: NgForm): void => {
    let newToDo: Todo = {
      task: form.value.newTask,
      completed: false,
    };
    this.todos.push(newToDo);
    form.reset();
  };

  removeTask = (index: number) => {
    this.todos.splice(index, 1);
  };

  completeTask = (index: number): void => {
    this.todos[index].completed = true;
  };
}
