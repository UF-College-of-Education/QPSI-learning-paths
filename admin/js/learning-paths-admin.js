/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./admin/js/src/components/AddSlideButton.js"
/*!***************************************************!*\
  !*** ./admin/js/src/components/AddSlideButton.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AddSlideButton)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * AddSlideButton
 *
 * Add a new empty slide to the sequence.
 *
 * @since 1.0.0
 * @package Learning_Paths
 */



function AddSlideButton({
  onClick
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "lp-add-slide",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
      variant: "secondary",
      icon: "plus-alt2",
      onClick: onClick,
      children: 'Add Slide'
    })
  });
}

/***/ },

/***/ "./admin/js/src/components/ImagePicker.js"
/*!************************************************!*\
  !*** ./admin/js/src/components/ImagePicker.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ImagePicker)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * ImagePicker
 *
 * Allows authors to select an image from the WordPress media library.
 * Stores the attachment ID and displays a preview of the selected image.
 *
 * @since 1.0.0
 * @package Learning_Paths
 */




function ImagePicker({
  imageId,
  onSelect,
  onRemove
}) {
  const [previewUrl, setPreviewUrl] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const mediaFrameRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  /**
   * If an imageId is already set, fetch the attachment URL for the preview.
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!imageId) {
      setPreviewUrl(null);
      return;
    }
    const attachment = window.wp.media.attachment(imageId);
    attachment.fetch().then(() => {
      const url = attachment.get('sizes')?.medium?.url || attachment.get('url');
      setPreviewUrl(url);
    });
  }, [imageId]);

  /**
   * Open the WordPress media library modal.
   */
  function openMediaLibrary() {
    if (!mediaFrameRef.current) {
      mediaFrameRef.current = window.wp.media({
        title: 'Select Image',
        button: {
          text: 'Select'
        },
        multiple: false,
        library: {
          type: 'image'
        }
      });
      mediaFrameRef.current.on('select', () => {
        const attachment = mediaFrameRef.current.state().get('selection').first().toJSON();
        const url = attachment.sizes?.medium?.url || attachment.url;
        setPreviewUrl(url);
        onSelect(attachment.id);
      });
    }
    mediaFrameRef.current.open();
  }

  /**
   * Remove the selected image.
   */
  function handleRemove() {
    setPreviewUrl(null);
    onRemove();
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "lp-image-picker",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("p", {
      className: "lp-image-picker__label",
      id: "lp-image-picker-label",
      children: ['Image', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
        className: "lp-image-picker__optional",
        children: ' (optional)'
      })]
    }), previewUrl && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "lp-image-picker__preview",
      "aria-labelledby": "lp-image-picker-label",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("img", {
        src: previewUrl,
        alt: "Selected slide image",
        className: "lp-image-picker__preview-img"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "lp-image-picker__controls",
      role: "group",
      "aria-labelledby": "lp-image-picker-label",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        variant: "secondary",
        onClick: openMediaLibrary,
        children: imageId ? 'Change Image' : 'Add Image'
      }), imageId && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        variant: "tertiary",
        isDestructive: true,
        onClick: handleRemove,
        children: 'Remove Image'
      })]
    })]
  });
}

/***/ },

/***/ "./admin/js/src/components/LearningPathEditor.js"
/*!*******************************************************!*\
  !*** ./admin/js/src/components/LearningPathEditor.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LearningPathEditor)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_generateId__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/generateId */ "./admin/js/src/utils/generateId.js");
/* harmony import */ var _SlideList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SlideList */ "./admin/js/src/components/SlideList.js");
/* harmony import */ var _AddSlideButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AddSlideButton */ "./admin/js/src/components/AddSlideButton.js");
/* harmony import */ var _SlidePanel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SlidePanel */ "./admin/js/src/components/SlidePanel.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
/**
 * LearningPathEditor
 *
 * Top level component for the learning path editor.
 * Owns the sequence state and syncs it to a hidden input
 * for saving via the WordPress post save mechanism.
 *
 * @since 1.0.0
 * @package Learning_Paths
 */







