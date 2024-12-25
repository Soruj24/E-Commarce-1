const getPaginationDetails = ({ page, limit }) => {
    const skip = (page - 1) * limit;
    return { skip, limit };
};

const getFilterCriteria = ({ search, category }) => {
    const filterCriteria = {};
    if (search) {
        filterCriteria.title = { $regex: search, $options: "i" }; // Case-insensitive search
    }
    if (category) {
        filterCriteria.category = category; // Filter by category
    }
    return filterCriteria;
};

module.exports = {
    getPaginationDetails,
    getFilterCriteria,
};