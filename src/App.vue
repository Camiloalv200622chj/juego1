<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="page-container meme-background">
        
        <div class="particles-container noise-texture" id="particles-js"></div>
        
        <div class="content-wrapper">
          
          <transition name="fade-slide" mode="out-in">
            <div v-if="!generadorActivo" class="landing-screen" key="landing">
              <div class="brutal-card landing-card">
                <div class="header-section landing-header">
                  <h1 class="main-title glitch-text">
                    <span class="title-top">LISTO PARA LA</span>
                    <span class="title-bottom">AMARGURA CULINARIA</span>
                  </h1>
                  <p class="subtitle sarcasm-tagline">
                    PRESIONA EL BOTÓN. NO HAY MARCHA ATRÁS. 🛑
                  </p>
                </div>
                
                <BotonPersonalizado
                  colorFondo="red-9"
                  textoColor="yellow-2"
                  nombreBoton="🔥🔥 INICIAR GENERADOR DE RECETAS 🔥🔥"
                  @accion="activarGenerador"
                  class="custom-btn brutal-button landing-button"
                />
                
                <div class="landing-footer">
                  <p>Versión 1.0.0 | Copyright 2025. Lamentamos tu vida.</p>
                </div>
              </div>
            </div>
            
            <div v-else class="generator-screen" key="generator">
              
              <div class="header-section">
                <div class="title-container">
                  <div class="title-content">
                    <h1 class="main-title glitch-text title-smaller">
                      <span class="title-top">RECETAS PARA</span>
                      <span class="title-bottom">AMARGADOS.COM</span>
                    </h1>
                    <p class="subtitle sarcasm-tagline">
                      EL SABOR ES OPCIONAL. LA AMARGURA ES OBLIGATORIA. 🔪
                    </p>
                  </div>
                </div>
              </div>

              <div class="two-column-layout brutal-grid">
                
                <div class="left-column">
                  <div class="brutal-card input-card">
                    
                    <div class="input-section terminal-frame"> <div class="input-wrapper">
                        <span class="input-icon terminal-icon"></span> <q-input
                          filled
                          v-model="plato"
                          :label="plato.length === 0 ? 'INGRESE LA RECETA' : ''"
                          class="custom-input terminal-input"
                          dark
                          @keyup.enter="generar"
                          hide-bottom-space
                        >
            
                        </q-input>
                      </div>
                    </div>

                    <div class="button-section">
                      <BotonPersonalizado
                        colorFondo="red-9"
                        textoColor="yellow-2"
                        nombreBoton="💀 GENERAR RECETA (SI TE ATREVES) 💀"
                        @accion="generar"
                        class="custom-btn brutal-button"
                      />
                    </div>

                    <div class="instructions warning-box">
                      <div class="instructions-icon">🚨</div>
                      <div class="instructions-content">
                        <p><strong>ADVERTENCIA:</strong> No le eches la culpa al asistente si quemas la cocina. Ya te advertimos.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="right-column">
                  <div class="brutal-card response-container scroll-active">
                    
                    <div v-if="cargando" class="loading-section error-loading">
                      <div class="spinner-container">
                        <div class="spinner-orbit">
                          <q-spinner-dots size="80px" color="red" />
                        </div>
                        <div class="loading-text-container">
                          <p class="loading-text">Cargando la receta... (Por favor, espere. O no.)</p>
                          <div class="loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-else-if="respuesta" class="response-section response-frame">
                      <div class="response-card">
                        <div class="response-header">
                          <span class="response-icon">🔥</span>
                          <h3>RECETA GENERADA: ¡A SUFRIR!</h3>
                        </div>
                        <TextoAnimado :texto="respuesta" class="response-text retro-text" />
                        <div class="response-footer">
                          <span class="footer-emoji">**ERROR 404: Alegría No Encontrada**</span>
                        </div>
                      </div>
                    </div>

                    <div v-else class="empty-state glitch-empty">
                      <div class="empty-icon-container">
                        <span class="empty-icon">🗑️</span>
                      </div>
                      <p>¿No sabes qué cocinar? ¡Qué sorpresa! Escribe algo ya...</p>
                      <div class="empty-decoration"></div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </transition>
          
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BotonPersonalizado from "./components/BotonPersonalizado.vue";
import TextoAnimado from "./components/TextoAnimado.vue";
import { generarReceta } from "./components/GeneradorRecetaIA"; 

