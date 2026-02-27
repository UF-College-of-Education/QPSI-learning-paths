<?php
/**
 * DEFAULT SLIDE
 * 
 * @since 1.0.0
 * @var object $slide   Contains info about current slide
 * 
 * $slide props:
 *      template            string      Template name
 *      type                string      internal_resource || learning_node
 *      id                  int         post id of the slide content
 *      videoEmbed          string      HTML embed code from vimeo (use fixed not responsive)
 *      videoTranscript     string      Transcript of video
 *      image               int         Attachment id of the image
 */

if ($slide['type'] == 'internal_resource'):
    $content = get_post_field('post_content', $slide['id']);

    if (function_exists('get_field')):
        $preview_img = get_field('preview_img');
        $preview_img_id = $preview_img['id'] ?? 0;
        $slide['image_id'] = $preview_img_id;

        $transcripts = get_field('transcript', $slide['id']) ?? '';

        // TODO Hook up video embed once video link field added
        if (! empty(get_field('vimeo_video_id'))):
            $slide['videoEmbed'] = "Video is currently unavailable.";
        endif;
    endif;
endif;
?>
<div class="lp-slide-content <?php echo esc_attr($slide['template']) ?>">
    
    <h2 class="lp-slide-content__title <?php echo esc_attr($slide['type']) ?>"><?php echo esc_html($slide['title'])  ?></h2>

    <?php
    if(! empty($slide['imageId']) ):

        $slide_img = wp_get_attachment_image($slide['imageId'], 'large', false, [
        'class' => 'lp-slide-content__image',
        'loading' => 'lazy',
    ]);
        echo '<div class="lp-slide-content__image-wrap">';
        echo $slide_img;
        echo '</div>';

    endif; 

    // TODO: Refactor how videos are saved to be more secure URL-based approach.
    if (!empty($slide['videoEmbed'])):

        echo '<div class="lp-video-embed">';
        echo $slide['videoEmbed'];
        echo '</div>';

    endif;
    
    if(! empty($slide['content']) ):?>
    
        <div class="lp-slide-content__body"><?php echo wp_kses($slide['content'], ['p', 'ul', 'li']) ?></div>
    
    <?php endif; 
    
    if (! empty($slide['videoTranscript'])): ?>

        <details class="lp-slide-content__transcripts">
            <summary>Transcripts</summary>
            <div>
                <?php echo esc_html($slide['videoTranscript']); ?>
            <div>
        </details>

    <?php endif; ?>

</div>