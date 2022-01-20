<template>
  <div class="status" :class="label.toLowerCase()">
    {{ label }}
  </div>
</template>

<script>
export default {
  name: `Status`,
  props: {
    label: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.status {
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: var(--border-radius);
  width: fit-content;
  text-align: center;
  border: 2px solid transparent;
}

.status.inactive {
  color: var(--orange-800);
  border-color: var(--orange-200);
}

.status.passed,
.status.active {
  color: var(--green-800);
  border-color: var(--green-200);
}

.status.rejected {
  color: var(--red-800);
  border-color: var(--red-200);
}

.status.voting {
  background: var(--teal-200);
  color: var(--teal-800);
  border-color: var(--teal-200);
}

.status.deposit {
  background: var(--yellow-200);
  color: var(--yellow-800);
  border-color: var(--yellow-200);
}
</style>
