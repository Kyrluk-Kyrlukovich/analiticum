import { defineStore } from "pinia";
import { markRaw } from "vue";

import type { ActionType, StateTypes } from "@/types/modalStoreTypes";

export const useModal = defineStore("modal", {
	state: (): StateTypes => ({
		isOpen: false,
		view: {},
		actions: [],
		header: "",
	}),
	actions: {
		open(view: object, header: string, actions?: ActionType[]) {
			this.isOpen = true;
			this.actions = actions;
			this.header = header;
			this.view = markRaw(view);
		},
		close() {
			this.isOpen = false;
			this.view = {};
			this.actions = [];
		},
	},
});
