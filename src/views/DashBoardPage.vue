<script lang="ts" setup>
import { computed, h, ref } from "vue";

import { useDashBoardStore } from "@/stores/dashboardStore";
import { useModal } from "@/stores/modalStore";
import Card from "@/views/Card.vue";

const dashboardStore = useDashBoardStore();
const modal = useModal();

let dragItems = ref(dashboardStore.draggableCards);

const dragMode = ref(false);
const dragOptions = computed(() => {
	return {
		animation: 400,
		disabled: !dragMode.value,
	};
});
const dragElem = ref();
const dragHtmlElem = ref();

function drag(e) {
	const elem = e.target?.closest("div.draggable");
	elem.classList.add("dragging");
	dragElem.value = { ...list.value[elem.getAttribute("data-index")] };
	dragHtmlElem.value = elem;
}

function drop(e, idx) {
	const elem = e.target.closest("div.draggable");
	const dropElem = { ...list.value[elem.getAttribute("data-index")] };

	list.value[idx] = dragElem.value;
	list.value[dragHtmlElem.value.getAttribute("data-index")] = dropElem;
	dashboardStore.dragCard(list.value);
	dashboardStore.saveDraggableCars();
}

const list = computed({
	get() {
		return dragItems.value;
	},

	set(newValue) {
		dragItems.value = newValue;
	},
});
</script>

<template>
	<div class="h-full w-full">
		<div class="actions py-4 flex gap-4 justify-end">
			<RouterLink to="add-card">
				<button class="button w-full primary">Добавить каточку</button>
			</RouterLink>
			<div class="flex gap-2 border border-[#3d3a4e] p-3 rounded-[10px]">
				<div>Режим редактирования</div>
				<div class="check primary">
					<input id="check" v-model="dragMode" type="checkbox" />
					<label for="check"></label>
				</div>
			</div>
		</div>
		<div class="h-[80%] overflow-auto p-4 scroll">
			<TransitionGroup class="w-full grid grid-cols-4 gap-4 relative" name="list" tag="div">
				<div
					v-for="(elem, idx) in list"
					:key="elem.id"
					:class="{ drag: !dragOptions.disabled }"
					:data-index="idx"
					:draggable="!dragOptions.disabled"
					class="draggable"
					@drag.start="drag"
					@dragover.prevent
					@drop.stop="(e) => drop(e, idx)"
				>
					<card
						:description="elem.description"
						:name="elem.name"
						draggable="false"
						@click="
							() => {
								modal.open(h('div', elem.description), 'Детальная информация');
							}
						"
					></card>
				</div>
			</TransitionGroup>
		</div>
		<!--		<draggable-->
		<!--			v-model="list"-->
		<!--			:="dragOptions"-->
		<!--			class="w-full grid grid-cols-4 gap-4"-->
		<!--			item-key="id"-->
		<!--			@end="-->
		<!--				(e) => {-->
		<!--					dashboardStore.dragCard(list);-->
		<!--					dashboardStore.saveDraggableCars();-->
		<!--				}-->
		<!--			"-->
		<!--		>-->
		<!--			<template #item="{ element }">-->
		<!--				<card-->
		<!--					:description="element.description"-->
		<!--					:name="element.name"-->
		<!--					@click="-->
		<!--						() => {-->
		<!--							modal.open(h('div', element.description), 'Детальная информация');-->
		<!--						}-->
		<!--					"-->
		<!--				></card>-->
		<!--			</template>-->
		<!--		</draggable>-->
	</div>
</template>

<style scoped>
.draggable {
	cursor: pointer;
	overflow: hidden;
}

.scroll {
	scrollbar-width: thin;
}

.drag {
	cursor: grab;
	animation: dragRotating 0.9s linear infinite;
}

@keyframes dragRotating {
	0% {
		rotate: 0deg;
	}
	10% {
		rotate: -1deg;
	}
	20% {
		rotate: 1deg;
	}
	30% {
		rotate: 0deg;
	}
	40% {
		rotate: 1deg;
	}
	50% {
		rotate: -1deg;
	}
	60% {
		rotate: 0deg;
	}
	70% {
		rotate: -1deg;
	}
	80% {
		rotate: 1deg;
	}
	90% {
		rotate: 0deg;
	}
	100% {
		rotate: -1deg;
	}
}

.list-move,
.list-enter-active,
.list-leave-active {
	transition: all 1s cubic-bezier(0.55, 0, 0.1, 1);
}

.button {
	height: 100%;
	position: relative;
	overflow: hidden;
	padding: 0 2rem;
	border-radius: 10px;
	color: #fff;
	border: none;
	cursor: pointer;
}

.check {
	position: relative;
	line-height: 0;
	font-size: 25px;
}

.check input[type="checkbox"],
.check label,
.check label::before,
.check label::after {
	appearance: none;
	display: inline-block;
	font-size: inherit;
	border-radius: 1em;
	border: 0;
	transition: 0.35s ease-in-out;
	box-sizing: border-box;
	cursor: pointer;
}

.check {
	appearance: none;
	display: inline-block;
	border-radius: 1em;
	border: 0;
	transition: 0.35s ease-in-out;
	box-sizing: border-box;
	cursor: pointer;
}

.check label {
	width: 2.2em;
	height: 1em;
	background: #3d3a4e;
	overflow: hidden;
}

.check input[type="checkbox"] {
	position: absolute;
	z-index: 1;
	width: 0.8em;
	height: 0.8em;
	top: 0.1em;
	left: 0.1em;
	background: linear-gradient(45deg, #dedede, #ffffff);
	box-shadow: 0 6px 7px rgba(0, 0, 0, 0.3);
	outline: none;
}

.check input[type="checkbox"]:checked {
	left: 1.3em;
}

.check input[type="checkbox"]:checked + label {
	background: transparent;
}

.check label::before,
.check label::after {
	content: "· ·";
	position: absolute;
	overflow: hidden;
	left: 0.5em;
	top: 0.5em;
	height: 1em;
	letter-spacing: -0.04em;
	color: #9b9b9b;
	font-family: "Times New Roman", serif;
	z-index: 2;
	font-size: 0.6em;
	border-radius: 0;
	transform-origin: 0 0 -0.5em;
	backface-visibility: hidden;
}

.check label::after {
	content: "?";
	top: 0.65em;
	left: 0.6em;
	height: 0.1em;
	width: 0.35em;
	font-size: 0.2em;
	transform-origin: 0 0 -0.4em;
}

.check input[type="checkbox"]:checked + label::before,
.check input[type="checkbox"]:checked + label::after {
	left: 2.55em;
	top: 0.4em;
	line-height: 0.1em;
	transform: rotateY(360deg);
}

.check input[type="checkbox"]:checked + label::after {
	height: 0.16em;
	top: 0.55em;
	left: 2.6em;
	font-size: 0.6em;
	line-height: 0;
}
</style>