export const saveToLocalStorage = (data: any[]) => {
    localStorage.setItem("polygonsData", JSON.stringify(data));
};

export const loadFromLocalStorage = () => {
    const data = localStorage.getItem("polygonsData");
    return data ? JSON.parse(data) : [];
};