import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import BlockHeight from './components/block_height';
import BlockList from './components/block_list';


//TODO: Need to do an initial DB call seperate from setInterval so page doesn't wait to load info for n seconds
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

	//TODO update to only change the state IF the last n blocks change.
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
				<div className = "row">
					<div className = "col-md-3 col-xs-6"> 
						<div className = "box">
							<div className = "blockNumber">
								<BlockHeight blockNumber={this.state.blockNumber} />
							</div>
							<div className = "blockNumberTitle">
								Chain Height
							</div>
						</div>
					</div>
					<div className = "col-md-3 col-xs-6"> 
						<div className = "box">
							<div className = "blockNumber">
								143,000 
							</div>
							<div className = "blockNumberTitle">
								Network Hashrate
							</div>
						</div>
					</div>
					<div className = "col-md-3 col-xs-6"> 
						<div className = "box">
							<div className = "blockNumber">
								153s
							</div>
							<div className = "blockNumberTitle">
								Blocktime
							</div>
						</div>
					</div>
					<div className = "col-md-3 col-xs-6"> 
						<div className = "box">
							<div className = "blockNumber">
								134,000
							</div>
							<div className = "blockNumberTitle">
								Total Monetary Base
							</div>
						</div>
					</div>
				</div>
				<div className = "row">
					<h2> </h2>
					<h2 className="col-md-6"> Last Blocks </h2>
					<h2 className = "col-md-6"> Last Events </h2>
					<BlockList blocks = {this.state.lastBlocks} /> 
					<BlockList blocks = {this.state.lastBlocks} /> 
				</div>
			</div>

		);

	}
}

ReactDOM.render(<App />, document.querySelector('.container'));
