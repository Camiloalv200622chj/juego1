<template>
  <div class="boton-container">
    <q-btn 
      @click="accionBoton"
      :style="{ backgroundColor: props.colorFondo, color: props.textoColor }"
      :label="props.nombreBoton"
      rounded
      unelevated
      class="boton-glow"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["accion"]);

function accionBoton() {
  emit("accion");
}

const props = defineProps({
  colorFondo: { type: String, default: "purple" },
  textoColor: { type: String, default: "white" },
  nombreBoton: { type: String, default: "Generar receta" }
});
</script>

<style scoped>
.boton-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.boton-glow :deep(.q-btn) {
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.boton-glow :deep(.q-btn)::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.boton-glow :deep(.q-btn):hover::before {
  width: 300px;
  height: 300px;
}

.boton-glow :deep(.q-btn):hover {
  transform: translateY(-3px);
  filter: brightness(1.2);
}

.boton-glow :deep(.q-btn):active {
  transform: translateY(0);
  filter: brightness(0.9);
}
</style>