import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Text } from '@chakra-ui/react';
import { RightbarData } from './RightbarData';
import './Rightbar.css';

function Rightbar() {
  const [rightbar, setRightbar] = useState(false);

  const showRightbar = () => setRightbar(!rightbar);

  return (
    <>
          <ul className='nav-menu-items' onClick={showRightbar}>
            
            {RightbarData.map((item, index) => {
              return (
              <Box mb="20px"  key={index}>
                <Link to ={item.path}  justify="flex-start"> 
                  <Flex alignItems="center">
                    {item.icon}
                    <Text ml="5px">{item.title}</Text>
                  </Flex>
                </Link>
              </Box>
              );
            })}
          </ul>
    </>
  );
}

export default Rightbar;