import { defineStore } from "pinia";

import { DraggableCardsTypes } from "@/types/dashboardStoreTypes";

interface DashBoardState {
	draggableCards: DraggableCardsTypes[];
}

export const useDashBoardStore = defineStore("dashBoardStore", {
	state: (): DashBoardState => {
		return {
			draggableCards: (JSON.parse(String(localStorage.getItem("list"))) as
				| DraggableCardsTypes[]
				| null) ?? [
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
		};
	},

	actions: {
		dragCard(value: DraggableCardsTypes[]) {
			this.draggableCards = value;
		},

		saveDraggableCars() {
			localStorage.setItem("list", JSON.stringify(this.draggableCards));
		},

		addCard(newCard: DraggableCardsTypes) {
			this.draggableCards.push(newCard);
		},
	},
});
