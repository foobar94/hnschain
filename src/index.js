import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
//TODO: remove the js
import BlockHeight from './components/block_height';
import BlockList from './components/block_list';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			blockNumber: 0,
			lastBlocks: []
		};
		this.getBlockHeight();
		this.getLastBlocks();
	}

	//TODO: update to only change state IF the blockNumber changes. 
	getBlockHeight() {
		setInterval(() => {
			axios.get('http://localhost:5000/api/getLastBlock')
			.then(response => this.setState({blockNumber: response.data.height}));
		}, 10000);
	}

	getLastBlocks() {
		setInterval(() => {
			axios.get('http://localhost:5000/api/getLastBlocks')
			.then(response => this.setState({lastBlocks: response.data.blocks}));
		}, 10000);
	}

	render() {

		return (
			<div>
				<h1> HNSChain - The Handshake Explorer </h1>
				<BlockHeight blockNumber={this.state.blockNumber} />
				<h2> Last Blocks </h2>
				<BlockList blocks = {this.state.lastBlocks} /> 
			</div>

		);

	}
}

ReactDOM.render(<App />, document.querySelector('.container'));