function LearningPathEditor() {
  /**
   * Read the initial sequence from the localized script data set by PHP.
   * Falls back to an empty array if nothing is saved yet.
   */
  const savedSequence = window.learningPathsData?.sequence || [];

  /**
   * Hydrate saved sequence with client-side IDs.
   * Saved slides won't have a clientId so we add one on load.
   */
  function hydrateSequence(sequence) {
    return sequence.map(slide => ({
      ...slide,
      clientId: (0,_utils_generateId__WEBPACK_IMPORTED_MODULE_1__.generateId)()
    }));
  }
  const [sequence, setSequence] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(() => hydrateSequence(savedSequence));
  const [activeSlideId, setActiveSlideId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const hiddenInputRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  /**
   * Sync sequence state to hidden input whenever it changes
   * so WordPress saves the latest value on post save.
   * Client IDs are stripped before saving.
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (hiddenInputRef.current) {
      const toSave = sequence.map(({
        clientId,
        ...rest
      }) => rest);
      hiddenInputRef.current.value = JSON.stringify(toSave);
    }
  }, [sequence]);

  /**
   * Add a new empty slide to the sequence and open the panel.
   */
  const handleAddSlide = () => {
    const newSlide = {
      clientId: (0,_utils_generateId__WEBPACK_IMPORTED_MODULE_1__.generateId)(),
      id: null,
      type: null,
      template: null
    };
    setSequence(prev => [...prev, newSlide]);
    setActiveSlideId(newSlide.clientId);
  };

  /**
   * Remove a slide from the sequence by its clientId.
   *
   * @param {string} clientId
   */
  const handleRemoveSlide = clientId => {
    setSequence(prev => prev.filter(slide => slide.clientId !== clientId));
    if (activeSlideId === clientId) {
      setActiveSlideId(null);
    }
  };

  /**
   * Confirm a slide update and close the panel atomically.
   * This avoids a race condition where handleClosePanel reads
   * stale state and removes a slide that was just confirmed.
   *
   * @param {Object} updates
   */
  const handleConfirmSlide = (updates, shouldClose = true) => {
    setSequence(prev => prev.map(slide => slide.clientId === activeSlideId ? {
      ...slide,
      ...updates
    } : slide));
    if (shouldClose) {
      setActiveSlideId(null);
    }
  };

  /**
   * Select a slide. If the currently active slide is incomplete, remove it first.
   *
   * @param {string} clientId
   */
  const handleSelectSlide = clientId => {
    if (activeSlideId && activeSlideId !== clientId) {
      const currentSlide = sequence.find(slide => slide.clientId === activeSlideId);
      if (currentSlide && (!currentSlide.id || !currentSlide.type)) {
        handleRemoveSlide(activeSlideId);
      }
    }
    setActiveSlideId(clientId);
  };

  /**
   * Reorder slides in the sequence.
   *
   * @param {Array} reorderedSequence
   */
  const handleReorder = reorderedSequence => {
    setSequence(reorderedSequence);
  };

  /**
   * Close the panel. If the active slide is incomplete, remove it.
   */
  const handleClosePanel = () => {
    const activeSlide = sequence.find(slide => slide.clientId === activeSlideId);
    if (activeSlide && (!activeSlide.id || !activeSlide.type)) {
      handleRemoveSlide(activeSlideId);
    }
    setActiveSlideId(null);
  };
  const activeSlide = sequence.find(slide => slide.clientId === activeSlideId) || null;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "lp-editor",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("input", {
      type: "hidden",
      name: "learning_path_sequence",
      ref: hiddenInputRef
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "lp-editor__main",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_SlideList__WEBPACK_IMPORTED_MODULE_2__["default"], {
        sequence: sequence,
        activeSlideId: activeSlideId,
        onSelectSlide: handleSelectSlide,
        onReorder: handleReorder,
        onRemoveSlide: handleRemoveSlide
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_AddSlideButton__WEBPACK_IMPORTED_MODULE_3__["default"], {
        onClick: handleAddSlide
      })]
    }), activeSlide && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_SlidePanel__WEBPACK_IMPORTED_MODULE_4__["default"], {
      slide: activeSlide,
      onConfirm: handleConfirmSlide,
      onClose: handleClosePanel
    }, activeSlide.clientId)]
  });
}

/***/ },

/***/ "./admin/js/src/components/ResourceSearch.js"
/*!***************************************************!*\
  !*** ./admin/js/src/components/ResourceSearch.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResourceSearch)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_useResourceSearch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hooks/useResourceSearch */ "./admin/js/src/hooks/useResourceSearch.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * ResourceSearch
 *
 * Handles searching, displaying, and paginating internal_resource
 * posts for selection within the SlideForm.
 *
 * @since 1.0.0
 * @package Learning_Paths
 */




