const React = require('react');
const ReactDOM = require('react-dom');

const UsecaseTable = require('../organisms/table.jsx');
const AddUsecaseButton = require('../atoms/button.jsx');

module.exports = {
  render() {
    const header = [
      'Usecase', 'Create Date Time', 'Last Trial Date Time', 'Last Trial Result'
    ];
    const rows = [
      [ 'Login', '2016/08/10 15:50:32', '2016/08/14 10:12:13', 'Success' ],
      [ 'Add Item', '2016/08/11 12:11:13', '2016/08/14 10:18:20', 'Fail' ]
    ];
    ReactDOM.render(
      <div>
        <AddUsecaseButton label="追加"></AddUsecaseButton>
        <UsecaseTable header={header} rows={rows}></UsecaseTable>
      </div>
      , document.getElementById('content')
    );
  }
};