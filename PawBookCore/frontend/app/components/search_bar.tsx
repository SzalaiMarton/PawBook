type Props = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    defaultText: string;
    searchWrap?: React.CSSProperties;
    searchBar?: React.CSSProperties;
    searchInput?: React.CSSProperties;
}

function CustomSearchBar(props: Props) {
    return (
        <div style={props.searchWrap}>
            <div style={props.searchBar}>
                <span style={{ fontSize: 16 }}>🔍</span>
                <input
                style={props.searchInput}
                placeholder={props.defaultText}
                value={props.search}
                onChange={(e) => props.setSearch(e.target.value)}
                />
            </div>
        </div>
    );
}

export default CustomSearchBar;