function ResourceSearch({
  selectedPost,
  onSelect
}) {
  const {
    query,
    setQuery,
    results,
    page,
    setPage,
    totalPages,
    isLoading,
    error
  } = (0,_hooks_useResourceSearch__WEBPACK_IMPORTED_MODULE_1__["default"])();

  /**
   * Get the plain text title from a post object.
   * The REST API returns title as an object with a rendered property.
   *
   * @param {Object} post
   * @returns {string}
   */
  function getTitle(post) {
    return post.title?.rendered || 'Untitled';
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "lp-resource-search",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("p", {
      className: "lp-resource-search__selected",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("strong", {
        children: 'Currently Selected Resource: '
      }), selectedPost ? getTitle(selectedPost) : 'None selected']
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "lp-resource-search__field",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
        className: "lp-resource-search__label",
        htmlFor: "resource-search",
        children: 'Search Resources'
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
        type: "search",
        className: "lp-resource-search__input",
        name: "resource-search",
        value: query,
        onChange: e => setQuery(e.target.value),
        placeholder: "Search by title..."
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "lp-resource-search__results",
      children: [isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "lp-resource-search__loading",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Spinner, {})
      }), !isLoading && error && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "lp-resource-search__error",
        children: error
      }), !isLoading && !error && results.length === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "lp-resource-search__empty",
        children: query ? 'No resources found.' : 'No resources available.'
      }), !isLoading && !error && results.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("ul", {
        className: "lp-resource-search__list",
        children: results.map(post => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("li", {
          className: `lp-resource-search__item${selectedPost?.id === post.id ? ' lp-resource-search__item--selected' : ''}`,
          onClick: () => onSelect(post),
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
            className: "lp-resource-search__item-title",
            children: getTitle(post)
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
            href: post.link,
            target: "_blank",
            rel: "noreferrer",
            className: "lp-resource-search__item-view",
            onClick: e => e.stopPropagation(),
            children: '(View)'
          })]
        }, post.id))
      })]
    }), !isLoading && totalPages > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "lp-resource-search__pagination",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button", {
        className: "lp-resource-search__pagination-btn",
        onClick: () => setPage(p => p - 1),
        disabled: page === 1,
        children: '← Previous'
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
        className: "lp-resource-search__pagination-info",
        children: `Page ${page} of ${totalPages}`
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button", {
        className: "lp-resource-search__pagination-btn",
        onClick: () => setPage(p => p + 1),
        disabled: page === totalPages,
        children: 'Next →'
      })]
    })]
  });
}

/***/ },

/***/ "./admin/js/src/components/SlideForm.js"
/*!**********************************************!*\
  !*** ./admin/js/src/components/SlideForm.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SlideForm)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ResourceSearch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ResourceSearch */ "./admin/js/src/components/ResourceSearch.js");
/* harmony import */ var _ImagePicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ImagePicker */ "./admin/js/src/components/ImagePicker.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
/**
 * SlideForm
 *
 * Form component for editing a slide within the SlidePanel.
 * Handles type selection and renders the appropriate fields
 * based on whether the slide is an Existing Resource or Content Slide.
 *
 * @since 1.0.0
 * @package Learning_Paths
 */







/**
 * Hardcoded list of available templates.
 * In a future build this will be replaced with a filter-based registration system.
 */

const TEMPLATES = [{
  label: 'Default',
  value: 'default'
}, {
  label: 'Title Slide',
  value: 'title-slide'
}, {
  label: 'Two Column',
  value: 'two-column'
}];
const SLIDE_TYPES = [{
  label: 'Existing Resource',
  value: 'internal_resource'
}, {
  label: 'Content Slide',
  value: 'learning_node'
}];

/**
 * 
 * @param {object}      slide       This instance of the slide component
 * @param {function}    onUpdate
 * @param {function}    onClose
 */

