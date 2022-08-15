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
                <button onClick={() => currentPage-1? paginate(currentPage-1): null}> Prev</button>
                

                {pageNumber.map(number => (
                        number === currentPage? 
                        <button className="currentPage" key={number} onClick={() => paginate(number)}>{number}</button>
                        :
                        <button key={number} onClick={() => paginate(number)}>{number}</button>

                        
                        
                  
                ))}

                <button onClick={() => currentPage+1<=cantPages? paginate(currentPage+1):null}>Next</button>
            </ul>
        </div>
    )
}

export default Pagination;