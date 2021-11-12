import React, {useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import * as GiIcons from 'react-icons/gi'
import * as GrIcons from 'react-icons/gr'
import * as RiIcons from 'react-icons/ri'

const Nav = styled.div`
  background: #ffffff;
  height: 80px;
  display: flex;
  flex: 3.5;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const RightbarNav = styled.nav`
  background: #ffffff;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content
`;

const RightbarWrap = styled.nav`
  width: 100%
`;


const Rightbar = () => {
  const [Rightbar, setRightbar] = useState(false)

  const showRightbar = () => setRightbar(!Rightbar)

  return (
    <>
      <Nav>
        <NavIcon to="#">
          <GiIcons.GiMuscleUp onClick={showRightbar} />
        </NavIcon>
      </Nav>
      <RightbarNav>
        <RightbarWrap>
        <NavIcon to="#">
          <RiIcons.RiArrowDownSFill />
        </NavIcon>
        </RightbarWrap>
      </RightbarNav>
    </>
  )
}

export default Rightbar
