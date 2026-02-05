import { ref } from "vue";

export const TODO_TITLE_MAX_LENGTH:number = 49;
export const TODO_CONTENT_MAX_LENGTH:number = 255;

export function useTodoValidation() {
    const errors = ref<{ title?: string; content?: string }>({});

    function validateTodo(title: string, content: string): boolean {
      errors.value = {};

      if (!title.trim()) {
        errors.value.title = 'Un titre est requis';
        return false;
      }
      if (title.length > TODO_TITLE_MAX_LENGTH) {
        errors.value.title = 'Le titre doit faire au maximum ' + TODO_TITLE_MAX_LENGTH + ' caractères';
        return false;
      }
      if (!content.trim()) {
        errors.value.content = 'Un contenu est requis';
        return false;
      }
      if (content.length > TODO_CONTENT_MAX_LENGTH) {
        errors.value.content = 'Le contenu doit faire au maximum ' + TODO_CONTENT_MAX_LENGTH + ' caractères';
        return false;
      }

      return true;
    }

    return { errors, validateTodo };
  }
