import { ref } from 'vue';
import type { Message } from '@/types/Message';

export function useMessage() {
  const message = ref<Message>({ type: 'error', text: '' });

  const updateMessage = (m: Message) => {
    message.value = m;
  };

  return {
    message,
    updateMessage
  };
}
