export const categoriesURL = 'http://localhost:8080/categories';

export const fetchCategories = async (callback) => {
    const resp = await fetch(categoriesURL + '/get-all');
    const categories = await resp.json();
    callback(categories);
};
