<template>
  <button @click="$emit('answer')" class="button">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: ["text"],
};
</script>

<style scoped>

.button:hover {
  cursor: pointer;
}
.button {
  font-size: 1em;
  padding: 1em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  width: 190px;
  border: 0;
}

.button:hover {
  background-color: orange;
}

button:focus { outline:0; }


</style>
