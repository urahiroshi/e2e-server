import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Heading from '../atoms/heading.jsx';
import Table from '../organisms/table.jsx';

const style = {
  table: {},
  tr: {
    verticalAlign: 'top',
    borderTop: '1px #CCCCCC solid',
  },
  th: {
    padding: '10px 10px',
  },
  td: {
    padding: '10px 0px',
  },
};

const Result = ({ result }) => {
  if (!result.resultId) { return <section></section>; }
  const header = ['type', 'name', 'value'];
  const rows = [[]].concat(
    result.texts.map(text => ['text', text.name, text.txt]),
    result.htmls.map(html => ['html', html.name, html.html]),
    result.screenshots.map(screenshot => [
      'screenshot',
      screenshot.name,
      <a href={`/images/results/${result.resultId}/screenshots/${screenshot.name}.png`}>
      Detail
      </a>,
    ])
  );
  return (
    <section>
      <Heading value="Result" />
      <Table header={header} style={style} rows={rows} />
    </section>
  );
};

Result.propTypes = {
  result: PropTypes.object.isRequired,
};

export default Result;
