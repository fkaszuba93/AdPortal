
const Search = ({onQueryChange}) => {
    
    return (
        <div className="w-50 mx-auto mb-3">
            <input type="search" placeholder="Search" id="search" className="form-control"
                onChange={(e) => onQueryChange(e.target.value)} />
        </div>
    );
};

export default Search;
