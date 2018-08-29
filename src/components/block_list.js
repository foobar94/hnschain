import React from 'react';
import BlockListItem from './block_list_item'

const BlockList = (props) => {
	const blockItems = props.blocks.map((block) => {
		return (
			<BlockListItem block={block} key={block.hash} />
		);
	});

	return (
		<ul className="col-md-6 list-group"> {blockItems} </ul>
	);
};

export default BlockList;