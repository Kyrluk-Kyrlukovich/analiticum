import { defineStore } from "pinia";
import { Ref, ref } from "vue";

import type { DraggableCardsTypes } from "@/types/dashboardStoreTypes";

export const useDashBoardStore = defineStore("dashBoardStore", () => {
	const localStorage = window.localStorage;
	const list: DraggableCardsTypes[] | null = JSON.parse(localStorage.getItem("list") ?? "");
	const draggableCards: Ref<DraggableCardsTypes[]> = ref(
		list ?? [
			{
				id: Math.random(),
				name: "Карточка 1",
				description: "Описание карточки под номером 1",
			},
			{
				id: Math.random(),
				name: "Карточка 2",
				description: "Описание карточки под номером 2",
			},
		],
	);

	function dragCard(value: DraggableCardsTypes[]) {
		draggableCards.value = value;
	}

	function saveDraggableCars() {
		localStorage.setItem("list", JSON.stringify(draggableCards.value));
	}

	function addCard(newCard: DraggableCardsTypes) {
		draggableCards.value?.push(newCard);
	}

	return { draggableCards, dragCard, saveDraggableCars, addCard };
});
