import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../utils/appslice';
import { useState } from 'react';
import { API_Key, Suggestion_URL } from '../utils/constant';
import { cachedResults } from '../utils/searchslice';
import { Link } from 'react-router-dom';
import SuggestionBox from './SuggestionBox';
import { toggleSuggestions, openSuggestions, closeSuggestions } from '../utils/querysuggestionslice';


const Head = () => {
    const isSuggestionOpen = useSelector((store) => store.query.isSuggestionOpen)
    console.log("head rendered")
    const dispatch = useDispatch();

    const toggleMenuHandler = () => {
        dispatch(toggleMenu());
    }

    const suggestionBoxHandler = () => {
        dispatch(toggleSuggestions());
    }
    const openSuggestionBox = () => {
        dispatch(openSuggestions());
        console.log("open")
    }
    const closeSuggestionBox = () => {
        dispatch(toggleSuggestions());
        console.log("close")
    }

    const [searchQuery, setSearchQuery] = useState('');
    
    const [suggestions, setSuggestions] = useState([]);
    const [dummySuggestions, setDummySuggestions] = useState([]);

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setSuggestions(null); // Clear suggestions
    };


    // Event handler for input change
    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };


    const getSuggestions = async () => {
        const dataSuggestions = await fetch(Suggestion_URL + searchQuery);
        const jsonSuggestions = await dataSuggestions.json();
        setSuggestions(jsonSuggestions[1]);
        setDummySuggestions(suggestions)

        dispatch(cachedResults({
            [searchQuery]: jsonSuggestions[1]
        }))

    }
    const searchCache = useSelector((store) => store.search)



    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchCache[searchQuery]) {
                setSuggestions(searchCache[searchQuery]);
                
            }
            else
                getSuggestions()
        }, 200);



        return () => {
            clearTimeout(timer);
        };
    }, [searchQuery]);

    return (



        <div className="flex justify-between border border-solid border-black ">
            <div className="flex justify-between ">
                <div className="">
                    <img
                        onClick={() => toggleMenuHandler()}
                        className='h-14' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEX///8AAABxcXHKysrh4eGBgYHt7e3j4+PJycn4+PhBQUH19fXe3t6Xl5ewsLBERES1Kp2CAAAAs0lEQVR4nO3ayw3CMBAEUIeQHyGh/25pwexl5eW9CmZk+bKa1gAAAAAAAAAAAAAAAAAAAAAAAIBxbPv8u33Ljt3vmmKu7ODdggWnKTt4t/oN72DBOzt4v+MZcWTHBgAAAP7NujwiljU7eLdX8BL1yQ7eLVhwoGti/Tes/w8BAACAIs53xJkdu1/9XVuw4EDXxPoN62+E2xaYec/zQDtvAAAAAAAAAAAAAAAAAAAAAAAAoH0BsHcI4gjZOqkAAAAASUVORK5CYII=" alt="Minni Logo" />
                </div>
                <img className='h-5' alt="" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1200px-YouTube_Logo_2017.svg.png" />

            </div>
            <div className="flex">

                <div 
                // onClickCapture={
                //     (a,b,c)=>{debugger;}
                // }
                 onBlurCapture={
                    (e)=>{debugger;
                    if(e.relatedTarget?.className === 'someotherthing'){
                        e.stopPropagation();
                    }
                    return e;
                    
                    }
                    }
                onBlur={closeSuggestionBox}
                    id='something'
                    >
                       

                    <div>


                        <input
                            onChange={handleInputChange}
                            type="text"
                            value={searchQuery}
                            onFocus={openSuggestionBox}
                            // onBlur={closeSuggestionBox}
                            className="w-72 h-8 border border-solid border-black rounded-l-full"
                        />

                    </div>
                    <SuggestionBox suggestions={suggestions} />
                    {/* <div className="w-72 fixed bg-white py-2 px-5 z-10">
                       {suggestions && suggestions.length>0 && (<ul>
                            {suggestions.map((suggestion) => (
                                <li key={suggestion}>
                                    <Link to={`/results?search_query=${suggestion}`}>
                                        <p onClick={() =>{handleSuggestionClick(suggestion)}}>
                                            {suggestion}
                                        </p>
                                       
                                    </Link>
                                </li>
                            ))}
                        </ul>)}
                    </div> */}
                    {

                    // if (!isSuggestionOpen) return null;
                    // return (
                    //     <div className="w-72 fixed bg-white py-2 px-5 z-10">
                    //     {suggestions && suggestions.length > 0 && (
                    //         <ul>
                    //             {suggestions.map((suggestion) => (
                    //                 <li key={suggestion}>
                    //                     <Link to={`/results?search_query=${suggestion}`}>
                    //                         <p>{suggestion}</p>
                    //                     </Link>
                    //                 </li>
                    //             ))}
                    //         </ul>
                    //     )}
                    // </div>
                    
                    //    
                }
                </div>

                <Link to={`/results?search_query=${searchQuery}`}>
                    < img alt="" className='h-8 border border-solid border-black rounded-r-full mr-3' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAADpCAMAAABx2AnXAAAAwFBMVEX///8oKCgREiQAAADa2tsiIiIlJSUgICAVFRUQEBAODyIYGBgcHBwLCwsaGhoUFBTi4uIrKyumpqagoKAAABUwMDCJiYm4uLgAABr4+Pjp6enQ0NDk5OQAABTv7+85OTnExMR0dHRERESBgYFcXFzAwMCwsLBsbGxRUVGRkZGamprMzMw/Pz9ZWVltbW2Dg4MfIC9qanONjZV5eYFZWmMpKjhBQUwAAB8AAAx0dH1lZW+EhIw0M0BVVl5KSlQjJTOzWJqoAAAKDklEQVR4nO2diXqiOhSAq2FXlLpCca91wS6ASqtYff+3ulBbElCnLglQbv75OmPpN0kOZ8nJ2rs7CoVCoVAoFAqFQqFQKBQKhUKhUCgUCoVCoVDSjPbA6PpsNtN1Rukk3RhMKM3p8LnOlkTZRxT4XHfSr8y0pNt1C5pSGYtALPAcx+UCOI4tlmXQbTz9Ud3pjQEo87lTcCW5NB49JN3KS+lUB2KJPSnVN7zIjmdJN/USmD4QfpVqrzce5Cp/xd/0MSieJdW3bGK9+hdEa43F0451UrRR0s3+Da1xkbYC0eRuun2t1xWuEMuHBY8pjv6P8qmQ4XVevA/Lol1aiEK9l3T7T8DUC0d1URRFvv48Gb72++OXQTdXkr0u+5jwoJG0CEcZHVEXx8vC5HGkt5Cw12F6xrh+tD8QJynssBvgUFey2G8eb6rGGANQONBbkWNibvZvaEMxqqyC8PL0z/5JMe7FqNpY8SmuJp+FNoi6l8A2lN//X/MFRETjQJq6tM6kFDEpcXqmt8wmIGKQoEK2sRegDcKdMiv3L+iTnu6FtEoWkUscXJZFaNNy2B7TYo3jkH95vdHFKa3ejRSRivyqEYqHPN+7ogytL4ckK7Zwt/JyRqH+qzC4MuOriGgMYbuJJ45MSC5xfPXIqheSrDDG2cgr0Lqo38uPNxSl82hRSYfGRzRUy283laXchyQ7o38nRw/1efEWffkwaPLIT7C08ErqSEsKw5uLm8lIeWKCxtgoI294gKHAJmoBcmJjmBbSDK6EpRlTpFMsvuIo8Rr6SCoFMA03JsgUF0hocKYjChNwjeo7LHQz/navvYoxfLnsM7YpT9TNRB1XqZeA5hw4s9YhfF98IvkH4mFY3byFvrAEeukONBmugDUwN+AYpnhbLnMVVdiHFfDOB3aQBETGWvJZDILEjmMx96RTmICKTbxF/w4DLbF4a44Y5QGG/Pgj/hQ6An4Ph3EJuzX8CrREFn8ajnT9cdsiEpNlAlXD4Ssfc8JYgTFRILDOagSGztXjXcaF6RSRV6pAg4g5E4YKE4nMbnaDuCjEOt5EXKxAJOt5C+Ii3ydR/imegvEgi2PgfEgzqICrE6ngBNC5Cb3QFhxJgzijB4wdZTIuoD0HThZr9JgE/YxIaP0AjsriXOPUYNAqExoxPQbRoxzjolLnPhCsQMgDqkGGX5qSqeEYCkxSOUJVwLBYjDHeMzAYPxOqYhbkwXGOXOBgjEBqv0cXiVdxrFbyr1MXEhaM1AQZk7RgpDSWjGCIj70QqkIvJyIY6RzYi4qwihijohLsMOLuCVUB10rjnBx4gNtEi4SqgHMPxRi3Z2pwibZMaHqsERiFUCVTw1Hg5BuplR44MIp1Am5IuloNvjoQ5yIZNBTs89t7HuB2aBDn7qMm6UxuFswWcSUiFZwA9tAcRyR6wKWBmJclkBnuHonyXwIXKxgkyj8JnPQg4mQdZCY43k2ZhCfXR3D2rRjvzkUdeaUEwjG0xLhX/jQ4nUNgTgKZLi3HmXf4IJshZOy2aMBFaCHubUfITkXsk8HItCWxYdE5lXNdzCobwZcWawa85w2e+sC9RAbn7XMg/j2LyH4IzCpDFJbI/jfYR+dEnNmBVkQUlsSRiR66mQtjL4pspYo/dHwBh0y5Ir7pRQY55kJip8UZoFsm8TUBeV0sqYWB30C8jOMxHbNBjwAlpLDwcQIsu9PDjpuQh/kgu1xzZRzDlxay1TneyY5IO0L7/29PEjroEaACmdmU86iGzrbcnIBMkI383H2iR8jQ/f/crYcKhuiBRpBU5NijCOg1Pzc1RntBj2wVYt1pdITQSUbuhhNEnQmqLxb3iOFy+siJJC+CXLuCoHRDZ475FNw5MAm1SBxe5fPN8NUSSey3P6BTD7epfnlGrr1Fz+XHu0vxBEq4Vax86Qlv/fnwQpqkD59+oUcu5ihwl8T9Tj96Q0R6JJuVwpJxYHhuOtQx+NIRsTzkNEimR32EF4fnuFrHqIunLgfiUiEZcx+9ZYuXnyu/BEimLwqnxEqNNT4c3MGSY0Xx9cSVOf6lOdPBkbu5woKmQmfa+PA2IE9t7Mu0Fx2Davro9VkuHIYMvjAKnctPh2Reqn8kunFsSRTYQX9aGTU9RtW3Yb0kikcvpioPWncKFyokFdZ4p5+6II1j+UK5LHqUheJRmXJ+//eVbjD3KZRMezzaJZ2F8HNDmlJMoTV6ScTJ8P1Piki6orAp1NndXaVevlg0Vh6j2XwqrdHvdIXLROPBS6QzZ9g0WuNXmnRw99kpuNKBWHcHfpYWnXmMXspH+qlDZcn1t6NDSiWd1uijeJnFP6+e5Yqy8No8lXUxXDqt8QulOgGywLNRj+P8Xhtwj81/jduUUmp15qPplddBvSCL5VLRpySIssx2XxrNX8/ERK0x/kXbX+koerMybbw9Pr41jFGPaZ03wmZyKbbGm1DKqbbGG/gD1nglEckwrHukBUXMrGTUGv8cipBZyXKZtcZ6ZnXGZ1Yy7n9ijVmSjMusNbKZ1Vl2rTGXVWts8ZnVWZ3PqmSZzYhbpaxaYyu71pjZjLiV2dmCqDWm6ze93ELYGhPcE42dcGwUEr0ZHy8tdL9Mgru98YNao5iCTZv4aAWjGOzn8hKmlfu2xrT8Xh5sKF1/5wWf0l8zdwudaR3Iw17SzaBQKBQKhUKhUCgUCoVCoVAoFAqFQqFQKBTK/w8mo9yBjHKXzyhUsL/Gt2DS91ce+TefV9W8BL/zPkkq/Dbl7AWTHCkvLc39583Pz2qLz9rSCUTZStJusfkrku0FU621WrNr7VpebQPbVNtt1fswqlQqKwO0AZBUADa69+U6KRXsoFnfGjPttunOpy6Y2yvX3tj2fFvdMlsArIeFzehLh2G2PYdZOrFqTPIcQfr5+8st9t/5cnw/951Den+Xvvxm/xgVLN+285a1qq1WawDcdzsPVqvPD0dnXMtYzsB61HPA7oFRVSlOuVRrN2+bteVuo+5UaT7f7PKmuts6ppTfeU9MyaxZlu3YW9td2J5etvbatdZGGxVMXS+8H66tuaPWXMn4qK3drfoB3pm5sW2CTXP20V62dDNeO5S21tyurFaWO59btjWfr137c25VnQ9763qGVXU3a9WWjE3F3s7Xhg3cmr3drFRUMEmqzE1bWi4NyVysrUXeXnyqxsqeeebHrJ7mdnPuzLbMR6yC5dvNpb1w159z23K3C9uT0LZWK3shVZyqZXjCuKax/fSeGo5l2/Zm5axd9/vt//RjqmWqy8ZcXdqrjzWwbHO5kT6nrtpebN/tdfvDspcWWMUcOiRTkpwPJ79RnbxpOrWNuaw5y/xmZ2682G3uTEdyPr+e552PjbmT1K26DPuYJ5nvn56D1tS896fme6Za8x56buU98p+o+dh7MeknHvgffsIFit+zSkhUCWJH5jOP7EEF+2v8Bw3T4ZYwQZP6AAAAAElFTkSuQmCC" />
                </Link>

                <img className="rounded-full border-2 border-blue-500 bg-slate-500"
                    style={{ width: '35px', height: '35px' }} src="data:image/png;base64,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" alt="Microphone Logo" />




            </div>

            <div className="">me</div>
        </div >
    );
};

export default Head;