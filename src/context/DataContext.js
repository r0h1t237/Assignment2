import { createContext, useState, useEffect } from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const {data,fetchError,isLoading}= useAxiosFetch('/recipe/getAllRecipes');

    useEffect(() => {
        console.log(data)
        setRecipes(data);
    }, [data])

    // useEffect(() => {
    //     const filteredResults = posts.filter((post) =>
    //         ((post.body).toLowerCase()).includes(search.toLowerCase())
    //         || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    //     setSearchResults(filteredResults.reverse());
    // }, [posts, search])

    return (
        <DataContext.Provider value={{
            search, setSearch,
            searchResults, fetchError, isLoading,
            recipes, setRecipes
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;
