import React from "react";

const Pagination = ({ recipesPerPage, totalRecipes, paginate }) => {

    let pageNumber = [];
    let cantPages = Math.ceil(totalRecipes / recipesPerPage)

    for (let i = 1; i <= cantPages; i++) {
        pageNumber.push(i);
    }

    return (
        <div>

            <ul>
                {pageNumber.map(number => (
                    <li key={number}>
                        <button onClick={() => paginate(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Pagination;