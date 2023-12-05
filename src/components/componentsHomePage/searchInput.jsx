import { useState } from "react";
import './searchInput.css';


export default function SearchInput(){

    const [ showInput, setShowInput ] = useState(false);

    const handleShowInputClick = () => {
        setShowInput(!showInput)
    };

    return(
        <div>
            <button onClick = {handleShowInputClick}><i class="fa fa-search">&#8981;</i></button>

            { showInput && (
                <>
                    <input
                    className="search-input"
                    placeholder="Search in site"
                    list="search-input-list"
                    />
                    <datalist id = "search-input-list">
                        <option>
                            <a href="#advantages">Advantages</a>
                        </option>
                        <option value={"Reviews"}></option>
                        <option value={"Selection"}></option>
                    </datalist>
                </>
            )}
        </div>
    );
}

