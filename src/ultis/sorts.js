export function sortCardsByOrder(originalArray, orderArray, key) {
    if (!key || !Array.isArray(originalArray) || !Array.isArray(orderArray) || originalArray.length === 0 || orderArray.length === 0) {
        return [];
    }
    return [...originalArray].sort((a, b) => {
        const indexA = orderArray.indexOf(a[key]);
        const indexB = orderArray.indexOf(b[key]);
        return indexA - indexB;
    });
}

export function swapTwoItemsInArray(array, id1, id2) {
    const idx1 = array.indexOf(id1);
    const idx2 = array.indexOf(id2);
    if (idx1 === -1 || idx2 === -1) return array;
    const newArray = [...array];
    [newArray[idx1], newArray[idx2]] = [newArray[idx2], newArray[idx1]];
    return newArray;
}
export function generatePlaceholderCard(column) {
    return {
        _id: `${column._id}-plaveholder-${Date.now()}`,
        boardId: column.boardId,
        columnId: column._id,
        FE_Placeholder: true,
    };
}