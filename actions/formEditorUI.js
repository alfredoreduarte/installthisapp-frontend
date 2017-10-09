export const setActiveEntryFormField = index => ({
	type: 'FORM/SET_ACTIVE_FIELD',
	index,
})

export const setEditorStep = step => ({
	type: 'EDITOR/SET_STEP',
	step,
})

export const setBusyImageUploader = name => ({
	type: 'FORM/SET_BUSY_IMAGE_UPLOADER',
	name,
})