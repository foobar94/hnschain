import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
//TODO: remove the js
import BlockHeight from './components/block_height.js';
import BlockList from './components/block_list.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			blockNumber: 0,
			lastBlocks: []
		};
		this.getBlockHeight();
	}

	//TODO: update to only change state IF the blockNumber changes. 
	getBlockHeight() {
		setInterval(() => {
			axios.get('http://localhost:5000/api/getLastBlock')
			.then(response => this.setState({blockNumber: response.data.height}));
		}, 4000);
	}

	render() {

		return (
			<div>
				<h1> HNSChain - The Handshake Explorer </h1>
				<BlockHeight blockNumber={this.state.blockNumber} />
				<h2> Last Blocks </h2>
				<BlockList blocks = {this.state.blocks} /> 
			</div>

		);

	}
}

ReactDOM.render(<App />, document.querySelector('.container'));
