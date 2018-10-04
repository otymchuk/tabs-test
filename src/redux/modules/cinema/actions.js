export function fetchPosts(query, response=null) {
    return function (dispatch) {
        dispatch({
            type: 'setRequest',
            payload: {
                isFetching: true
            }
        })

        fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=d3e7cdda&s=${query}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (list) {
                response({ok:true})
                dispatch({
                    type: 'setList',
                    payload: {
                        list: list.Search,
                        isFetching: false
                    }
                })
            })
            .catch(err => {
                response({ok:false})
                console.log(err)
            });
    }
}

