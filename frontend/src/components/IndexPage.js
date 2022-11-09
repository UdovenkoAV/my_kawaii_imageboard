import { NewsBlock } from './posts/NewsBlock.js';
import { BoardsBlock } from './BoardsBlock.js';
import { WelcomeMessage } from './WelcomeMessage.js';

export function IndexPage(props) {

  return (
    <div className="index">
      <div className="left_block">
	<WelcomeMessage/>
	<NewsBlock/>
      </div>
      <div className="right_block">
	<BoardsBlock/>
      </div>
    </div>)
}
