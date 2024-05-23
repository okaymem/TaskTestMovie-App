import { NativeSelect } from '@mantine/core';
import React, { useState } from 'react';
import classes from './styles/Select.module.css';

function Select ({ title, selectChanger, selectType }) {
  const [currentValue, currentValueChanger] = useState(selectType[0]);

  return (
    <NativeSelect  
      data={selectType[0] == '1' ? [title].concat(selectType) : [{ value: title }].concat(selectType)}
      classNames={{
       root: classes.selectBox,
      }}
      styles={{

        display: 'inline',
        backgroundColor: 'green' ,
        input: {
          color: '#ACADB9',
          fontWeight: 500,
          width: selectType[0] == '1' ? '137px' : '283px',
        }
      }}
      onChange={(event) => {
        selectChanger(event.target.value);
        currentValueChanger(event.target.value);
      }}
    />
  );
}

export default Select;