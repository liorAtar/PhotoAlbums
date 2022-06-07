import React from "react";
import '../App.css';

const Thumbnail = ({ thumbnail, openPhotoInfo, setSelectedPhoto}) => {

    /**
     * Open the selected thumbnail dialog info and update the selected photo
     */
    const handleThumbnailClicked = () => {
        openPhotoInfo();
        setSelectedPhoto(thumbnail);
    }

    return (
        <div className="Thumbnail-main"
            onClick={handleThumbnailClicked}
        >
            <div className="ThumbnailImg">
                <img
                    className="ThumbnailUrlImg"
                    src={thumbnail.thumbnailUrl}
                    alt={thumbnail.thumbnailUrl}
                />
            </div>
            <h3 className="ThumbnailTitle">
                {
                    thumbnail.title.length <= 32 ?
                    thumbnail.title :
                    thumbnail.title.slice(0, 32) + '...'
                }
            </h3>
            <p className="ThumbnailId">Id: {thumbnail.albumId}</p>
            <div className="ThumbnailUrl">
                <p className="ThumbnailUrlP">{thumbnail.url}</p>
            </div>
        </div>
    )
}
export default Thumbnail;