function SlideForm({
  slide,
  onConfirm,
  onClose
}) {
  const [selectedType, setSelectedType] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(slide.type || '');
  const [selectedTemplate, setSelectedTemplate] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(slide.template || 'default');
  const [selectedPost, setSelectedPost] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(slide.id ? {
    id: slide.id,
    title: {
      rendered: slide.title
    }
  } : null);
  const [contentTitle, setContentTitle] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(slide.title || '');
  const [contentBody, setContentBody] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(slide.content || '');
  const [imageId, setImageId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(slide.imageId || null);
  const [isSaving, setIsSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [success, setSuccess] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  /**
   * Handle type selection change.
   * Reset post and template selections when type changes.
   *
   * @param {string} type Type of resource
   */
  function handleTypeChange(type) {
    setSelectedType(type);
    setSelectedPost(null);
    setContentTitle('');
    setContentBody('');
    setImageId(null);
    setError(null);
    setSuccess(false);
  }

  /**
   * Handle post selection from ResourceSearch.
   *
   * @param {Object} post
   */
  function handlePostSelect(post) {
    setSelectedPost(post);
  }

  /**
   * Handle confirmation for Existing Resource slides.
   * Updates the slide with the selected post and template.
   */
  function handleResourceConfirm() {
    if (!selectedPost || !selectedTemplate) {
      return;
    }
    onConfirm({
      id: selectedPost.id,
      type: 'internal_resource',
      template: selectedTemplate,
      title: selectedPost.title.rendered
    });
  }

  /**
   * Handle confirmation for Content Slide slides.
   * Creates or updates a learning_node post via the REST API.
   */
  async function handleContentConfirm() {
    if (!contentTitle || !selectedTemplate) {
      return;
    }
    setIsSaving(true);
    setError(null);
    try {
      const isNew = !slide.id;
      const path = isNew ? '/wp/v2/learning_node' : `/wp/v2/learning_node/${slide.id}`;
      const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path,
        method: 'POST',
        data: {
          title: contentTitle,
          content: contentBody,
          status: 'publish'
        }
      });
      onConfirm({
        id: response.id,
        type: 'learning_node',
        template: selectedTemplate,
        title: contentTitle,
        content: contentBody,
        imageId: imageId
      }, false); // false = don't close panel

      setSuccess(true);
    } catch (err) {
      setError('Failed to save content slide. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }

  /**
   * Determine if the confirm button should be disabled.
   *
   * @returns {boolean}
   */
  function isConfirmDisabled() {
    if (!selectedType) {
      return true;
    }
    if (selectedType === 'internal_resource') {
      return !selectedPost;
    }
    if (selectedType === 'learning_node') {
      return !contentTitle || isSaving;
    }
    return true;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "lp-slide-form",
    children: [success && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
      className: "lp-slide-form__success",
      children: 'Content slide saved successfully. Be sure to save the post, too!'
    }), error && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
      className: "lp-slide-form__error",
      children: error
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: "Template",
      value: selectedTemplate,
      options: TEMPLATES,
      onChange: setSelectedTemplate
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RadioControl, {
      label: "Slide Type",
      selected: selectedType,
      options: SLIDE_TYPES,
      onChange: handleTypeChange,
      className: "lp-slide-type-control"
    }), selectedType === 'internal_resource' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ResourceSearch__WEBPACK_IMPORTED_MODULE_3__["default"], {
      selectedPost: selectedPost,
      onSelect: handlePostSelect
    }), selectedType === 'learning_node' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "lp-slide-form__content-fields",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "lp-slide-form__field",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("label", {
          htmlFor: "lp-content-title",
          className: "lp-slide-form__label title",
          children: 'Title'
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("input", {
          id: "lp-content-title",
          type: "text",
          className: "lp-slide-form__input title",
          value: contentTitle,
          onChange: e => setContentTitle(e.target.value),
          placeholder: "Enter slide title..."
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "lp-slide-form__field content",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("label", {
          htmlFor: "lp-content-body",
          className: "lp-slide-form__label content",
          children: 'Content'
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("textarea", {
          id: "lp-content-body",
          className: "lp-slide-form__textarea content",
          value: contentBody,
          onChange: e => setContentBody(e.target.value),
          placeholder: "Enter slide content...",
          rows: 6
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ImagePicker__WEBPACK_IMPORTED_MODULE_4__["default"], {
        imageId: imageId,
        onSelect: setImageId,
        onRemove: () => setImageId(null)
      })]
    }), selectedType && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "lp-slide-form__actions",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        variant: "primary",
        onClick: selectedType === 'internal_resource' ? handleResourceConfirm : handleContentConfirm,
        disabled: isConfirmDisabled(),
        children: isSaving ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {}) : 'Confirm'
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        variant: "tertiary",
        onClick: onClose,
        children: 'Cancel'
      })]
    })]
  });
}