const generadorActivo = ref(false);

function activarGenerador() {
  generadorActivo.value = true;
}

const plato = ref("");
const respuesta = ref("");
const cargando = ref(false);

async function generar() {
  if (!plato.value.trim()) {
    respuesta.value = "🙄 ¿En serio? Escribe un plato primero...";
    return;
  }

  cargando.value = true;
  respuesta.value = "";

  try {
    respuesta.value = await generarReceta(plato.value);
  } catch (e) {
    respuesta.value = "Error generando receta: " + e.message;
  }

  cargando.value = false;
}

onMounted(() => {
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Impact', 'Arial Black', sans-serif; 
  color: #fff;
}

.page-container {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  background: #000000;
}

.noise-texture {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background-image: repeating-linear-gradient(
    0deg, 
    rgba(255, 255, 255, 0.05), 
    rgba(255, 255, 255, 0.05) 1px, 
    transparent 1px, 
    transparent 2px
  );
  background-color: #000;
  opacity: 0.8;
  animation: flicker 0.15s step-end infinite;
}

@keyframes flicker {
  0% { opacity: 0.08; }
  50% { opacity: 0.12; }
}

.content-wrapper {
  position: relative;
  z-index: 10;
  padding: 30px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.landing-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh; 
    text-align: center;
}

.landing-card {
    padding: 60px 40px;
    max-width: 700px;
    width: 100%;
}

.landing-header {
    border: none;
    background: none;
    padding: 0;
    box-shadow: none;
    margin-bottom: 40px;
}

.landing-button :deep(button) {
    font-size: 2rem;
    padding: 20px 40px;
}

.landing-footer {
    margin-top: 30px;
    color: #444;
    font-size: 0.8rem;
    font-family: 'Courier New', monospace;
}

.title-smaller .title-top {
    font-size: 4rem; 
}
.title-smaller .title-bottom {
    font-size: 4.5rem;
}


.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.header-section {
  margin-bottom: 30px;
  border: 5px solid #FF0000;
  background-color: #111;
  padding: 20px 10px;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
}

.title-container { display: block; text-align: center; }
.title-content { display: block; text-align: center; }

.main-title {
  display: block;
  text-align: center;
  margin: 0;
  line-height: 0.9;
  position: relative;
  font-size: 5.5rem;
  color: #FFFF00;
  text-shadow: 
    -3px 3px 0 #FF0000, 
    3px -3px 0 #00FFFF;
}
.title-top, .title-bottom { display: block; }

.subtitle {
  color: #AAA;
  font-size: 1.3rem;
  font-weight: 500;
  margin-top: 15px;
  border-top: 1px dashed #444;
  padding-top: 10px;
}

.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 30px;
  margin-top: 40px;
}
@media (max-width: 968px) {
  .two-column-layout { grid-template-columns: 1fr; }
}

.brutal-card {
  background: #111;
  border: 5px solid #FF0000;
  border-radius: 0;
  padding: 30px;
  box-shadow: 8px 8px 0 #FFFF00;
  transition: all 0.1s;
  position: relative;
  overflow: visible;
}
.brutal-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 10px 10px 0 #FFFF00; 
  border-color: #FF0000;
}

.input-section { 
  margin-bottom: 25px; 
  text-align: left; 
  padding: 10px;
  border: 3px dashed #00FF00; 
  background: #000;
}

.terminal-frame {
    box-shadow: inset 0 0 5px rgba(0, 255, 0, 0.8), 0 0 10px rgba(255, 0, 0, 0.4);
}

.input-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
}

.terminal-icon {
  font-family: 'Courier New', monospace;
  color: #00FF00;
  font-size: 1.2rem;
  margin-bottom: 0;
}

.terminal-input {
  flex-grow: 1; 
}

