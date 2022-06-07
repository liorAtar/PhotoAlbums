import React, { useState } from "react";
import { Grid } from '@material-ui/core';
import '../App.css';

const FilterAlbums = ({ albums, photos, setSelectedAlbumId, setFilteredPhotos, setLoading}) => {

    const [searchValue, setSearchValue] = useState('');

    /**
     * Filter the current album's photos by the search value
     * @param {*} e 
     */
    const handleSerachValueChanged = (e) => {
        setLoading(true);
        setSearchValue(e.target.value);
        const filteredPhotos = photos.filter(photo => {
            return (
                photo
                    .title
                    .toLowerCase()
                    .includes((e.target.value).toLowerCase())
            );
        });

        // Check if there are any filtered photos
        if (filteredPhotos.length === 0) {
            // Alert the user that no results were founs
            alert(`No Results For ${e.target.value}`);

            // Reset the search value
            setSearchValue('');

            // Reset the filtered photos to all the curremt album's photos
            setFilteredPhotos(photos);
            setLoading(false);
        } else {
            // Update the filtered photos by the search value
            setFilteredPhotos(filteredPhotos);
            setLoading(false);
        }
    }

    /**
     * Update the photos by the new selected album
     * @param {*} e 
     */
    const handleSelectedAlbumChange = (e) => {
        let selectedAlbum = albums.find(album => album.title === e.target.value);
        setSelectedAlbumId(selectedAlbum.id);
    }

    return (
        <Grid container>
            <Grid
                item
                className="GridItem"
                xs={12} sm={4} md={3} lg={2}>
                <input
                    className="Search"
                    type='text'
                    placeholder="Search"
                    value={searchValue}
                    onChange={handleSerachValueChanged}
                />
            </Grid>
            <Grid
                item
                className="GridItem"
                xs={12} sm={4} md={3} lg={2}>
                <select className="SelectAlbum" onChange={handleSelectedAlbumChange}>
                    {albums &&
                        albums.map(album =>
                            <option
                                key={album.title}
                                value={album.albumId}
                            >
                                {album.title}
                            </option>
                        )
                    }
                </select>
            </Grid>
        </Grid>
    )
}
export default FilterAlbums;