/***/ },

/***/ "./admin/js/src/components/SlideItem.js"
/*!**********************************************!*\
  !*** ./admin/js/src/components/SlideItem.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SlideItem)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * SlideItem
 *
 * Represents a single slide in the learning path sequence list.
 * Displays the slide label, reorder buttons, and a remove button.
 *
 * @since 1.0.0
 * @package Learning_Paths
 */



/**
 * Get a human readable label for the slide based on its current state.
 *
 * @param {Object} slide
 * @returns {string}
 */

function getSlideLabel(slide) {
  if (!slide.type) {
    return 'New Slide';
  }
  if (slide.title) {
    return slide.title;
  }
  if (slide.type === 'internal_resource') {
    return 'Existing Resource';
  }
  if (slide.type === 'learning_node') {
    return 'Content Slide';
  }
  return 'Untitled Slide';
}
function SlideItem({
  slide,
  index,
  isActive,
  isFirst,
  isLast,
  onSelect,
  onMoveUp,
  onMoveDown,
  onRemove
}) {
  const label = getSlideLabel(slide);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("li", {
    className: `lp-slide-item${isActive ? ' lp-slide-item--active' : ''}`,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "lp-slide-item__info",
      onClick: onSelect,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
        className: "lp-slide-item__index",
        children: index + 1
      }), slide.type && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
        className: "lp-slide-item__type",
        children: slide.type === 'internal_resource' ? 'Resource: ' : 'Content Slide: '
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
        className: "lp-slide-item__label",
        children: label
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "lp-slide-item__controls",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
        icon: "arrow-up-alt2",
        label: "Move slide up",
        onClick: onMoveUp,
        disabled: isFirst,
        size: "small"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
        icon: "arrow-down-alt2",
        label: "Move slide down",
        onClick: onMoveDown,
        disabled: isLast,
        size: "small"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
        icon: "trash",
        label: "Remove slide",
        onClick: onRemove,
        isDestructive: true,
        size: "small"
      })]
    })]
  });
}

/***/ },

/***/ "./admin/js/src/components/SlideList.js"
/*!**********************************************!*\
  !*** ./admin/js/src/components/SlideList.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SlideList)
/* harmony export */ });
/* harmony import */ var _SlideItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SlideItem */ "./admin/js/src/components/SlideItem.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * SlideList
 *
 * Renders the ordered list of slides in the learning path sequence.
 *
 * @since 1.0.0
 * @package Learning_Paths
 * 
 */



/**
 * @param {string}      sequence        JSON containing order of slides
 * @param {string}      activeSlideId   
 * @param {function}    onSelectSlide
 * @param {function}    onReorder
 * @param {function}    onRemoveSlide
 */

function SlideList({
  sequence,
  activeSlideId,
  onSelectSlide,
  onReorder,
  onRemoveSlide
}) {
  if (!sequence.length) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
      className: "lp-slide-list__empty",
      children: 'No slides added yet. Click "Add Slide" to get started.'
    });
  }

  /**
   * Move a slide up or down in the sequence.
   *
   * @param {number} index     Current index of the slide.
   * @param {string} direction 'up' or 'down'.
   */
  const handleMove = (index, direction) => {
    const newSequence = [...sequence];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSequence.length) {
      return;
    }
    [newSequence[index], newSequence[targetIndex]] = [newSequence[targetIndex], newSequence[index]];
    onReorder(newSequence);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("ul", {
    className: "lp-slide-list",
    children: sequence.map((slide, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_SlideItem__WEBPACK_IMPORTED_MODULE_0__["default"], {
      slide: slide,
      index: index,
      isActive: slide.clientId === activeSlideId,
      isFirst: index === 0,
      isLast: index === sequence.length - 1,
      onSelect: () => onSelectSlide(slide.clientId),
      onMoveUp: () => handleMove(index, 'up'),
      onMoveDown: () => handleMove(index, 'down'),
      onRemove: () => onRemoveSlide(slide.clientId)
    }, slide.clientId))
  });
}

/***/ },

