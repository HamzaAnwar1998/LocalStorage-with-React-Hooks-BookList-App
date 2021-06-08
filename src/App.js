import React,{useState, useEffect} from 'react'
import { View } from './components/View';

// getting data from local storage
const getDataFromLS=()=>{
  const books = localStorage.getItem('books');
  if(books){
    return JSON.parse(books);
  }
  else{
    return []
  }
}

export const App = () => { 

  // main array of objects state || books state
  const [books, setBooks]=useState(getDataFromLS());

  // input field state
  const [title, setTitle]=useState('');
  const [author, setAuthor]=useState('');
  const [isbn, setIsbn]=useState('');  

  const handleAddBookFormSubmit=(e)=>{
    e.preventDefault();
   // creating an object
    let book={
        title,
        author,
        isbn
    }
    setBooks([...books, book]);         
    setTitle('');
    setAuthor('');
    setIsbn('');
}

    // deleting book from LS
    const deleteBook=(isbn)=>{     
    const booksArray = books.filter((element,index)=>{
      return isbn !== element.isbn
    })
    setBooks(booksArray);
    }    

    // storing book in LS
    useEffect(()=>{
        localStorage.setItem('books',JSON.stringify(books)); 
    },[books])   
  
  return (
    <div className='wrapper'>

      <h1>BookList App</h1>
      <p>Add and view your books using local storage</p>

      <div className='main'>

          <div className='form-container'>
              
              <form autoComplete="off" className='form-group'
                    onSubmit={handleAddBookFormSubmit}>

                <label>Title</label>
                <input type="text" className='form-control' required
                onChange={(e)=>setTitle(e.target.value)} value={title}></input>
                <br></br>

                <label>Author</label>
                <input type="text" className='form-control' required
                onChange={(e)=>setAuthor(e.target.value)} value={author}></input>
                <br></br>

                <label>ISBN#</label>
                <input type="text" className='form-control' required
                onChange={(e)=>setIsbn(e.target.value)} value={isbn}></input>
                <br></br>
                
                <button type="submit" className='btn btn-success btn-md'>ADD</button>                
                 
            </form>

          </div> 
         
          <div className='view-container'>

            {books.length>0&&<>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <th>ISBN#</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Delete</th>
                </thead>
                <br></br>
                <tbody>
                  <View books={books} deleteBook={deleteBook}/>
                </tbody>                              
              </table>
            </div>
            <button className='btn btn-danger btn-md' onClick={()=>setBooks([])}>Remove All</button>
            </>}

            {books.length<1&&<div>No books are added yet</div>}

          </div>

      </div>
     
    </div>
  )
}

export default App
