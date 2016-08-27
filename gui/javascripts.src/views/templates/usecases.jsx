import React from 'react';
import ReactDOM from 'react-dom';
import UsecaseTable from '../organisms/table.jsx';
import AddUsecaseButton from '../atoms/button.jsx';

export default {
  render() {
    const header = [
      'Usecase', 'Create Date Time', 'Last Trial Date Time', 'Last Trial Result',
    ];
    const rows = [
      ['Login', '2016/08/10 15:50:32', '2016/08/14 10:12:13', 'Success'],
      ['Add Item', '2016/08/11 12:11:13', '2016/08/14 10:18:20', 'Fail'],
    ];
    ReactDOM.render(
      <div>
        <AddUsecaseButton label="追加" />
        <UsecaseTable header={header} rows={rows} />
      </div>
      , document.getElementById('content')
    );
  },
};
