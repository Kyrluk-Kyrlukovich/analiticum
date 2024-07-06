<template>
	<div
		v-if="isOpen"
		class="background-modal h-full w-full absolute left-0 top-0"
		@click="modal.close()"
	>
		<div class="modal modal-open rounded-[10px] w-2/5 absolute" @click.stop>
			<div class="modal-box relative">
				<div class="head flex justify-between p-4">
					<h2 class="text-xl font-bold">{{ modal.header }}</h2>
					<div class="hover:cursor-pointer" @click.stop="modal.close()">✕</div>
				</div>
				<div class="body p-4">
					<component :is="view"></component>
				</div>

				<div class="modal-action">
					<button v-for="action in actions" class="btn" @click="action.callback()">
						{{ action.label }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";

import { useModal } from "@/stores/modalStore";

const modal = useModal();

const { isOpen, view, actions } = storeToRefs(modal);
</script>

<style scoped>
.modal {
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	backdrop-filter: blur(30px);
	background-color: rgba(65, 65, 65, 0.708);
}

.background-modal {
	background-color: rgba(0, 0, 0, 0.71);
}
</style>
