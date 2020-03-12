import React, { Component } from 'react';
import Customer from './components/Customer'
import './App.css';


const customers = [
  {
    'id': 1,
    'image': 'http://gangnamstar.co.kr/files/attach/images/119/324/028/0d19e13c06f3afd4bcb7eb92fb6247b5.jpg',
    'name': '홍길동',
    'birthday': '961222',
    'gender': '남자',
    'job': '대학생'
  },
  {
    'id': 2,
    'image': 'http://gangnamstar.co.kr/files/attach/images/119/324/028/9529d54ec28c8be31fa5893e65a62c54.jpg',
    'name': '나동빈',
    'birthday': '960508',
    'gender': '남자',
    'job': '프로그래머'
  },
  {
    'id': 3,
    'image': 'http://gangnamstar.co.kr/files/attach/images/119/324/028/46339009bb9c48a95dbbc34db8b4e706.jpg',
    'name': '이순신',
    'birthday': '961127',
    'gender': '남자',
    'job': '디자이너'
  }
]  
  
class App extends Component {
  render() {
    return (
      <div>
        {customers.map(c => {
          return <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
        })}
      </div>
    );
  }
}
  

export default App;