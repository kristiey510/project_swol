import React, { useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as GiIcons from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { RightbarData } from './RightbarData';
import './Rightbar.css';
import { IconContext } from 'react-icons';

function Rightbar() {
  const [rightbar, setRightbar] = useState(false);

  const showRightbar = () => setRightbar(!rightbar);

  return (
    <>
      <IconContext.Provider value={{ color: '#000' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <GiIcons.GiMuscleUp onClick={showRightbar} />
          </Link>
        </div>
        <nav className={rightbar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showRightbar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {RightbarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Rightbar;