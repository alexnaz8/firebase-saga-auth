export const ejectUsersData = data =>
    data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
export const getUnique = data => [
    ...new Set(
        data
            .map(el =>
                Object.entries(el)
                    .map(el => el[0])
                    .filter(el => el !== "id")
            )
            .flat(1)
    )
];
export const tableFieldsArrangment = columns => [
    ...columns.filter(el => el === "empID" || el === "empName"),
    ...columns.filter(el => el !== "empID" && el !== "empName")
];
