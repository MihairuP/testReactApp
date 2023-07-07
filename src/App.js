import React, { useCallback, useRef, useState } from 'react'
import Counter from './components/Counter';
import ClassCounter from './components/ClassCounter';
import './styles/App.css'
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';

function App() {
  const [posts, setPosts] = useState([
      {id: 1, title: 'aJavascript', body: 'bDescription'},
      {id: 2, title: 'cJavascript 2', body: 'cDescription'},
      {id: 3, title: 'bJavascript 3', body: 'aDescription'}
    ]);

  const createPost = (newPost) =>{
    setPosts([...posts, newPost])
  }

  
   
  // REMOVE 
  const removePost = (toBeDeletedPost) =>{ // получаем ссылку на удаляемый
    setPosts(posts.filter(p => p.id !== toBeDeletedPost.id))
  }
   
  //SORT
  const [selectedSort, setSelectedSort] = useState('');
  
  function getSortedPosts() {
    console.log("getSortedPosts");
    if (selectedSort) {
      return [...posts].sort( (a, b) => a[selectedSort].localeCompare(b[selectedSort]));
    }
    return posts;
  }
  const sortedPosts = getSortedPosts()

  const sortPosts = (sortOption) =>{
    setSelectedSort(sortOption)
  }

  //Search
  const [searchQuery, setsearchQuery] = useState('');
  
  const searchPosts = (searchQuery) =>{
    console.log(searchQuery);
    setPosts([...posts].filter(p => p.body.includes(searchQuery)))
  }
  
  

  return (
    <div className="App">
      <PostForm create={createPost}/>
      <hr style={{margin:"15px 0"}}/>

      <div>
        <MyInput

        type='text' 
        placeholder='Поиск'
        onChange={(event)=> searchPosts(event.target.value)}
        />



        <MySelect
          defaultValue={"Сортировка по"}
          option={[
            {value:"title", name:"По названию"}, 
            {value:"body", name:"По описанию"}]}
          value={selectedSort}
          onChange={sortPosts}  
        />
      </div>

      {/* Условная отрисовка */}
      {posts.length !== 0
      ? <PostList posts={sortedPosts} remove={removePost} title="Посты про JS"/>
      : <h1 style={{textAlign:'center'}}>Посты не были найдены</h1>
      }
      
    </div>
  );
}

export default App;
