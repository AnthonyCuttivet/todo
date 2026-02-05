<script setup lang="ts">
import { ref } from 'vue';
import type { Todo, UpdateTodoDto } from '../types';
import { useTodoStore } from '../stores/todoStore';

const props = defineProps<{ todo: Todo }>();
const todoStore = useTodoStore();

const isEditing = ref(false);

async function toggleCheck() {
  const dto:UpdateTodoDto = {title:props.todo.title, content:props.todo.content, priority:props.todo.priority, executionDate:props.todo.executionDate, checked:!props.todo.checked};
  await todoStore.updateTodo(props.todo.id, dto);
}

function startEdit() {
  todoStore.setEditingTodo(props.todo);
  window.scrollTo({top:0, behavior:'smooth'});
}

async function deleteTodo() {
  if (confirm('Etes vous sûr de vouloir supprimer ce #TODO ?')) {
    await todoStore.deleteTodo(props.todo.id);
  }
}
</script>

<template>
  <div class="todo-item" :class="{ completed: todo.checked, editing: todoStore.editingTodo?.id === todo.id }">
    <input
      type="checkbox"
      :checked="todo.checked"
      @change="toggleCheck"
      class="checkbox"
    />

    <div class="todo-content">
      <div class="todo-header">
        <h3 class="title">{{ todo.title }}</h3>
        <span class="priority-badge" :class="`priority-${todo.priority}`">
          {{ todo.priority === 'low' ? 'Basse' : todo.priority === 'medium' ? 'Moyenne' : 'Haute' }}
        </span>
      </div>

      <p class="content">{{ todo.content }}</p>

      <div class="todo-footer">
        <span class="date-info">
          Créé le {{ new Date(todo.createdAt).toLocaleDateString() }}
        </span>
        <span class="executionDate" v-if="todo.executionDate">
          À faire le {{ new Date(todo.executionDate).toLocaleDateString() }}
        </span>
      </div>
    </div>

    <div class="actions">
      <button v-if="!isEditing" @click="startEdit" class="btn-edit">✏️</button>
      <button @click="deleteTodo" class="btn-delete">🗑️</button>
    </div>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background: #282828;
  border: 1px solid #bd94f0;
  border-radius: 6px;
  transition: all 0.2s;
}

.todo-item:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.todo-item.completed {
  opacity: 0.6;
}

.todo-item.completed .content {
  text-decoration: line-through;
}

.todo-item.editing {
  border: 2px dashed #d6850a;
}

.checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: #bd94f0;
}

.todo-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px 0;
  cursor: pointer;
  color: #d4b7f5;
}

.todo-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.content {
  font-size: 14px;
  color: #b0b0b0;
  margin: 0;
  line-height: 1.5;
  word-break: keep-all;
  overflow-wrap: anywhere;
}

.priority-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.priority-low {
  background: rgba(72, 187, 120, 0.2);
  color: #68d391;
}

.priority-medium {
  background: rgba(237, 137, 54, 0.2);
  color: #ed8936;
}

.priority-high {
  background: rgba(245, 101, 101, 0.2);
  color: #fc8181;
}

.todo-footer {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #718096;
  margin-top: 4px;
}

.date-info,
.executionDate {
  display: flex;
  align-items: center;
  gap: 4px;
}

.actions {
  display: flex;
  gap: 8px;
}

.actions button {
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  transition: background 0.2s;
}

.actions button:hover {
  background: #93909633;
}
</style>
