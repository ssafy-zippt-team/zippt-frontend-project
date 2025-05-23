<template>
  <button
    type="button"
    :aria-pressed="modelValue"
    @click="toggle"
    class="w-12 h-7 flex items-center rounded-full transition-colors duration-200 focus:outline-none"
    :class="modelValue ? 'bg-[#115C5E]' : 'bg-gray-200'"
    style="box-shadow: 0 2px 8px rgba(17, 92, 94, 0.1)"
  >
    <span
      class="inline-block w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200"
      :class="modelValue ? 'translate-x-5' : 'translate-x-1'"
    ></span>
  </button>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

function toggle() {
  emit("update:modelValue", !props.modelValue);
}
</script>
