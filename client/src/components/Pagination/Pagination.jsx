import React from "react";
import './Pagination.css';

const Pagination = ({ recipesPerPage, totalRecipes, paginate, currentPage}) => {

    let pageNumber = [];
    let cantPages = Math.ceil(totalRecipes / recipesPerPage)

    for (let i = 1; i <= cantPages; i++) {
        pageNumber.push(i);
    }

    return (
        <div>

            <ul className="page-container">
                {/*  <button onClick={() => currentPage-1? paginate(currentPage-1): null}>Prev</button> */}
                <a href="#top" onClick={() => currentPage-1? paginate(currentPage-1): null}>Prev</a>

                {pageNumber.map(number => (
                   
                        <a href="#top" key={number} onClick={() => paginate(number)}>{number}</a>
                  
                ))}

                <a href="#top" onClick={() => currentPage+1<=cantPages? paginate(currentPage+1):null}>Next</a>
            </ul>
        </div>
    )
}

export default Pagination;