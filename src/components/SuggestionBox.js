import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SuggestionBox = ({ suggestions }) => {

    const isSuggestionOpen = useSelector((store) => store.query.isSuggestionOpen)
    // debugger;
   if (!isSuggestionOpen) return null;
    return (
        <div className="w-72 fixed bg-white py-2 px-5 z-10">
            {suggestions && suggestions.length > 0 && (<ul>
                {suggestions.map((suggestion) => (
                    <li key={suggestion}>
                        <Link to={`/results?search_query=${suggestion}`} className='someotherthing'>
                            <p >
                                {suggestion}
                            </p>

                        </Link>
                    </li>
                ))}
            </ul>)}
        </div>
    )
}

export default SuggestionBox