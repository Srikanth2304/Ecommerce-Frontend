
const CategoryFilter = ({categories , onSelect}) => {
    return (
        <>
            <select className="form-control" id="categorySelect" onChange={(e) => onSelect(e.target.value)}>
                <option value="">All Categories</option>
                {categories.map(category => (
                    <option value={category.id} key={category.id}>{category.name}</option>
                ))}
            </select>
        </>
    );
}
export default CategoryFilter