/**
 * Form field for creating the learning node.
 * 
 * @var {}
 */
import ImagePicker from './ImagePicker';

export function ContentSlideForm({ contentTitle, contentBody, imageId, onContentUpdate }) {

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
            
        </div>
    );
}