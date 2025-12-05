import { Component, signal, OnInit, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';


interface Todo {
  id: string;
  title: string;
  checked?: boolean;
  created_at?:string
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,FormsModule],
  template: `
    <div class="app-root">
      <!-- Cabeçalho -->
      <header class="header">
        <h1 class="title">Lista de Tarefas</h1>
        <p class="subtitle">Gerencie suas tarefas usando a simulação de comunicação com API.</p>
      </header>

      <!-- Indicadores de status -->
      @if (loading()) {
        <div class="status loading">Carregando dados da API...</div>
      } @else if (error()) {
        <div class="status error">Erro: {{ error() }}</div>
      }

      <!-- Formulário de Adição de Tarefa -->
      <section class="card add-card">
        <form (ngSubmit)="addTodo()" class="add-form" novalidate>
          <input
            type="text"
            class="input"
            [value]="newTodoTitle()"
            (input)="newTodoTitle.set($event.target.value)"
            placeholder="Adicionar nova tarefa..."
            required
            [disabled]="loading()"
          />
          <button
            type="submit"
            class="btn primary"
            [disabled]="!newTodoTitle() || loading()"
          >
            Adicionar
          </button>
        </form>
      </section>

      <!-- Lista de Tarefas -->
      <section class="list-wrap">
        <ul class="todo-list">
          @if (todos().length === 0 && !loading()) {
            <li class="empty">Nenhuma tarefa encontrada. Adicione uma nova!</li>
          }
          @for (todo of todos(); track todo.id) {
            <li class="todo-item" [class.completed]="todo.checked">
              <div class="todo-main">
                <input
                  type="checkbox"
                  class="checkbox"
                  [checked]="todo.checked"
                  (change)="toggleCompletion(todo)"
                  [disabled]="loading() || editingTodoId() === todo.id"
                />

                @if (editingTodoId() === todo.id) {
                  <input
                    type="text"
                    class="input edit-input"
                    [value]="editingTitle()"
                    (input)="editingTitle.set($event.target.value)"
                    (keyup.enter)="saveEdit(todo)"
                    (keyup.escape)="cancelEdit()"
                    [disabled]="loading()"
                  />
                } @else {
                  <span class="todo-title" [class.strike]="todo.checked">{{ todo.title }}</span>
                }
              </div>

              <div class="actions">
                @if (editingTodoId() === todo.id) {
                  <button
                    (click)="saveEdit(todo)"
                    class="btn icon-btn save"
                    [disabled]="editingTitle().trim() === '' || loading()"
                    title="Salvar"
                  >✔</button>
                  <button
                    (click)="cancelEdit()"
                    class="btn icon-btn cancel"
                    title="Cancelar"
                  >✖</button>
                } @else {
                  <button
                    (click)="startEdit(todo)"
                    class="btn icon-btn edit"
                    [disabled]="loading() || todo.checked"
                    title="Editar"
                  >✏</button>
                  <button
                    (click)="deleteTodo(todo.id)"
                    class="btn icon-btn delete"
                    [disabled]="loading() || editingTodoId() !== null"
                    title="Excluir"
                  >🗑</button>
                }
              </div>
            </li>
          }
        </ul>
      </section>

      <!-- Resumo do status (computado) -->
      <footer class="footer">
        <p class="footer-text">
          Total de Tarefas: <strong>{{ todos().length }}</strong> |
          Completas: <strong class="green">{{ completedCount() }}</strong> |
          Pendentes: <strong class="red">{{ pendingCount() }}</strong>
        </p>
      </footer>
    </div>
  `,
  styles: [`
    /* Layout geral */
    .app-root {
      min-height: 100vh;
      background: #f7f8fb;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 16px;
      box-sizing: border-box;
      color: #1f2937;
      font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    }

    /* Cabeçalho */
    .header {
      width: 100%;
      max-width: 720px;
      text-align: center;
      margin-bottom: 28px;
    }
    .title {
      font-size: 2rem;
      margin: 0;
      font-weight: 800;
      color: #111827;
    }
    .subtitle {
      margin: 8px 0 0 0;
      color: #6b7280;
      font-size: 0.95rem;
    }

    /* Status */
    .status {
      width: 100%;
      max-width: 720px;
      margin-bottom: 16px;
      padding: 10px 14px;
      border-radius: 8px;
      box-sizing: border-box;
      font-weight: 600;
    }
    .status.loading {
      color: #3730a3;
      background: #eef2ff;
      border: 1px solid #e0e7ff;
    }
    .status.error {
      color: #b91c1c;
      background: #fff1f2;
      border: 1px solid #fecaca;
    }

    /* Card / Form */
    .card {
      width: 100%;
      max-width: 720px;
      background: #fff;
      padding: 18px;
      border-radius: 12px;
      box-shadow: 0 6px 18px rgba(17,24,39,0.06);
      margin-bottom: 20px;
      box-sizing: border-box;
    }
    .add-form {
      display: flex;
      gap: 12px;
    }
    .input {
      flex: 1 1 auto;
      padding: 10px 12px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
      outline: none;
      box-sizing: border-box;
    }
    .input:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
    }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px 14px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.95rem;
      transition: background 120ms ease, opacity 120ms ease;
      user-select: none;
    }
    .btn[disabled] {
      opacity: 0.55;
      cursor: not-allowed;
    }
    .btn.primary {
      background: #4f46e5;
      color: #fff;
      box-shadow: 0 6px 12px rgba(79,70,229,0.14);
    }
    .btn.primary:hover:not([disabled]) { background: #4338ca; }

    .btn.icon-btn {
      padding: 8px;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      font-size: 0.9rem;
    }
    .btn.icon-btn.edit { background: #eef2ff; color: #4338ca; }
    .btn.icon-btn.edit:hover:not([disabled]) { background: #e0e7ff; }
    .btn.icon-btn.save { background: #10b981; color: white; }
    .btn.icon-btn.cancel { background: #9ca3af; color: white; }
    .btn.icon-btn.delete { background: #fee2e2; color: #b91c1c; }

    /* Lista */
    .list-wrap {
      width: 100%;
      max-width: 720px;
      box-sizing: border-box;
    }
    .todo-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .empty {
      padding: 18px;
      background: #fff7ed;
      color: #92400e;
      border-radius: 10px;
      text-align: center;
      font-weight: 600;
    }
    .todo-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 14px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 6px 12px rgba(17,24,39,0.04);
      transition: box-shadow 0.12s ease, opacity 0.12s ease;
    }
    .todo-item:hover { box-shadow: 0 10px 22px rgba(17,24,39,0.06); }

    .todo-main {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
      flex: 1 1 auto;
    }
    .checkbox {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
    .todo-title {
      font-size: 1rem;
      color: #111827;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .todo-item.completed { opacity: 0.6; }
    .todo-title.strike { text-decoration: line-through; color: #6b7280; }

    .edit-input {
      padding: 8px 10px;
      font-size: 1rem;
      border-radius: 8px;
      border: 1px solid #c7d2fe;
      box-sizing: border-box;
      flex: 1 1 auto;
    }

    .actions {
      display: flex;
      gap: 8px;
      margin-left: 12px;
    }

    /* Footer */
    .footer {
      width: 100%;
      max-width: 720px;
      margin-top: 20px;
      padding-top: 14px;
      border-top: 1px solid #e6e7eb;
      text-align: center;
    }
    .footer-text { color: #6b7280; font-size: 0.95rem; }
    .green { color: #059669; font-weight: 700; }
    .red { color: #dc2626; font-weight: 700; }

    /* Responsividade simples */
    @media (max-width: 520px) {
      .add-form { flex-direction: column; }
      .btn.primary { width: 100%; }
      .actions { gap: 6px; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit {

  todos = signal<Todo[]>([]);
  newTodoTitle = signal('');
  loading = signal(false);
  error = signal<string | null>(null);
  

  editingTodoId = signal<string | null>(null);
  editingTitle = signal('');

  completedCount = computed(() => this.todos().filter(t => t.checked).length);
  pendingCount = computed(() => this.todos().length - this.completedCount());

  private API_URL = environment.API_URL;

  ngOnInit(): void {
    this.fetchTodos();
  }

  private async safeFetch(url: string, options: RequestInit, maxRetries = 3): Promise<Response> {
    this.error.set(null);
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP Erro! Status: ${response.status}`);
        }
        return response;
      } catch (e) {
        console.error(`Tentativa ${attempt + 1} falhou.`, e);
        if (attempt === maxRetries - 1) {
          // É a última tentativa, lança o erro final
          throw new Error(`Falha na comunicação com a API após ${maxRetries} tentativas.`);
        }
      
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
   
    throw new Error("Falha na comunicação com a API.");
  }

  async fetchTodos(): Promise<void> {
    this.loading.set(true);
    try {
     
      const response = await this.safeFetch(`${this.API_URL}`, { method: 'GET' });
      const data = await response.json();
      let dataList = data.listTodoList
      this.todos.set(dataList);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Erro desconhecido ao carregar tarefas.');
    } finally {
      this.loading.set(false);
    }
  }


  async addTodo(): Promise<void> {
    const title = this.newTodoTitle().trim();
    if (!title) return;
    this.loading.set(true);
    this.newTodoTitle.set(''); 


    const newTodo: Todo = {
      title: title,
      id:""
    };

    try {
      
      const response = await this.safeFetch(this.API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      })

      const reponse = await response.json();
      const task : Todo = reponse.todoList;
      this.todos.update(currentTodos => [...currentTodos, task]);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Erro ao adicionar tarefa.');
    } finally {
      this.loading.set(false);
    }
  }


  async toggleCompletion(todo: Todo): Promise<void> {
    this.loading.set(true);
  
    const updatedTodo = { ...todo, checked: !todo.checked };
  
    try {
      await this.safeFetch(`${this.API_URL}/${todo.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: updatedTodo.checked }),
      });
  
     
      this.todos.update(currentTodos =>
        currentTodos.map(t => (t.id === todo.id ? updatedTodo : t))
      );
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Erro ao atualizar status.');
    } finally {
      this.loading.set(false);
    }
  }
  

  startEdit(todo: Todo): void {
    if (todo.checked) return;
    this.editingTodoId.set(todo.id);
    this.editingTitle.set(todo.title);
  }


  cancelEdit(): void {
    this.editingTodoId.set(null);
    this.editingTitle.set('');
  }


  async saveEdit(todo: Todo): Promise<void> {
    const newTitle = this.editingTitle().trim();
    if (!newTitle || newTitle === todo.title) {
      this.cancelEdit();
      return;
    }

    this.loading.set(true);
    const updatedTodo = { ...todo, title: newTitle };

    try {
    
      await this.safeFetch(`${this.API_URL}/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });

      this.todos.update(currentTodos =>
        currentTodos.map(t => (t.id === todo.id ? updatedTodo : t))
      );
      this.cancelEdit();
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Erro ao salvar edição.');
    } finally {
      this.loading.set(false);
    }
  }


  async deleteTodo(id: string): Promise<void> {
    if (!confirm('Tem certeza de que deseja excluir esta tarefa?')) return;
    
    this.loading.set(true);
    
    try {
    
      await this.safeFetch(`${this.API_URL}/${id}`, {
        method: 'DELETE',
      });

      this.todos.update(currentTodos => currentTodos.filter(t => t.id != id));
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Erro ao excluir tarefa.');
    } finally {
      this.loading.set(false);
    }
  }
}
