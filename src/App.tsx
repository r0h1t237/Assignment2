import React from 'react';
import { Route, Routes } from 'react-router-dom'

import Nav from './Nav'
import Missing from './Missing'
import Recipe from './Recipe';
import NewRecipe from './NewRecipe';
import Home from './Home';

import { DataProvider } from './context/DataContext';
import About from './About';

function App() {
 

  return (
    <div className="App">  
      <DataProvider>
        <Nav title={process.env.REACT_APP_TITLE}/>
        <Routes>
          <Route path='/' element={
            <Home />
          } />
          <Route path='/recipe/:id' element={
            < Recipe />
          } />
          <Route path='/addRecipe' element={
            < NewRecipe />
          } />
          <Route path='/about' element={
            < About />
          } />
          <Route path='*' element={
            < Missing />
          } />
        </Routes>
        
      </DataProvider>
    </div>
  );
}

export default App;
