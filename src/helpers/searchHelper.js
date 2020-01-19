export const searchHelper = (items, term) => {
    if (term.value.length === 0) {
        return items;
    }
    return items.filter(item => {
        item = item[term.fieldName];
        if (typeof item !== "string") {
            item = item.toString();
        }
        return item
            .toLocaleLowerCase()
            .includes(term.value.toLocaleLowerCase());
    });
};
