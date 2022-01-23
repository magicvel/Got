import React, {Component} from 'react';


import  AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import  PositStatusFilter from '../post-status-filter';
import PostList from '../post-list';
// import PostListItem from '../post-list-item';
import PostAddForm from '../post-add-form';

import './app.css';
import '../app-header/app-header.css';
import '../post-add-form/post-add-form.css';
import '../post-list/post-list.css';
import '../post-list-item/post-list-item.css';
import '../post-status-filter/post-status-filter.css';
import '../search-panel/search-panel.css';
import '../../index.css'


 
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        data : [
            {label: "Going to learn React", important: true, like: false, id: 'chasvbfasf'},
            {label: "That is so good", important: false, like: false, id: 'jsagsdvsd'},
            {label: "I need a Doctor", important: false, like: false, id: 'asffasfas'}
        ],
        term: "",
        filter: "all"

        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        
        this.maxId = 4;
    }

    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            // data.slice(index, 1);
            // return {
            //     data: data
            // }
            // не правильно работает плюс работает с багами, не использовать 
            // нельзя напрямую меня state, ломается логика React
 
            // const before = data.slice(0, index);
            // const after = data.slice(index + 1);
            // const newArr = [...before, ...after];
            // более рассписано 

            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

            return {
                data: newArr
            }
        });
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id:this.maxId++
        }
        this.setState(({data}) => {
            const newArr =[...data, newItem];
            return {
                data: newArr
            }

        })
    }

    onToggleImportant(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id)

            const old = data[index];
            const newItem = {...old, important: !old.important};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArr
            }
        })
    }
    
    onToggleLiked(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id)

            const old = data[index];
            const newItem = {...old, like: !old.like};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArr
            }
        })
    }

    searchPost(items, term) {
        if (term.length === 0) {
            return items
        }

        return items.filter( (item) => {
            return item.label.indexOf(term) > -1
        });
    }

    filterPost(items, filter) {
        if (filter === "like") {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }

    onUpdateSearch(term) {
        this.setState({term})
    }

    onFilterSelect(filter) {
        this.setState({filter})
    }



    render() {

        const {data, term, filter} = this.state;
        const liked = data.filter(item => item.like).length;
        const allPost = data.length;
        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <div className="app">
                <AppHeader
                    liked={liked}
                    allPost={allPost}/>
            <div className="search-panel d-flex">
                <SearchPanel
                onUpdateSearch={this.onUpdateSearch}/>
                <PositStatusFilter
                filter={filter}
                onFilterSelect={this.onFilterSelect}/>
            </div>
            <PostList 
                posts={visiblePosts}
                onDelete={this.deleteItem}
                onToggleImportant={this.onToggleImportant}
                onToggleLiked={this.onToggleLiked}
            />
            <PostAddForm
                onAdd={this.addItem}/>
            </div>
        )
    }
}
