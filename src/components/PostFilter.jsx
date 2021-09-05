import React from 'react'
// UI
import MySelect from './UI/select/MySelect'
import MyInput from './UI/input/MyInput'

const PostFilter = ({filter, setFilter}) => {
  
  return (
    <div>
      <MyInput
        value={filter.query}
        type="text"
        onChange={(e) => setFilter({...filter, query: e.target.value})}
        placeholder="Поиск..."
      />
      <MySelect
        value={filter.sort}
        onChange={(selectedSort) => setFilter({...filter, sort: selectedSort})}
        options={[
          {id: 0, value: 'title', name: 'По названию'},
          {id: 0, value: 'body', name: 'По описанию'},
        ]}
        defaultValue="Сортировать по"
      />
    </div>
  )
}

export default PostFilter
