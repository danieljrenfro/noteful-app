import React from 'react';
import './SideBar.css';

export default function SideBar(props) {
  return (
    <section className='sidebar-section'>
      {props.children}
    </section>
  )
}