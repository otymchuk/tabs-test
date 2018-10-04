import React from 'react';
export const dummyTable = (props) => {
    let result = (props.list || []).map((item, index) => {
        return (
            <div key={index} className="w-310">
                <img alt={item.Title} src={item.Poster} />
                <p>{item.Title} / ({item.Year})</p>
            </div>)
    })
    return <div className="flex-container">{result}</div>
}
