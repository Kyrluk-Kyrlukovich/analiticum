<script lang="ts" setup>
import { ref } from "vue";

import BaseField from "@/shared/BaseField.vue";
import { useDashBoardStore } from "@/stores/dashboardStore";

const dashboardStore = useDashBoardStore();
const disabledCreateCard = ref(false);

const name = ref();
const description = ref("");
</script>

<template>
	<div class="h-full w-full flex justify-center items-center">
		<form class="form">
			<p class="title">Создать новую карточку</p>
			<BaseField v-model="name" @error-validation="(value) => (disabledCreateCard = value)" />
			<BaseField
				v-model="description"
				field="textarea"
				@error-validation="(value) => (disabledCreateCard = value)"
			/>
			<div class="actions flex gap-2">
				<button
					:disabled="disabledCreateCard"
					class="submit w-full primary"
					@click.prevent="
						() => {
							dashboardStore.addCard({
								id: Math.random(),
								name: name,
								description: description,
							});
							dashboardStore.saveDraggableCars();
							$router.push('/');
						}
					"
				>
					Добавить
				</button>
				<RouterLink class="w-full" to="/">
					<button class="submit w-full info">Отменить</button>
				</RouterLink>
			</div>
		</form>
	</div>
</template>

<style scoped>
.form {
	display: flex;
	flex-direction: column;
	gap: 10px;
	max-width: 350px;
	padding: 20px;
	border-radius: 20px;
	position: relative;
	color: #fff;
	border: 1px solid #333;

	backdrop-filter: blur(30px);
	background-color: rgba(65, 65, 65, 0.308);
}

.title {
	font-size: 28px;
	font-weight: 600;
	letter-spacing: -1px;
	position: relative;
	display: flex;
	align-items: center;
	padding-left: 30px;
	color: #00bfff;
}

.title::before {
	width: 18px;
	height: 18px;
}

.title::after {
	width: 18px;
	height: 18px;
	animation: pulse 1s linear infinite;
}

.title::before,
.title::after {
	position: absolute;
	content: "";
	height: 16px;
	width: 16px;
	border-radius: 50%;
	left: 0px;
	background-color: #00bfff;
}

.submit {
	border: none;
	outline: none;
	padding: 10px;
	border-radius: 10px;
	color: #fff;
	font-size: 16px;
	transform: 0.3s ease;
}

@keyframes pulse {
	from {
		transform: scale(0.9);
		opacity: 1;
	}

	to {
		transform: scale(1.8);
		opacity: 0;
	}
}
</style>