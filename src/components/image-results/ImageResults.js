import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


class ImageResults extends Component {

    state = {
        open: false,
        currentImg: '',
        downloads: '',
        views: '',
        likes: ''
    }

    handleOpen = (img, downloads, views, likes) => {
        this.setState({ open: true, 
                        currentImg: img, 
                        downloads: downloads,
                        views: views,
                        likes 
                    });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    render() {

        let imageListContent;
        const { images } = this.props;
        console.log(images)

        if (images) {
            imageListContent = (
                <GridList cols={3}>
                    {images.map(img => (
                        <GridTile
                            title={img.tags}
                            key={img.id}
                            subtitle={
                                <span>
                                    by <strong>{img.user}</strong>
                                </span>
                            }
                            actionIcon={
                                <IconButton onClick={() => this.handleOpen(img.largeImageURL, img.downloads, img.views, img.likes)}>
                                    <ZoomIn color="white" />
                                </IconButton>
                            }
                        >
                            <img src={img.largeImageURL} alt="image" />
                        </GridTile>
                    ))}
                </GridList>
            )
        } else {
            //put spinner
            imageListContent = null;
        }

        const actions = [
            <FlatButton label="Close" primart={true} onClick={this.handleClose} />
        ]

        return (
            <div >
                {imageListContent}
                <Dialog
                    fullScreen={true}
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <div>
                        <img src={this.state.currentImg} alt="" style={{ width: '100%' }} />
                    </div>
                    <p><i>downloads: </i><b>{this.state.downloads}</b></p>
                    <p><i>likes: </i><b>{this.state.downloads}</b></p>
                    <p><i>views: </i><b>{this.state.downloads}</b></p>
                </Dialog>
            </div>
        )
    }
}

ImageResults.propTypes = {
    images: PropTypes.array.isRequired
}


export default ImageResults;