import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBoard } from '../api/services.js';
import { PostForm } from './forms.js';
import { Thread } from './thread.js';
const OpenLink = (props) => {
	
	const { slug, opost_num } = props;

	return (
		<span className="open_link">
			<a href={"/"+slug+"/"+opost_num}>[OPEN]</a>
		</span>
	)
}


export function Board(props) {

	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState({});
	const [currentPage, setCurrentPage] = useState(1);
	const { slug } = useParams();

	useEffect(() => {
		getBoard(slug, currentPage).then((result) => {
			setData(result.data);
	    setIsLoaded(true);
		}).catch((error) => {setError(error);
		  setIsLoaded(true)});
	}, [slug, currentPage]);
	if (!isLoaded){
		return (
			<h2>Loading...</h2>
		);
	} else if (error){
		return (
			<div className="error">
				<h2>{error.message}</h2>
			</div>
		);
	} else {
	  return(
			<>
				<div className="board">
					<PostForm slug={slug} parent={null}/>
					{data.page.threads.map(thread => <Thread key={"thread_"+thread.opost.post_number}
																									 openLink={<OpenLink slug={slug} 
																										 									 opost_num={thread.opost.post_number}/>}
																									 thread={thread} slug={slug}
					 																				 skip
																									 onPostNumClick={() => {}}
					/>)}
				</div>
				<div className="paginator">
					<button onClick={() => {data.page.has_previous && setCurrentPage(currentPage-1)}}>Previous</button>
					{data.page.pages_list.map(page => 
					(page !== currentPage ? <a key={"page_"+page} href="#" onClick={() => setCurrentPage(page)}>[{page}]</a> : <span key={"page_"+page}>[{page}]</span>))}
				  <button onClick={() => {data.page.has_next && setCurrentPage(currentPage+1)}}>Next</button>
				</div>
			</>
		);
	}
	
}
