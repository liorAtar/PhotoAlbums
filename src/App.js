import React, { useEffect, useState, lazy, Suspense } from 'react';
import ReactLoading from "react-loading";
import axios from 'axios';
import { Grid } from '@material-ui/core';
import ThumbnailDialog from './components/ThumbnailDialog';
import FilterAlbums from './components/FilterAlbums';
import './App.css';

const Thumbnail = lazy(() => import('./components/Thumbnail'));

const App = () => {
  
  const [albums, setAlbums] = useState([]);
  const [photos, setphotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [selctedPhoto, setSelectedPhoto] = useState({});
  const [selctedAlbumId, setSelectedAlbumId] = useState(1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPhotos();
    getAlbums();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    getPhotos();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selctedAlbumId]);

  /**
   * Get the requested album's photos
   */
  const getPhotos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://jsonplaceholder.typicode.com/albums/${selctedAlbumId}/photos`);
      setphotos(res.data);

      // Check if the there are any photos to the requested album
      if (res.data.length === 0) {
        alert("No Results");
        setLoading(false);
      } else {
        // Update the photos
        setFilteredPhotos(res.data);
        setLoading(false);
      }
    } catch (err) {
      console.log("error", err);
      // In case of error alert the user
      alert("error", err);
    }
  };

  /**
   * Get all the albums
   */
  const getAlbums = async () => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/albums');
      setAlbums(res.data);
    } catch (err) {
      console.log("error", err);
      // In case of error alert the user
      alert("error", err);
    }
  }

  /**
   * The user clicked on spesific photo - open the dialog
   */
  const openPhotoInfo = () => {
    setOpen(true);
  }

  /**
   * Close the opend dialog
   */
  const closePhotoInfo = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <h2 className="AppTitle">Photo Albums Page</h2>
      <FilterAlbums
        albums={albums}
        photos={photos}
        setSelectedAlbumId={setSelectedAlbumId}
        setFilteredPhotos={setFilteredPhotos}
        setLoading={setLoading}
      />
      {loading &&
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <ReactLoading type="cylon" color="#fff"/>
        </div>
      }
      <Suspense fallback={<ReactLoading type="cylon" color="#fff" />}>
        { !loading &&
          <Grid container className="GridContainer">
            {filteredPhotos !== null && filteredPhotos !== undefined && filteredPhotos.map(thumbnail =>
              <Grid
                item
                className="GridItem"
                key={thumbnail.id}
                xs={12} sm={6} md={4} lg={3}>
                <Thumbnail
                  key={thumbnail.id}
                  thumbnail={thumbnail}
                  setSelectedPhoto={setSelectedPhoto}
                  openPhotoInfo={openPhotoInfo}
                />
              </Grid>
           )}
          </Grid>
        }
      </Suspense>
      { open &&
          <ThumbnailDialog
            open={open}
            thumbnail={selctedPhoto}
            onClose={closePhotoInfo}
          />
      }
    </div>
  );
}

export default App;
