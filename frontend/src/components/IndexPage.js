import { NewsBlock } from './posts/NewsBlock.js';
import { BoardsBlock } from './BoardsBlock.js';

export function IndexPage(props) {


  return (
    <div className="index_page">
      <NewsBlock/>
      <div className="boards_links">
	<BoardsBlock/>
      </div>
    </div>)
}
