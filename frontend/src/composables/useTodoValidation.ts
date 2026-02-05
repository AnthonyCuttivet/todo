import { ref } from "vue";

export function useTodoValidation() {
    const errors = ref<{ title?: string; content?: string }>({});

    function validateTodo(title: string, content: string): boolean {
      errors.value = {};

      if (!title.trim()) {
        errors.value.title = 'Title is required';
        return false;
      }
      if (title.length > 50) {
        errors.value.title = 'Title must be under 50 characters';
        return false;
      }
      if (!content.trim()) {
        errors.value.content = 'Content is required';
        return false;
      }
      if (content.length > 256) {
        errors.value.content = 'Content must be under 256 characters';
        return false;
      }

      return true;
    }

    return { errors, validateTodo };
  }
