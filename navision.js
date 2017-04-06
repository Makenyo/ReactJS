function loadJSON(callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', '17753962.json', true);
	xobj.onreadystatechange = function() {
		if (xobj.readyState == 4 && xobj.status == "200") {
			callback(xobj.responseText);
		}
	}
	xobj.send(null);
}

loadJSON(function(response) {

	var data = JSON.parse(response).messages;
	
	function showDetails(message) {
		ReactDOM.render(<div><ArticleDetails message={message}/></div>, document.getElementById('details'));
	}

	var ArticleDetails = React.createClass({
		render() {
			return (
				<p>plain: {this.props.message}</p>
			)
		}
	});
	
	var ArticleElement = React.createClass({
		handleClick(){
			showDetails(this.props.data.body.plain);
		},
		render() {
			return (
				<a href="#" className = "list-group-item" onClick={this.handleClick}>
					id: {this.props.data.id}, title: {this.props.data.title}
				</a>
			)
		}
	});

	var ArticleList = React.createClass({
	render() {
		return (
			<div className = "list-group">
			{
				this.props.data.map(function(element){
					return <ArticleElement key={element.id} data= {element}/>
				})
			}
			</div>
			)
		}
	});

	var App = React.createClass({
	render() {
		return (
			<div>
				<ArticleList data={data}/>
			</div>
			)
		}
	});

	ReactDOM.render(<App/>,document.getElementById('articles'));
	showDetails(data[0].body.plain);
	
});	