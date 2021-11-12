import React from 'react';
import * as GiIcons from 'react-icons/gi'
import * as GrIcons from 'react-icons/gr'
import * as RiIcons from 'react-icons/ri'

export const RightbarData = [
    {
      title: 'Exercise Suggestions',
      path: '/exerciseSuggestions',
      icon: <GiIcons.GiMuscleUp />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
  
      subNav: [
        {
          title: 'Biceps',
          path: '/exerciseSuggestions/biceps',
          icon: <GiIcons.GiBiceps />,
        },
        {
          title: 'Chest',
          path: '/exerciseSuggestions/chest',
          icon: <GiIcons.GiChestArmor />,
        },
        {
            title: 'Back muscle',
            path: '/exerciseSuggestions/backMuscle',
            icon: <GiIcons.GiBackPain />,
        },
        {
            title: 'Leg',
            path: '/exerciseSuggestions/leg',
            icon: <GiIcons.GiLeg />,
        },
        {
            title: 'Yoga',
            path: '/exerciseSuggestions/yoga',
            icon: <GrIcons.GrYoga />,
        },
      ]
    }
  ];
