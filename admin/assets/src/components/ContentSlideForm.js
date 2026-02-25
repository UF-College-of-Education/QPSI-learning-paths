/**
 * Form field for creating the learning node.
 * 
 * @var {string}    contentTitle
 * @var {string}    contentBody
 * @var {int}       imageId
 * @var {string}    videoEmbed
 * @var {string}    videoTranscript
 */
import ImagePicker from './ImagePicker';

export function ContentSlideForm({ contentTitle, contentBody, imageId, videoEmbed, videoTranscript, onContentUpdate }) {

    return (
        <div className="lp-slide-form__content-fields">
            <div className="lp-slide-form__field">
                <label htmlFor="lp-content-title" className="lp-slide-form__label title">
                    { 'Title' }
                </label>
                <input
                    id="lp-content-title"
                    type="text"
                    className="lp-slide-form__input title"
                    value={ contentTitle }
                    onChange={ ( e ) => onContentUpdate( 'title', e.target.value ) }
                    placeholder="Enter slide title..."
                />
            </div>
            <div className="lp-slide-form__field content">
                <label htmlFor="lp-content-body" className="lp-slide-form__label content">
                    { 'Content' }
                </label>
                <textarea
                    id="lp-content-body"
                    className="lp-slide-form__textarea content"
                    value={ contentBody }
                    onChange={ ( e ) => onContentUpdate( 'body',  e.target.value ) }
                    placeholder="Enter slide content..."
                    rows={ 6 }
                />
            </div>
            <ImagePicker
                imageId={ imageId }
                onSelect={ (imageId) => onContentUpdate('image', imageId) }
                onRemove={ () => onContentUpdate( 'image', null ) }
            />
            <div className="lp-slide-form__field videoEmbed">
                <label htmlFor="lp-video-embed" className="lp-slide-form__label video-embed">
                    { 'Video Embed Code (Optional)' }
                </label>
                <textarea
                    id="lp-video-embed"
                    className="lp-slide-form__textarea video-embed"
                    value={ videoEmbed }
                    onChange={ ( e ) => onContentUpdate( 'videoEmbed',  e.target.value ) }
                    placeholder="Enter video embed code here..."
                    rows={ 3 }
                />
            </div>
            <div className="lp-slide-form__field videoTranscript">
                <label htmlFor="lp-video-transcript" className="lp-slide-form__label video-transcript">
                    { 'Video Transcript (Optional)' }
                </label>
                <textarea
                    id="lp-video-transcript"
                    className="lp-slide-form__textarea video-transcript"
                    value={ videoTranscript }
                    onChange={ ( e ) => onContentUpdate( 'videoTranscript',  e.target.value ) }
                    placeholder="Enter video transcript code here..."
                    rows={ 3 }
                />
            </div>
        </div>
    );
}