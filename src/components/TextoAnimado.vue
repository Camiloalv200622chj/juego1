<template>
  <div class="texto-animado">
    <span class="texto-content">{{ visibleText }}</span>
    <span v-if="isTyping" class="cursor">|</span>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  texto: { type: String, required: true }
});

const visibleText = ref("");
const isTyping = ref(false);

watch(
  () => props.texto,
  async (nuevo) => {
    if (!nuevo) return;
    
    visibleText.value = "";
    isTyping.value = true;
    
    for (let i = 0; i < nuevo.length; i++) {
      visibleText.value += nuevo[i];

      const char = nuevo[i];
      const delay = char === ' ' ? 5 : (char === '.' || char === '!' || char === '?') ? 30 : 12;
      await new Promise(res => setTimeout(res, delay));
    }
    
    isTyping.value = false;
  },
  { immediate: true }
);
</script>

<style scoped>
.texto-animado {
  white-space: pre-wrap;
  font-size: 1.15rem;
  line-height: 1.8;
  padding: 20px;
  color: rgba(255, 255, 255, 0.95);
  background: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  border-left: 4px solid #ff9800;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
}

.texto-content {
  display: inline;
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background-color: #ff9800;
  margin-left: 2px;
  animation: blink 0.8s infinite;
  vertical-align: text-bottom;
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.texto-animado::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 152, 0, 0.2), transparent);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% { left: -100%; }
  50%, 100% { left: 100%; }
}

@media (max-width: 768px) {
  .texto-animado {
    font-size: 1rem;
    padding: 15px;
  }
}
</style>