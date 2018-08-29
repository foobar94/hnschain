import React from 'react';
import Moment from 'moment';

const BlockListItem = ({block}) => {
	var date = Moment.unix(block.time).format('MMMM Do YYYY, h:mm:ss a');
	return (
		<li className="list-group-item"> {block.height} {block.numTransactions} {date}  </li>
	);
};

export default BlockListItem;