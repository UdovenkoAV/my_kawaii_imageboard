
export const OpenLink = (props) => {
	
	const { slug, opost_num } = props;

	return (
		<span className="open_link">
			<a href={"/"+slug+"/"+opost_num}>[OPEN]</a>
		</span>
	)
}
