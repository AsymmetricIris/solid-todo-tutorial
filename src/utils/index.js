//utils/index.js

import {
    createSolidDataset,
    getSolidDataset,
    saveSolidDatasetAt,
} from "@inrupt/solid-client";

export async function getOrCreateTodoList(containerUri, fetch) {
    const indexUri = `${containerUri}index.ttl`;
    try {
        const todoList = await getSolidDataset(indexUri, {fetch});
        return todoList;
    } catch (error) {
        if (error.statusCode == 404) {
            const todoList = await saveSolidDatasetAt(
                indexUri,
                createSolidDataset(),
                {
                    fetch,
                }
            );
            return todoList;
        }
    }
}