/***/ "./admin/js/src/components/SlidePanel.js"
/*!***********************************************!*\
  !*** ./admin/js/src/components/SlidePanel.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SlidePanel)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SlideForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SlideForm */ "./admin/js/src/components/SlideForm.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * SlidePanel
 *
 * Displays the editing panel for the currently selected slide.
 * Acts as a container for SlideForm and handles the panel
 * header and close behavior.
 *
 * @since 1.0.0
 * @package Learning_Paths
 */




function SlidePanel({
  slide,
  onConfirm,
  onClose
}) {
  /**
   * Determine the panel title based on the slide's current state.
   *
   * @returns {string}
   */
  function getPanelTitle() {
    if (!slide.type) {
      return 'New Slide';
    }
    if (slide.type === 'internal_resource') {
      return 'Existing Resource';
    }
    if (slide.type === 'learning_node') {
      return 'Content Slide';
    }
    return 'Edit Slide';
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "lp-slide-panel",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "lp-slide-panel__header",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h2", {
        className: "lp-slide-panel__title",
        children: getPanelTitle()
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
        icon: "no-alt",
        label: "Close panel",
        onClick: onClose,
        size: "small"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "lp-slide-panel__body",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_SlideForm__WEBPACK_IMPORTED_MODULE_1__["default"], {
        slide: slide,
        onConfirm: onConfirm,
        onClose: onClose
      })
    })]
  });
}

/***/ },

/***/ "./admin/js/src/hooks/useResourceSearch.js"
/*!*************************************************!*\
  !*** ./admin/js/src/hooks/useResourceSearch.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useResourceSearch)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
/**
 * useResourceSearch
 *
 * Custom hook for fetching, searching, and paginating
 * internal_resource posts for the Existing Resource slide form.
 *
 * @since 1.0.0
 * @package Learning_Paths
 */



const PER_PAGE = 10;
function useResourceSearch() {
  const [query, setQuery] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [results, setResults] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [page, setPage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  const [totalPages, setTotalPages] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  const [isLoading, setIsLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const debounceTimer = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  /**
   * Fetch posts from the REST API based on the current query and page.
   *
   * @param {string} searchQuery
   * @param {number} currentPage
   */
  async function fetchResources(searchQuery, currentPage) {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        per_page: PER_PAGE,
        page: currentPage,
        _fields: 'id,title,,link',
        orderby: 'date',
        order: 'desc'
      });
      if (searchQuery) {
        params.set('search', searchQuery);
      }
      const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
        path: `/wp/v2/internal_resource?${params.toString()}`,
        parse: false
      });
      const total = parseInt(response.headers.get('X-WP-TotalPages'), 10);
      const data = await response.json();
      setResults(data);
      setTotalPages(total || 1);
    } catch (err) {
      setError('Failed to load resources. Please try again.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * When the query changes, debounce the fetch and reset to page 1.
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      setPage(1);
      fetchResources(query, 1);
    }, 300);
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query]);

  /**
   * When the page changes, fetch without resetting.
   * Skip on initial render since the query effect handles that.
   */
  const isFirstRender = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(true);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fetchResources(query, page);
  }, [page]);
  return {
    query,
    setQuery,
    results,
    page,
    setPage,
    totalPages,
    isLoading,
    error
  };
}

/***/ },

/***/ "./admin/js/src/utils/generateId.js"
/*!******************************************!*\
  !*** ./admin/js/src/utils/generateId.js ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateId: () => (/* binding */ generateId)
/* harmony export */ });
/**
 * Generate a unique client-side ID for slide items.
 * These are used for React keys and panel tracking only
 * and are not persisted to the database.
 *
 * @returns {string}
 */
const generateId = () => {
  return `slide-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/api-fetch"
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["apiFetch"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./admin/js/src/index.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_LearningPathEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/LearningPathEditor */ "./admin/js/src/components/LearningPathEditor.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * Learning Paths Admin Editor
 * 
 * Entry point for the React-based learning path editor.
 * 
 * @since 1.0.0
 * @package Learning_Paths
 */




const container = document.getElementById('learning-paths-editor-root');
if (container) {
  const root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createRoot)(container);
  root.render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_LearningPathEditor__WEBPACK_IMPORTED_MODULE_1__["default"], {}));
}
})();

/******/ })()
;
//# sourceMappingURL=learning-paths-admin.js.map