.terminal-input :deep(.q-field__control) {
  background: transparent !important; 
  border: none !important; 
  box-shadow: none !important; 
  padding: 0 !important;
  min-height: auto;
}

.terminal-input :deep(input) {
  font-family: 'Courier New', monospace;
  color: #FFFF00; 
  font-size: 1.2rem;
  font-weight: normal;
  text-transform: uppercase;
  caret-color: #00FF00; 
  animation: blink-cursor 1s step-end infinite;
}

@keyframes blink-cursor {
  from, to { border-right: 3px solid transparent; }
  50% { border-right: 3px solid #00FF00; }
}

.terminal-input :deep(.q-field__label) {
    color: #00FF00 !important; 
    font-family: 'Courier New', monospace;
    font-size: 1.1rem;
    font-weight: normal;
    transition: none; 
}
.terminal-input :deep(.q-field__label.q-field__label--float) {
    display: none; 
}


.terminal-input :deep(.q-field__prepend) .q-icon {
    color: #FF0000 !important; 
}

.brutal-button :deep(button) { 
  background: #FF0000; border: 4px solid #FFFF00; padding: 15px 30px; 
  font-size: 1.3rem; font-weight: 900; text-transform: uppercase; 
  letter-spacing: 2px; border-radius: 0; box-shadow: 5px 5px 0 #000; 
}
.custom-btn :deep(button):hover { 
  transform: translate(2px, 2px); box-shadow: 3px 3px 0 #000; background: #CC0000; 
}

.warning-box { margin-top: 30px; padding: 15px; background: #330000; border: 3px dashed #FF0000; border-radius: 0; color: #FFFF00; font-size: 0.9rem; font-weight: 700; text-transform: uppercase; display: flex; align-items: center; gap: 10px; }

.response-container {
  min-height: 400px; 
  max-height: 550px; 
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  position: relative;
}

.response-container::-webkit-scrollbar { width: 8px; }
.response-container::-webkit-scrollbar-thumb { background: #FF0000; border-radius: 0; }
.response-container::-webkit-scrollbar-track { background: #111; }

.loading-section, .empty-state {
  flex-shrink: 0;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.response-frame { width: 100%; }
.response-card { 
  background: #000; border: 4px solid #00FFFF; border-radius: 0; 
  padding: 25px; box-shadow: 0 0 15px rgba(0, 255, 255, 0.5); 
  position: relative; overflow: hidden;
}

.response-header { display: flex; align-items: center; gap: 15px; border-bottom: 3px double #FF0000; padding-bottom: 10px; margin-bottom: 15px; position: relative; }
.response-header h3 { color: #FFFF00; font-size: 1.5rem; text-shadow: 1px 1px 0 #FF0000; margin: 0; }
.response-text { color: #FFF; font-size: 1.1rem; line-height: 1.5; font-family: 'Courier New', monospace; white-space: pre-wrap; }
.response-footer { display: flex; justify-content: flex-end; margin-top: 20px; padding-top: 15px; border-top: 1px dashed #FF0000; }
.footer-emoji { color: #FF0000; font-size: 1rem; font-weight: bold; animation: none; }

.glitch-empty { text-align: center; padding: 60px 20px; position: relative; }
.glitch-empty p { color: #FF0000; font-size: 1.2rem; font-weight: 700; text-shadow: 1px 1px 0 #FFFF00; margin-top: 20px; }
.empty-icon { font-size: 5rem; color: #FFFF00; filter: drop-shadow(0 0 10px rgba(255, 255, 0, 0.7)); animation: none; }

@media (max-width: 968px) {
  .response-container { max-height: 450px; }
}

@media (max-width: 768px) {
  .main-title { font-size: 3rem; }
  .subtitle { font-size: 1rem; }
  .title-smaller .title-top, .title-smaller .title-bottom { font-size: 2rem; }
}
@media (max-width: 480px) {
  .content-wrapper { padding: 20px 10px; }
  .main-title { font-size: 2rem; }
  .subtitle { font-size: 1.2rem; }
  .brutal-card { padding: 20px; }
  .landing-button :deep(button) { font-size: 1.2rem; padding: 15px 20px; }
}
</style>