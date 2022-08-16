import React, {useCallback}  from "react";
import { useHistory } from "react-router-dom";
import './Page404.css';
const Page404 = () => {
    const history = useHistory();
    const changePage = useCallback(() => history.push('/recipes'), [history]);
    setTimeout(() => {
        
        changePage();
      }, 5000);
    return (
        <div className="page404">
            <img src="https://i.pinimg.com/originals/23/73/6e/23736e5af84855ef8458126d8775732b.jpg" alt="404 Not Found" />

        </div>
    )
}

export default Page404;