import ModalImage from 'react-modal-image';

export const Image = (props) => {
	const {thumb, img} = props;
	const filename = img.split('/').slice(-1).toString();
	return(
		<figure className="post_image">
			<figcaption className="image_description">
				<a href={img}>
					<p className="file_name">
						{filename.length > 30 ? "..."+filename.slice(-30) : filename}
					</p>
				</a>
			</figcaption>
			<ModalImage 
			  small={thumb} 
			  large={img} />
		</figure>
	)
}
