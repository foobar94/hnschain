import React from 'react';
import BlockListItem from './block_list_item'

const BlockList = (props) => {
	const blockItems = props.blocks.map((block) => {
		console.log(block);
		return (
			<BlockListItem block={block} key={block.hash} />
		);
	});

	return (
		<ul className="fun"> {blockItems} </ul>
	);
};

export default BlockList;