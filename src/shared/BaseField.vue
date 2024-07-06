<script lang="ts" setup>
import type { ModelRef, Ref } from "vue";
import { ref, watch } from "vue";

import type { ErrorsTypes } from "@/types/baseFieldTypes";

const props = defineProps({
	field: {
		type: String,
		default: "input",
	},
});

const emits = defineEmits(["errorValidation"]);
const input: ModelRef<string | undefined, string> = defineModel();
const inputErrors: Ref<string | null | undefined> = ref(null);

const errors: ErrorsTypes = {
	symbols: {
		text: "Текст должет содержать только кириллицу",
	},
	empty: {
		text: "Поле не должно быть пустым",
	},
};

watch(input, (newVal: string | undefined) => {
	if (!newVal) {
		inputErrors.value = errors.empty?.text;
	} else if (!newVal.match(/^[А-Яа-яЁё0-9\s.,:;?!\-()@#$%^&*+=\[\]{}|\\<>`~"']+$/gm)) {
		inputErrors.value = errors.symbols?.text;
	} else {
		inputErrors.value = null;
	}

	emits("errorValidation", !!inputErrors.value);
});
</script>

<template>
	<div class="mb-2">
		<label>
			<input
				v-if="field === 'input'"
				v-model="input"
				:class="{ errors: inputErrors }"
				class="input"
				placeholder=""
				type="text"
			/>
			<textarea
				v-else
				v-model="input"
				:class="{ errors: inputErrors }"
				class="input"
			></textarea>
			<span :class="{ errors: inputErrors }">Название карточки</span>
		</label>
		<div v-if="inputErrors" class="errors">{{ inputErrors }}</div>
	</div>
</template>

<style scoped>
.form label {
	position: relative;
	display: block;
	min-height: 50px;
}

.form label .input {
	background-color: #333;
	min-height: 50px;
	color: #fff;
	width: 100%;
	padding: 20px 05px 05px 10px;
	outline: 0;
	border: 1px solid rgba(105, 105, 105, 0.397);
	border-radius: 10px;
	font-size: 1rem;
}

.form label .input + span {
	color: rgba(255, 255, 255, 0.5);
	position: absolute;
	left: 10px;
	top: 4px;
	font-size: 0.9em;
	cursor: text;
	transition: 0.3s ease;
}

.form label .input:placeholder-shown + span {
	top: 12.5px;
	font-size: 0.9em;
}

.form label .input:focus + span {
	color: #00bfff;
	top: 0px;
	font-size: 0.7em;
	font-weight: 600;
}

.input {
	font-size: medium;
}

.form label .input.errors {
	border-color: #ea0a0a;
}

.form label .input.errors + span {
	color: #ea0a0a;
}

.errors {
	color: #ea0a0a;
	font-size: 0.8rem;
}
</style>