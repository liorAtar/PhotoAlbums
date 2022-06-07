import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import '../App.css';

const ThumbnailDialog = ({ thumbnail, open, onClose }) => {

    return (
        <Dialog open={open} onClose={onClose}>
            {console.log("selctedthum", thumbnail)}
            <DialogTitle className="DialogTitle">
                {thumbnail.title}
            </DialogTitle>
            <DialogContent className="DialogItem">
                <div className="ThumbInfo">
                    <img
                        className="ThumbnailUrlImgDialog"
                        src={thumbnail.thumbnailUrl}
                        alt={thumbnail.thumbnailUrl}
                    />
                    <div>
                        <p className="ThumbnailIdDialog">Album Id: {thumbnail.albumId}</p>
                        <p className="ThumbnailIdDialog">Photo Id: {thumbnail.id}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default ThumbnailDialog;